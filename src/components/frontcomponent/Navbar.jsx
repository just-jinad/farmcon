"use client";
import React from 'react';
import { Navbar, Dropdown } from "flowbite-react";
import { Link } from 'react-router-dom';
import logo from '../../assets/images/intertwined lines.png';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Navba = () => {
  let navigate = useNavigate()
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
  
    if (confirmLogout) {
      localStorage.removeItem('jwtToken');
      toast('Logged out successfully', { type: 'success' });
      navigate('/login'); 
    }
  };
  return (
    <Navbar fluid rounded className="py-2 px-4">
      <div className="flex items-center">
        <Navbar.Brand as={Link} to="/" className="relative flex items-center">
          <span className="text-xl font-bold">FarmCon</span>
          <img 
            src={logo} 
            alt="farmcon logo" 
            className="ml-4 h-8 w-auto" 
            style={{ marginLeft: '10px' }}
          />
        </Navbar.Brand>
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" className="text-green-600 py-1 md:py-0">
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/login" className="text-green-600 py-1 md:py-0">
          Login
        </Navbar.Link>
        <Navbar.Link as={Link} to="/signup" className="text-green-600 py-1 md:py-0">
          Sign Up
        </Navbar.Link>
        <Navbar.Link as={Link} to="/dashboard" className="text-green-600 py-1 md:py-0">
          Dashboard
        </Navbar.Link>
        <Navbar.Link href="#" onClick={handleLogout} className="text-green-600 py-1 md:py-0">
        Log out
        </Navbar.Link>
        <Dropdown label="About us" inline className="text-green-600 py-1 md:py-0">
          <Dropdown.Item>
            <Link  className='text-success' to="/about">
              Contact Us
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link className='text-success' to="/about">
              Our People
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link className='text-success' to="/faq">
              FAQ
            </Link>
          </Dropdown.Item>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navba;
