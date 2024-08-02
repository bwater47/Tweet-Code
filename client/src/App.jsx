import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import './styles/App.css'

function App() {
  

  return (
    <>
      
        <Header />
          <Outlet/>
        <Footer />
      
    </>
  )
}

export default App
