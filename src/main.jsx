import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Question from './Question.jsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

const router = createBrowserRouter([{
  path: '/',
  element: <App />
},
{
  path: '*',
  element: <Navigate to="/" />,
},
{
  path: '/category/:category',
  element: <Question />
}]);

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <RouterProvider router={router} />
 // </StrictMode>,
)
