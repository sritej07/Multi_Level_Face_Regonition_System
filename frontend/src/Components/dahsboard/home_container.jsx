import React, { useRef } from "react";
import Navbar from "./Navbar";
import About from "./About";
import Register from "./Register";
import Home from "./home";
import Footer from "./Footer";
import './styles.css'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import String from "./string";

function Homepage() {

  useGSAP(() => {
    gsap.from(".logo h1,.elements h4,.elements button",{
        y:-30,
        opacity:0,
        stagger:0.3
    })
})

  return (
    <>
      <Navbar />
      <Register />
      <About />
      <String/>
      <Home />
      <String/>
      <Footer />
    </>
  );
}

export default Homepage;

