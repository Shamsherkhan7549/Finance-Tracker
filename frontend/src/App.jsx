import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Navbar from './components/Navbar'


const App = () => {
  return (
    <>

      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App