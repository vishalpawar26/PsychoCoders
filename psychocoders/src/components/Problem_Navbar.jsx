import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo-3.png";

const Problem_Navbar = () => {
  return (
    <div className="bg-gray px-4 py-2 min-w-[1024px] flex justify-between items-center">
      <Link to="/">
        <img src={logo} alt="PsychoCoders" className="w-40" />
      </Link>
      <div className="flex gap-4">
        <Link
          to={"/"}
          className="px-4 py-1 bg-dark-yellow/10 text-dark-yellow rounded-md transition hover:bg-dark-yellow/15"
        >
          Home
        </Link>
        <Link
          to={"/dashboard"}
          className="px-4 py-1 bg-dark-yellow/10 text-dark-yellow rounded-md transition hover:bg-dark-yellow/15"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Problem_Navbar;
