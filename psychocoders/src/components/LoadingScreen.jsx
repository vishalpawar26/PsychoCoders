import React from "react";
import loader from "../assets/animations/loader.gif";

const LoadingScreen = ({ message }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <img src={loader} alt="Loading..." className="h-16" />
      <p className="text-white">{message}</p>
    </div>
  );
};

export default LoadingScreen;
