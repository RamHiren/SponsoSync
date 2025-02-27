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
import AddEvent from './Pages/Event/AddEvent.jsx';
import AdminLogin from './Pages/Admin/Login/Login.jsx';
import AdminSignUp from './Pages/Admin/SignUp/SignUp.jsx';
import AdminHome from './Pages/Admin/Home/Home.jsx';
import { ResetPassword } from './Pages/Login/ReserPassword.jsx';
import { ForgotPassword } from './Pages/Login/ForgetPassword.jsx';
import AddEventPage from './Pages/Event/AddEvent.jsx';


const router = createBrowserRouter(

  
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='register' element={<SignUp />} />
      <Route path='login' element={<Login />} />
      <Route path='sponser' element={<AddSponser />} />
      <Route path='/mySponserShip' element={<MySponser />} />
      <Route path='/home' element={<SecondHome />}/>
      <Route path='/addevent' element={<AddEvent />}/>
      <Route path='/auth/register' element={<AdminSignUp />}/>
      <Route path='/auth/login' element={<AdminLogin />}/>
      <Route path='/auth/admin/home' element={<AdminHome />}/>
      <Route path='/user/reset-password' element={<ResetPassword />}/>
      <Route path='/user/forgot-password' element={<ForgotPassword />}/>
      <Route path='/newevent' element={<AddEventPage />}/>



    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
