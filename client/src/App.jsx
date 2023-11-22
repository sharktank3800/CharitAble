import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import { useQuery, gql } from '@apollo/client';

import Header from './components/Header'
import Featured from './components/Featured'
import Card from './components/Cards'
import Dashboard from './pages/Dashboard'
import DonateForm from './pages/DonateForm';
import Footer from './components/Footer'
import Auth from './pages/Auth'

import { useStore } from './Store'
import Landing from './pages/Landing';

const AUTHENTICATE = gql`
query{
  authenticate{
    _id
    email
    username

  }
}
`
 function App() {
    const {user, setState} = useStore()
    const {loading, error, data:userData} = useQuery(AUTHENTICATE)
    
    useEffect(() => {
      const testing = async (e) => {
  
        // console.log(userData.authenticate)
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        // If a token exists in localStorage, update the state with the token
        setState((oldState) => ({
          ...oldState,
          token: storedToken,
        }));
      }
    }
    testing()
  }, [userData]);
  return (
    <>
      <Header />
      
      
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/donateform' element={<DonateForm/>} /> 
          <Route path='/login' element={<Auth isLogin={true}/>}/>
          <Route path='/register' element={<Auth isLogin={false}/>}/>
        </Routes>
      
      
      <Footer />

    </>
  )
}

export default App
