import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'

const root = document.getElementById('root')
createRoot(root).render(
  <HashRouter>
    <App />
  </HashRouter>
)
