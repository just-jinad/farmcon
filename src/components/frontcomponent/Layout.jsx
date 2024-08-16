import React from 'react'
import { Outlet } from 'react-router-dom';
import Navba from '../frontcomponent/Navbar';

const Layout = ({children, onLoginClick }) => {
  return (
   <>
       <Navba  onLoginClick={onLoginClick} />
        <Outlet/>
   </>
  )
}

export default Layout