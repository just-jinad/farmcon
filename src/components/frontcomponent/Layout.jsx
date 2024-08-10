import React from 'react'
import Navbar from "../frontcomponent/Navbar";
import { Outlet } from 'react-router-dom';

const Layout = ({ onLoginClick }) => {
  return (
   <>
       <Navbar onLoginClick={onLoginClick}/>
        <Outlet/>
   </>
  )
}

export default Layout