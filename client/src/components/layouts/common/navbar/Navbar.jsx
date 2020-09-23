import React, { useState } from "react";
import NavbarBody from "./NavbarBody";
import Button from "./Button";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const classOne = collapsed
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show";
  const classTwo = collapsed
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <li className="navbar-brand">BlogTech</li>
        <Button toggleNavbar={toggleNavbar} classTwo={classTwo} />
        <NavbarBody classOne={classOne} classTwo={classTwo} />
      </div>
    </nav>
  );
};
export default Navbar;
