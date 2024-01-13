import { useState } from 'react'
import './App.css'
import { HomePage } from './views/home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddCompany } from './views/add-company';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/home' index element={<HomePage />} />
          <Route path='/addcompany' element={<AddCompany />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
