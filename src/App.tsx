import { useState } from 'react'
import './App.css'
import { HomePage } from './views/home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddCompany } from './views/add-company';
import { NavBar } from './components/navbar';
import { NewUser } from './views/new-user';


function App() {

  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Routes>
          <Route path='/home' index element={<HomePage />} />
          <Route path='/addcompany' element={<AddCompany />} />
          <Route path='/newuser' element={<NewUser />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
