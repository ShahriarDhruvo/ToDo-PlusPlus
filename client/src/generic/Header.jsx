import React from "react";
import emoji from "react-easy-emoji";

const Header = (props) => {
    return (
        <div className="text-center mb-4">
            <h3 className="clogo">{props.title ? props.title : "ToDo++"}</h3>

            {props.subTitle ? (
                <h6>{props.subTitle}</h6>
            ) : (
                <h6>More than some To Do List {emoji("🤪")}</h6>
            )}
        </div>
    );
};

export default Header;
