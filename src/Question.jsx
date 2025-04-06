import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom'
import ScoreBoard from './ScoreBoard';
import { fetchQuestions } from './api/opentdb';

function Question() {
    const [listOfQuestions, setListOfQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [showNext, setShowNext] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [wrongAnswer, setWrongAnswer] = useState(null);
    const [isWritten, setIsWritten] = useState(false);
    const [showFinishQuiz, setShowFinishQuiz] = useState(false);
    const [disableButtons, setDisableButtons] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    const params = useParams();
    const location = useLocation();
    const { username } = location.state.username;

    useEffect(() => {
        if (isFinished) {
            saveResult();
            return;
        }
        const intervalId = setInterval(() => {
            if (!showNext && !showFinishQuiz)
                setTimer(prevTime => prevTime + 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [isFinished, showNext, showFinishQuiz])


    useEffect(() => {
        const getQuestions = async () => {
            const data = await fetchQuestions(2, params.category);
            if (!data || !Array.isArray(data)) {
                console.error("Invalid API response:", data);
                setListOfQuestions([]);
                return;
            }
            setCategoryName(decodeURIComponent(data[0].category));
            const questions = data.map((question) => {
                return {
                    questionText: decodeURIComponent(question.question),
                    correctAnswer: decodeURIComponent(question.correct_answer),
                    incorrectAnswers: question.incorrect_answers.map(answer => decodeURIComponent(answer))
                };
            })

            const questionWithshuffledAnswers = questions.map((question) => ({
                ...question,
                shuffledAnswers: [...question.incorrectAnswers, question.correctAnswer].sort(() => Math.random() - 0.5)
            }))
            setListOfQuestions(questionWithshuffledAnswers);
        }
        getQuestions();
    }, [params.category]);

    function handleAnswer(option, index) {
        const currentQuestion = listOfQuestions[currentQuestionIndex];
        if (currentQuestion.correctAnswer === option) {
            setCorrectAnswer(index);
            setWrongAnswer(null);
            setScore((currentScore) => currentScore + 1);
        }
        else {
            setWrongAnswer(index);
            setCorrectAnswer(currentQuestion.shuffledAnswers.indexOf(currentQuestion.correctAnswer));
        }
        setShowNext(true);
        setDisableButtons(true);
        if (currentQuestionIndex >= listOfQuestions.length - 1) {
            setShowFinishQuiz(true);
            setShowNext(false);
        }
    }

    function saveResult() {
        const newResult = { category: categoryName, username: username, score: score, timeTaken: timer };

        fetch('http://localhost:8000/scoreBoard', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newResult)
        }).then(() => {
            setIsWritten(true);
        })
    }

    function nextQuestion() {
        setShowNext(false);
        setWrongAnswer(null);
        setCorrectAnswer(null);
        setDisableButtons(false);
        setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
    }
    function seeResults() {
        setIsFinished(true);
    }

    return (
        <>
            {!isFinished ? (
                listOfQuestions.length > 0 && listOfQuestions[currentQuestionIndex] && (
                    <div key={listOfQuestions[currentQuestionIndex].id} className='flex flex-col p-5 m-5 bg-gray-300 rounded-xl shadow-xl min-w-[350px] sm:min-w-[800px] '>
                        <div className='flex flex-col items-start'>
                            <p className='text-3xl '>Username: {username}</p>
                            <p className='text-3xl '>Score: {score}</p>
                            <p className='text-3xl '>Timer: {timer}</p>
                        </div>
                        <h1 className='text-4xl p-1.5 m-1.5'>Question {currentQuestionIndex + 1}</h1>
                        <p className='text-3xl p-1.5 m-2.5'>{listOfQuestions[currentQuestionIndex].questionText}</p>
                        <div className='flex flex-col justify-center m-2 p-2'>
                            {
                                listOfQuestions[currentQuestionIndex].shuffledAnswers.map((answer, index) => (
                                    <button disabled={disableButtons} onClick={() => handleAnswer(answer, index)} key={index}
                                        className={` ${correctAnswer === index ? "bg-green-800 hover:bg-green-700" : "bg-blue-800 hover:bg-blue-700"} ${wrongAnswer === index ? "bg-red-800 hover:bg-red-700" : "bg-blue-800 hover:bg-blue-700"} text-white shadow-2xl cursor-pointer p-2.5 rounded-sm m-1.5 text-2xl `}>
                                        {answer}
                                    </button>
                                ))
                            }
                        </div>
                        {showNext && (
                            <button className='bg-gray-600 text-xl text-white ml-auto p-2 m-2 hover:bg-gray-500 cursor-pointer rounded-sm' onClick={nextQuestion}>Next question</button>
                        )}
                        {showFinishQuiz &&
                            <button className='bg-gray-600 text-xl text-white ml-auto p-2 m-2 hover:bg-gray-500 cursor-pointer rounded-sm' onClick={seeResults}>Finish quiz</button>
                        }
                    </div>
                ))
                : isWritten && (
                    <ScoreBoard category={categoryName} username={username} timeTaken={timer} score={score} numOfQuestions={listOfQuestions.length} />
                )}
        </>
    )
}

export default Question