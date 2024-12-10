// import React from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { useState,useRef } from "react";
// import './navbar.css';
// import { Link } from "react-router-dom";


// function Navbar(){


    // useGSAP(() => {
    //     gsap.from(".logo h1,.elements h4,.elements button",{
    //         y:-30,
    //         opacity:0,
    //         stagger:0.3
    //     })
    // })


//     return(
//         <>
//         <header className="header">
//             <div className="nav-container">
//                 <nav className="main-nav">
//                     <div className="logo">
//                         <h1><Link>IDentify</Link></h1>
//                         </div>
//                     <div className="elements">
//                         <h4><a href="#dash">Home</a></h4>
//                         <h4><a href="#about">About</a></h4>
//                         <h4><Link to="/records">Records</Link></h4>
//                         <Link to="/register"><button>Register</button></Link>
//                     </div>
//                 </nav>
//             </div>
//         </header>
//         </>
//     );
// }

// export default Navbar;



import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import { Link as ScrollLink, scroller } from "react-scroll"; 
import { Link as RouterLink } from "react-router-dom"; 
import './navbar.css';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Navbar() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const target = location.hash.substring(1); 
            scroller.scrollTo(target, {
                smooth: true,
                duration: 800,
                offset: -70, 
            });
        }
    }, [location]);

    useGSAP(() => {
        gsap.from(".logo h1,.elements h4,.elements button",{
            y:-30,
            opacity:0,
            stagger:0.3
        })
    })

    return (
        <>
            <header className="header">
                <div className="nav-container">
                    <nav className="main-nav">
                        <div className="logo">
                            <h1><RouterLink to="/">IDentify</RouterLink></h1>
                        </div>
                        <div className="elements">
                
                            <h4>
                                <RouterLink to="/#dash" smooth={true} duration={800}>
                                    Home
                                </RouterLink>
                            </h4>
                            <h4>

                                <RouterLink to="/#about">About</RouterLink>
                            </h4>
                            <h4>
                                <RouterLink to="/records">Records</RouterLink>
                            </h4>
                            <RouterLink to="/register">
                                <button>Register</button>
                            </RouterLink>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Navbar;
