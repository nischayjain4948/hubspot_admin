import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'


const Home = (props) => {
    return (
        <SideBar  logout = {props}/>
    )
}

export default Home