import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Routes from './App.routes'

import 'styles/globals.scss'

const App = () => (
  <>
    <ToastContainer />
    <Routes />
  </>
)

export default App
