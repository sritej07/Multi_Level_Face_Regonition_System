import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function String() {
const stringRef = useRef(null);
  const pathRef = useRef(null);
  const navref = useRef(null);

  const initialPath = "M 10 100 Q 500 100 990 100";
  const finalPath = "M 10 100 Q 500 100 990 100";

  useGSAP(() => {
    const string = stringRef.current;
    const path = pathRef.current;


    if (!string || !path) return;

    const handleMouseMove = (e) => {
      const rect = string.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newPath = `M 10 100 Q ${x} ${y} 990 100`;

      gsap.to(path, {
        attr: { d: newPath },
        duration: 0.3,
        ease: "power3.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(path, {
        attr: { d: finalPath },
        duration: 1.5,
        ease: "elastic(1,0.2)"
      });
    };

    string.addEventListener("mousemove", handleMouseMove);
    string.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      string.removeEventListener("mousemove", handleMouseMove);
      string.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);


    return(
        <>
    <div id="string" ref={stringRef}>
        <svg width="1050" height="200" xmlns="http://www.w3.org/2000/svg">
          <path ref={pathRef} d={initialPath} stroke="white" fill="transparent" />
        </svg>
      </div>
        </>
    )

}

export default String;