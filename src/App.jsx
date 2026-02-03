import './App.css'
import React from 'react';
import { RouterProvider, Routes } from "react-router-dom"
import router from './Components/Routes';
import Snowfall from 'react-snowfall'
import { ToastContainer } from "react-toastify";
import { useTheme } from './Context/ModelContext'; 

function App() {
  const { theme } = useTheme();
  return (
    <>
     <div className={`App ${theme}`}> 
    <Snowfall color="cadetblue"/>
    <RouterProvider router={router}/>
    <ToastContainer/>
    </div>
    </>
  )
}

export default App;
