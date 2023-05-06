
import './App.css';


import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './components/Login';
import DashBoard from './pages/DashBoard';
import ForgotPassword from './pages/Forgot-password';
import hcbgImage from "./images/login-register.jpg";
import Home from './pages/Home';
import Settings from './pages/Settings';
import About from './pages/About';
import ResetPassword from './pages/ResetPassword';
import Card from './pages/Card';
import { useEffect, useState } from 'react';








function App() {


  const [jwt, setJwt] = useState("");

  useEffect(() => {
    setJwt(localStorage.getItem("TOKEN"));

  })

  const logoutAdmin = () => {
    localStorage.clear();
  }


  const myStyle = {
    backgroundImage:
      `url(${hcbgImage})`,
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };




  return (
    <div className="App" style={myStyle}>

      <BrowserRouter>






        <Routes>

          <Route path='/dashboard' element={jwt ? <DashBoard logout={logoutAdmin} /> : <Login />} />
          <Route path='/home' element={jwt ? <Home logout={logoutAdmin} /> : <Login />} />
          <Route path='/settings' element={jwt ? <Settings /> : <Login />} />
          <Route path='/about' element={jwt ? <About /> : <Login />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/card' element={<Card />} />
          <Route path='/' element={<Login />} />
          <Route path='*' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

        </Routes>




      </BrowserRouter>
      <Footer />




    </div>
  );
}

export default App;

