import { useEffect, useState } from 'react'
import './App.css'
import ShowTasks from './components/showTasks';
import { v4 as uuidv4 } from 'uuid';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import UpdateTask from './components/UpdateTask';
import Signup from './components/Signin';
import Register from './components/Register';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Signup/>
    },
    {
      path: "/register",
      element: <Register/>
    },
    {
      path: "/main",
      element:  <ShowTasks/>
    },
    {
      path: "/update/:id",
      element: <UpdateTask/>
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>

    </>
  )
}

export default App
