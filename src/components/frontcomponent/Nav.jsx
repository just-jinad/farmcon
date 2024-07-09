"use client";
import React from 'react';
import { Navbar, Dropdown, DropdownItem  } from "flowbite-react";
import { Link } from 'react-router-dom';
import logo from '../assets/images/farmcon logo1.jpg';

const Nav = () => {
  return (
    <Navbar fluid rounded>
      <div className='container mx-auto flex flex-wrap items-center justify-between'>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} className="h-20 rounded-lg" alt="farmcon logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8 w-full md:w-auto">
            <Navbar.Link as={Link} to="/" className="text-green-600 py-2 md:py-0">
              Home
            </Navbar.Link>
            <Navbar.Link as={Link} to="/login" className="text-green-600 py-2 md:py-0">
              Login
            </Navbar.Link>
            <Navbar.Link as={Link} to="/signup" className="text-green-600 py-2 md:py-0">
              Sign Up
            </Navbar.Link>
            <Navbar.Link as={Link} to="/homepage"  className="text-green-600 py-2 md:py-0">
             Homepage
            </Navbar.Link>
            <Navbar.Link href="#" className="text-green-600 py-2 md:py-0">
              Contact
            </Navbar.Link>

            <Dropdown label="About us" inline className="text-green-600 py-0 md:py-0">
              <Dropdown.Item>
                <Link className='text-success' to={"/about"} >
                Our Company
                </Link>
              </Dropdown.Item>
              <Dropdown.Item >
                <Link className='text-success' to={"/about"}>
                Our People
                </Link>
              </Dropdown.Item>
              <Dropdown.Item >
                <Link className='text-success' to={"/faq"}>
                FAQ
                </Link>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Nav;
