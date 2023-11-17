import { useState } from 'react'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header'
import Featured from './components/Featured'
import Card from './components/Cards'
import Footer from './components/Footer'



function App() {
  
  return (
    <>
      <Header />
      <Featured />
      <Card /> 
      <Footer />

    </>
  )
}

export default App
