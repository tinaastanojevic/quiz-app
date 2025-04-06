
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'



function ScoreBoard({ category, username, timeTaken, score, numOfQuestions }) {
    const [bestResults, setBestResults] = useState([])

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch('http://localhost:8000/scoreBoard');
                if (!res.ok) {
                    throw new Error('Failed fetching data...');
                }
                const data = await res.json();
                const filteredByCategory = data.filter((d) => d.category === category).sort((a, b) => b.score - a.score);
                setBestResults(filteredByCategory);
            }
            catch (error) {
                console.error('There was an error:', error);
            }
        }
        fetchResults();

    }, [category])


    const navigate = useNavigate();

    function goHome() {
        navigate(`/`);
    }

    return (
        <div className='flex flex-col p-5 m-5 bg-gray-300 rounded-xl shadow-xl min-w-[350px] sm:min-w-[400px]'>
            <p className='flex justify-self-start text-3xl p-2 mb-2 text-blue-950'>{username}, your score is: {score}/{numOfQuestions}, time taken: {timeTaken}s</p>
            <p className='text-3xl flex justify-self-start p-2 mb-1 text-blue-950'>Scoreboard for category: {category}</p>
            <table className='min-w-full table-auto'>
                <thead className='p-2 m-2 bg-blue-950 text-white'>
                    <tr >
                        <th className="px-4 py-2">Num</th>
                        <th className="px-4 py-2">Username</th>
                        <th className="px-4 py-2">Score</th>
                        <th className="px-4 py-2">Time taken</th>
                    </tr>
                </thead>
                <tbody >
                    {bestResults.map((result, index) => (
                        <tr className=" hover:bg-blue-50" key={result.id}>
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{result.username}</td>
                            <td className="px-4 py-2">{result.score}/{numOfQuestions}</td>
                            <td className="px-4 py-2">{result.timeTaken}s</td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <button onClick={goHome} className='bg-blue-800 text-white cursor-pointer shadow-xs p-2.5 rounded-sm mt-5 text-2xl hover:bg-blue-700 flex self-center'>Go Home</button>
        </div>
    );
}

export default ScoreBoard