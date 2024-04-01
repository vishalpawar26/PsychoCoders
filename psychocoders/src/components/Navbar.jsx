import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/logo-3.png";

const Navbar = () => {
  // const [userData, setUserData] = useState({ user: null, isAuth: null });
  const [loggedIn, setLoggedIn] = useState(false);

  const logoutUser = async () => {
    const response = await axios.post(
      "http://localhost:4001/auth/logout",
      null,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response;
    }

    return new Error("Unable to logout!");
  };

  const handleLogout = async () => {
    const response = await logoutUser();

    if (response.status === 200) {
      setLoggedIn(false);
    }
    console.log(response);
  }

  const getUserDetails = async () => {
    try {
      const user = await axios.get(`http://localhost:4001/auth/user`, {
        withCredentials: true,
      });
      setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [loggedIn]);

  return (
    <div className="bg-gray px-36 py-2 min-w-[1024px] flex justify-between items-center">
      <Link to="/">
        <img src={logo} alt="PsychoCoders" className="w-40" />
      </Link>
      <div className="flex gap-4">
        {loggedIn ? (
          <>
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
            <Link
              to={"/login"}
              onClick={handleLogout}
              className="px-4 py-1 bg-dark-yellow/10 text-dark-yellow rounded-md transition hover:bg-dark-yellow/15"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-1 bg-dark-yellow/10 text-dark-yellow rounded-md transition hover:bg-dark-yellow/15"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-1 bg-dark-yellow/10 text-dark-yellow rounded-md transition hover:bg-dark-yellow/15"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
