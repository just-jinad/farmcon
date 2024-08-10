import React from 'react';

const Footer = () => {
  return (
    <footer className=" text-white py-6 bg-teal-700" >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h5 className="text-lg font-bold">FarmCon</h5>
            <p>Connecting farmers with consumers</p>
          </div>
          <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
            <ul className="list-none">
              <li><a href="#" className="text-white hover:text-gray-400">Home</a></li>
              <li><a href="#" className="text-white hover:text-gray-400">About</a></li>
              <li><a href="#" className="text-white hover:text-gray-400">Services</a></li>
              <li><a href="#" className="text-white hover:text-gray-400">Contact</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <p>© 2024 FarmCon. All rights reserved.</p>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <a href="#" className="mx-2 text-white hover:text-gray-400"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="mx-2 text-white hover:text-gray-400"><i className="fab fa-twitter"></i></a>
          <a href="#" className="mx-2 text-white hover:text-gray-400"><i className="fab fa-instagram"></i></a>
          <a href="#" className="mx-2 text-white hover:text-gray-400"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
