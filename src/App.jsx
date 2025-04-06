
import { useEffect } from 'react';
import './App.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from './api/opentdb';

function App() {
  const [categories, setCategories] = useState({})
  const [pickedCategory, setPickedCategory] = useState()
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const categoryMap = {};
    const getCategories = async () => {
      const data = await fetchCategories();
      data.trivia_categories.forEach(category => {
        categoryMap[category.id] = category.name;
      });
      setCategories(categoryMap);
      setPickedCategory(Object.keys(categoryMap)[0]);
    };
    getCategories();
  }, [])

  function startQuiz() {
    if (!username.trim()) {
      alert("Username is required!");
      return
    }
    navigate(`/category/${pickedCategory}`, {
      state: { username: { username } }
    });
  }

  return (
    <div className='flex flex-col p-6 bg-gray-300  rounded-xl shadow-xl min-w-[350px] sm:min-w-[400px]'>
      <h1 className='text-3xl m-5 p-2'>Enter username</h1>
      <input className='text-2xl m-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' type='text' placeholder='Enter username' onChange={(e) => setUsername(e.target.value)}></input>

      <h1 className='text-3xl m-5 p-2'>Choose category</h1>
      <select className='text-xl m-2 bg-white p-2 rounded-xs cursor-pointer focus:outline-none' type='text' onChange={(e) => setPickedCategory(e.target.value)}>
        {
          Object.entries(categories).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))
        }
      </select>
      <button onClick={startQuiz} className='bg-blue-800 text-white shadow-2xl  text-2xl p-2.5  rounded-xl cursor-pointer m-2.5 hover:bg-blue-700'>Start quiz</button>
    </div>
  )
}

export default App

