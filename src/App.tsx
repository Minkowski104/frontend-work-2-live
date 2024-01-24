import { useState } from 'react'
import './App.css'
import { HomePage } from './views/home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddCompany } from './views/add-company';
import { NavBar } from './components/navbar';
import { NewUser } from './views/new-user';
import { ProfilePage } from './views/user-profile';
import { CompanyProfile } from './views/company-profile';
import { Toaster } from 'react-hot-toast';
import { LoginUser } from './views/login';

function App() {

  return (
    <>
    <Toaster/>
    <BrowserRouter>
      <NavBar />
      <Routes>
          <Route path='/home' index element={<HomePage />} />
          <Route path='/addcompany' element={<AddCompany />} />
          <Route path='/newuser' element={<NewUser />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/company/:id' element={<CompanyProfile/> }/>
          <Route path='/login' element={<LoginUser />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
