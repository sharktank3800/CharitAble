import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import { useQuery, gql } from '@apollo/client';

import Header from './components/Header'
import Featured from './components/Featured'
import Card from './components/Cards'
import Footer from './components/Footer'

import { useStore } from './Store'


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
    const {setState} = useStore()
    const {loading, error, data:userData} = useQuery(AUTHENTICATE)
    useEffect(()=>{

      if(userData){
        setState(oldState =>({
          ...oldState,
          user:userData.autenticate
        }))
      }
    })

  return (
    <>
      <Header />
      <Featured />
      <Card /> 
      <Container>
        <Routes>
          <Route/>
        </Routes>
      </Container>
      <Footer />

    </>
  )
}

export default App
