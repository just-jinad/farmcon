"use client";
import React, { useContext, useState } from 'react';
import { Navbar, Dropdown } from "flowbite-react";
import { Link } from 'react-router-dom';
import logo from '../../assets/images/intertwined lines.png';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { TranslationContext } from './TranslationProvider';

const Navba = ({ onLoginClick }) => {
  let navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    toast('Logged out successfully', { type: 'success' });
    closeModal();
    navigate('/login');
  };

  
  const { switchLanguage } = useContext(TranslationContext); // Access switchLanguage from context


  return (
    <>
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
        
          <Navbar.Link className="text-teal-700 mt-2 py-1 md:py-0" onClick={onLoginClick}>
            Login
          </Navbar.Link>
          
          <Navbar.Link href="#" onClick={openModal} className="text-teal-700 mt-2 py-1 md:py-0">
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
          <div className="ml-auto flex space-x-4">
            <button onClick={() => switchLanguage('en')} className="text-teal-700">
              English
            </button>
            <button onClick={() => switchLanguage('yo')} className="text-teal-700">
              Yoruba
            </button>
          </div>
        </Navbar.Collapse>
      </Navbar>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Logout"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75"
        ariaHideApp={false}
      >
        <div className="bg-white rounded-lg p-6 w-96 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Are you sure you want to logout?</h2>
          <div className="flex justify-around mt-4">
            <button
              onClick={handleLogout}
              className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
            >
              Yes, Logout
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Navba;
