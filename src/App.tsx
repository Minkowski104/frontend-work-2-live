import { useState } from 'react'
import './App.css'
import { HomePage } from './views/home'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/home' index element={<HomePage />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
