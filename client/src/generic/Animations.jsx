import React from "react";

const Animations = () => {
    // Button Fade-in/out anitmation
    document.addEventListener("animationstart", (e) => {
        if (e.animationName === "fade-in") {
            e.target.classList.add("did-fade-in");
        }
    });

    document.addEventListener("animationend", (e) => {
        if (e.animationName === "fade-out") {
            e.target.classList.remove("did-fade-in");
        }
    });
    // Button Fade-in/out anitmation

    return <></>;
};

export default Animations;
