import { useState } from 'react'
import './App.css'
import { HomePage } from './views/home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddCompany } from './views/add-company';
import { NavBar } from './components/navbar';

function App() {

  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Routes>
          <Route path='/home' index element={<HomePage />} />
          <Route path='/addcompany' element={<AddCompany />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
