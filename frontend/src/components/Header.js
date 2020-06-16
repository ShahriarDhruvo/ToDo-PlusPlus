import React from "react";

const Header = props => (
    <div className = "">
        <div className = "container">
            <h1 className = "">{ props.title }</h1>
            { props.subTitle && <h4 className = "">{ props.subTitle }</h4> }
        </div>
    </div>
);

Header.defaultProps = {
    title: "Todo List"
}

export default Header