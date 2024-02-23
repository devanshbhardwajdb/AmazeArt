
import React, { useEffect } from 'react';

const Cursor = () => {
    useEffect(() => {
        // Move the variable declarations inside the useEffect callback
        var crsr = document.querySelector("#cursor");
        var crsrb = document.querySelector("#cursor-b");
        var contact = document.querySelectorAll(".contact-btn");
        var h4all = document.querySelectorAll('.nav .items');
        var project = document.querySelectorAll('.project-class');

        const handleMouseMove = function (dets) {
            crsr.style.left = dets.x + 20 + "px";
            crsr.style.top = dets.y + 20 + "px";
            crsrb.style.left = dets.x - 250 + "px";
            crsrb.style.top = dets.y - 250 + "px";
        };

        const handleMouseEnter = function () {
            crsr.style.transform = "scale(3)";
            crsr.style.border = "1px solid #57ebff";
            crsr.style.backgroundColor = "transparent";
        };

        const handleMouseLeave = function () {
            crsr.style.transform = "scale(1)";
            crsr.style.border = "none";
            crsr.style.backgroundColor = "#57ebff";
        };

        const handleMouseEnter2 = function () {
            crsr.style.backgroundColor = "#8954F2";
            crsrb.style.backgroundColor = "rgba(138, 83, 243, 0.6)";
        };

        const handleMouseLeave2 = function () {
            crsr.style.backgroundColor = "#57ebff";
            crsrb.style.backgroundColor = "rgba(87, 235, 255, 0.2)";
        };

        document.addEventListener("mousemove", handleMouseMove);

        h4all.forEach(function (elem) {
            elem.addEventListener("mouseenter", handleMouseEnter);
            elem.addEventListener("mouseleave", handleMouseLeave);
        });

        contact.forEach(function (elem) {
            elem.addEventListener("mouseenter", handleMouseEnter);
            elem.addEventListener("mouseleave", handleMouseLeave);
        });

        project.forEach(function (elem) {
            elem.addEventListener("mouseenter", handleMouseEnter2);
            elem.addEventListener("mouseleave", handleMouseLeave2);
        });

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);

            h4all.forEach(function (elem) {
                elem.removeEventListener("mouseenter", handleMouseEnter);
                elem.removeEventListener("mouseleave", handleMouseLeave);
            });

            contact.forEach(function (elem) {
                elem.removeEventListener("mouseenter", handleMouseEnter);
                elem.removeEventListener("mouseleave", handleMouseLeave);
            });

            project.forEach(function (elem) {
                elem.removeEventListener("mouseenter", handleMouseEnter2);
                elem.removeEventListener("mouseleave", handleMouseLeave2);
            });
        };
    }, []);

    return (
        <div className='w-full h-full z-[150]'>
            {/* Use className to match your CSS class names */}
            <div className="cursor max-xl:hidden" id="cursor"></div>
            <div className="cursor-b max-xl:hidden" id="cursor-b"></div>
        </div>
    );
}

export default Cursor;
