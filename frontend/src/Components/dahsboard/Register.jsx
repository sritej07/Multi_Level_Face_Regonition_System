import React from 'react';
import { Link as ScrollLink } from "react-scroll"; 
import './styles.css';

const Register = () => {
  return (
    <section className="Register" id='dash'>
      <div className="Register-count">
        <div>
          <h1>
            <span>Multi-Level</span> Face Recognition System
          </h1>
        </div>
        <p>
          ● <span className='content-color'>Attendance-Tracking System</span> ● <span className='content-color'>Multi-Face Recognition System</span> ● <span className='content-color'>Crowd Counting</span>
        </p>

        <ScrollLink 
          to="homepage" 
          smooth={true} 
          duration={800} 
          offset={-150} 
          className="btn"
        >
          Get started<i className="ri-arrow-right-up-line"></i>
        </ScrollLink>
      </div>
    </section>
  );
};

export default Register;
