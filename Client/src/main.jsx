import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from './Layout.jsx'
import Home from './Pages/Home.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';
import Login from './Pages/Login/Login.jsx';
import AddSponser from './Pages/Sponser/AddSponser.jsx';
import MySponser from './Pages/Sponser/MySponser.jsx';
import SecondHome from './Pages/SecondHome/Home.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='register' element={<SignUp />} />
      <Route path='login' element={<Login />} />
      <Route path='sponser' element={<AddSponser />} />
      <Route path='/mySponserShip' element={<MySponser />} />
      <Route path='/home' element={<SecondHome />}/>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
