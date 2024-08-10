"use client";
import React from 'react';
import { Navbar, Dropdown } from "flowbite-react";
import { Link } from 'react-router-dom';
import logo from '../../assets/images/intertwined lines.png';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navba = ({ onLoginClick }) => {
  let navigate = useNavigate();

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
          <span className="text-xl font-bold text-teal-700">FarmCon</span>
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
        <Navbar.Link as={Link} to="/signup">
          <button className="bg-teal-600 hover:bg-white hover:text-teal-600 hover:font-bold border-gray-200 text-white text-sm border rounded-xl p-2"> 
            Get Started
          </button>
        </Navbar.Link>
      
        <Navbar.Link  className="text-teal-700 mt-2 py-1 md:py-0" onClick={onLoginClick}>
          Login
        </Navbar.Link>
        
        <Navbar.Link href="#" onClick={handleLogout} className="text-teal-700 mt-2 py-1 md:py-0">
          Log out
        </Navbar.Link>
        
        <Dropdown label="About us" inline className="text-teal-700 mt-2 py-1 md:py-0">
          <Dropdown.Item>
            <Link className='text-teal-700 text-success' to="/about">
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
