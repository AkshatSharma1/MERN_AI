import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from "@mui/material"
import { Toaster } from 'react-hot-toast'
//routing
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext.tsx"
import axios from 'axios'

//setting default url
axios.defaults.baseURL = "http://localhost:5000/api/v1/"
axios.defaults.withCredentials = true; //with everey req attach credentials

//Creating theme of MUI( here only creating for typography)
const theme = createTheme({typography:{fontFamily:"Roboto Slab, serif", allVariants:{color: 'white'}}});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme = {theme}>
          <Toaster position='top-right'/>
          <App></App>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
