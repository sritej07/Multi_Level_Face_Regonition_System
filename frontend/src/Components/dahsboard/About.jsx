import React from 'react';
import './styles.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";


const About = () => {
  
  gsap.registerPlugin(ScrollTrigger)
  useGSAP(()=> {
    gsap.from(".about-text h2,.about-text p",{
      opacity:0,
      x:-100,
      scrollTrigger:{
        trigger:".about-text h2,.about-text p",
        scroller:"body",
        start:"top 80%",
        end: "top 20%",
        scrub:1,
      }
    })
  })

  useGSAP(()=> {
    gsap.from(".about-image",{
      opacity:0,
      x:100,
      stagger:0.3,
      scrollTrigger:{
        trigger:".about-image",
        scroller:"body",
        start:"top 80%",
        end: "top 20%",
        scrub:2,
      }
    })
  })

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 style={{ textDecoration: 'underline' }}>About Us</h2>
            <p>
            The Multi-Level Face Recognition and Crowd Analysis System integrates deep learning with the MERN stack for robust facial recognition and crowd monitoring. For Individual authentication, the system captures multiple facial images using React, stores them in MongoDB, and uses a Convolutional Neural Network (CNN) to handle variations in expressions, lighting, and angles for secure access control via JWT. In Group authentication, MTCNN detects multiple faces in a single image, and pre-trained models like FaceNet or ArcFace extract facial embeddings for verification and attendance tracking. For Large gatherings, the system employs YOLO for real-time face detection and MCNN for high-density crowd counting, providing accurate face counts for crowd management and safety. The MERN stack ensures smooth integration and real-time data analysis for all components.
            </p>
          </div>
          <div className="about-image">
            <img src="./faces.jpg" alt="Faces" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;