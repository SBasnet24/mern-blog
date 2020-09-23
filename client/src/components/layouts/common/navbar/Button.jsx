import React from "react";

const Button = ({ toggleNavbar, classTwo }) => {
  return (
    <button
      onClick={toggleNavbar}
      className={`${classTwo}`}
      type="button"
      data-toggle="collapse"
      data-target="#navbarResponsive"
      aria-controls="navbarResponsive"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
  );
};

export default Button;
