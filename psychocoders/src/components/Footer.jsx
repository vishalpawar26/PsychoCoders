import React from "react";
import github from "../assets/icons/github.svg"
import linkedin from "../assets/icons/linkedin.svg"

const Footer = () => {
  return (
    <div className="px-36 py-2 border-t border-t-white/10 bg-gray text-white/80 flex justify-between items-center">
      <div>
        Made by Vishal Pawar
      </div>
      <div className="flex gap-4">
        <a href="https://github.com/vishalpawar26" target="_blank">
          <img src={github} alt="" className="w-6" />
        </a>
        <a href="https://www.linkedin.com/in/vishal-r-pawar/" target="_blank">
          <img src={linkedin} alt="" className="w-6" />
        </a>
      </div>
    </div>
  )
};

export default Footer;
