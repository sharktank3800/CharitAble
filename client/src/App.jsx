import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
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
  }
}
`
 

function App() {
    const {setState} = useStore()
    const {loading, error, data:userData} = useQuery(AUTHENTICATE)
    
    useEffect(()=>{
      
      if(userData){
        setState(oldState =>({
          ...oldState,
          user:userData.authenticate
        }))
        console.log(userData.user)
      }
    },[userData])

  return (
    <>
      <Header />
      {/* <Featured /> */}
      
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/donateform' element={<DonateForm/>}></Route>
          <Route path='/login' element={<Auth isLogin={true}/>}/>
          
          <Route path='/register' element={<Auth isLogin={false}/>}/>
        </Routes>
      
      {/* <Card />  */}
      <Footer />

    </>
  )
}

export default App
