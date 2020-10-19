import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeSwitcher = () => {
    const { colorTheme, handleTheme } = useContext(ThemeContext);

    return (
        <div
            className="theme-options d-flex justify-content-around mx-auto mb-3"
            style={{ maxWidth: "12rem" }}
        >
            <div
                id="theme-light-green"
                onClick={() => handleTheme("theme-light-green")}
                className={`${colorTheme === "theme-light-green" ? "active" : ""}`}
            />

            <div
                id="theme-gradient-blue"
                onClick={() => handleTheme("theme-gradient-blue")}
                className={`${colorTheme === "theme-gradient-blue" ? "active" : ""}`}
            />

            <div
                id="theme-gradient-cream"
                onClick={() => handleTheme("theme-gradient-cream")}
                className={`${colorTheme === "theme-gradient-cream" ? "active" : ""}`}
            />

            <div
                id="theme-gradient-silver"
                onClick={() => handleTheme("theme-gradient-silver")}
                className={`${colorTheme === "theme-gradient-silver" ? "active" : ""}`}
            />
        </div>
    );
};

export default ThemeSwitcher;
