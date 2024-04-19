import React from "react";
import github from "../assets/icons/github.svg";

const Footer = () => {
  return (
    <div className="px-36 py-2 border-t border-t-white/10 bg-gray text-white/80 flex justify-between items-center">
      <div>
        <span className="text-white/50">Developed by </span>
        <a
          href="https://www.linkedin.com/in/vishal-r-pawar/"
          target="_blank"
          className=" hover:underline"
        >
          Vishal Pawar
        </a>
      </div>
      <a href="https://github.com/vishalpawar26/PsychoCoders" target="_blank" className="flex gap-2">
        <img src={github} alt="" className="w-6" />
        <span className="hover:underline">Contribute / Get Source Code</span>
      </a>
    </div>
  );
};

export default Footer;
