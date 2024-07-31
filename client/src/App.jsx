import { useState } from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Header from './components/UI/Header'
import Footer from './components/UI/Footer'
import Home from './components/pages/Home'
import './App.css'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<Home/>}/>
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
