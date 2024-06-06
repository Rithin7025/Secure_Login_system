import { useState } from 'react'

import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='login' element={<LoginPage/>}/>
      <Route path='signup' element={<SignupPage/>}/>
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
