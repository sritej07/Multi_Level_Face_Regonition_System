

import React from 'react';
import './styles.css';
import 'remixicon/fonts/remixicon.css';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <footer>
      <div className="marquee-box**">
        <div className="marquee-content">
          Umair 23BD1A057B &nbsp; | &nbsp; Viraj 23BD1A057P &nbsp; | &nbsp; 
          Rayan 23BD1A06R &nbsp; | &nbsp; Sudhaansh 23BD1A0569 &nbsp; | &nbsp; 
          Aditya 23BD1A057M &nbsp; | &nbsp; Sritej 23BD1A057N | &nbsp; Satya 23BD1A056Q
        </div>
      </div>
      
      <div className="footer-container">
        <div className="social">
          <a href=""><i className="ri-github-fill"></i></a>
          <a href=""><i className="ri-instagram-line"></i></a>
        </div>
        
        <div className="footer-nav">
          <ul>
            <li>
              <ScrollLink to="dash" smooth={true} duration={800} offset={-70}>
                Home
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="about" smooth={true} duration={800} offset={-70}>
                About
              </ScrollLink>
            </li>


            <li>
              <Link to="/records">Records</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>Copyright &copy;2024 Designed By Group-no:164</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
