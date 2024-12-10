import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import { Link as ScrollLink, scroller } from "react-scroll"; 
import { Link as RouterLink } from "react-router-dom"; 
import './navbar.css';

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

    return (
        <>
            <header className="header">
                <div className="nav-container">
                    <nav className="main-nav">
                        <div className="logo">
                            <h1><RouterLink to="/">IDentify <i class="ri-shield-user-line"></i></RouterLink></h1>
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
