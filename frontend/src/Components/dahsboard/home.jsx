import React from 'react';
import './styles.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';

const Home = () => {

  gsap.registerPlugin(ScrollTrigger)
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".homepage-grid",
        scroller: "body",
        start: "top 80%", 
        end: "top 20%",
        scrub: 1,        
      },
    });

    tl.from(".homepage-item", {
      opacity: 0,
      stagger: 0.3, 
      duration: 0.6,
    });
  }, []);

  return (
    <section id="homepage" className="homepage">
      <div className="container">
        <div className="homepage-grid">
          <div className="homepage-item">
            <img src="./face_recog.jpg" alt="Single-face attendance tracking system" />
            <div className="homepage-item-content">
              <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Single-Face Recognition</h3>
              <p>Secure Individual Authentication System Using CNN and MERN Stack for Accurate Face Recognition</p>
              <div className="categories">
                <Link to="/mark"><button className="category">Mark Attendance</button></Link>
              </div>
            </div>
          </div>
          <div className="homepage-item">
            <img src="./multi.jpg" alt="Multi-face authentication" />
            <div className="homepage-item-content">
              <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Multi-face Authentication</h3>
              <p>Robust Group Authentication System Using Deep Learning for Accurate Multi-Person Identification</p>
              <div className="categories">
                <Link><button className="category ">Group Authentication</button></Link>
              </div>
            </div>
          </div>
          <div className="homepage-item">
            <img src="./crowd.jpg" alt="Crowd counting" />
            <div className="homepage-item-content">
              <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Crowd Counting</h3>
              <p>Analyze large crowds for comprehensive face detection and head count</p>
              <div className="categories">
                <Link to="/crowd"><button className="category b3">Start Crowd Scan</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;