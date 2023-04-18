import React from "react";
import hcbgImage from "../images/login-register.jpg";

function Nav() {


  const myStyle = {
    backgroundImage:
      `url(${hcbgImage})`,
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };



  return (
    <>

      style={myStyle}
    </>

  );
}

export default Nav;