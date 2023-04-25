
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







function App() {

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

          {/* <Route path='/' element={<h1>Product Listening Component</h1>} />
          <Route path='/addproduct' element={<h1>Add Product Component</h1>} />
          <Route path='/updateproduct' element={<h1>Update Product Component</h1>} />
          <Route path='/logout' element={<h1>logout Component</h1>} />
          <Route path='/profile' element={<h1>Profile Component</h1>} /> */}


          <Route path='/' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/home' element={<Home />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/about' element={<About />} />
          <Route path='/reset-password' element={<ResetPassword />} />








        </Routes>


      </BrowserRouter>
      <Footer />




    </div>
  );
}

export default App;

