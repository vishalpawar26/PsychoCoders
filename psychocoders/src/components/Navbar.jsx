import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/images/logo-3.png";

const Navbar = ({ user }) => {
  const logoutUser = async () => {
    localStorage.removeItem('token');
  };

  return (
    <div className="bg-gray px-36 py-1 min-w-[1024px] box-border border-b border-b-white/10 flex justify-between items-center">
      <Link to="/">
        <img src={logo} alt="PsychoCoders" className="w-40" />
      </Link>
      <div className="flex gap-4">
        {user ? (
          <>
            {user.username && (
              <Link
                to={`/user/${user.username}`}
                className="px-4 py-1 bg-dark-yellow/10 text-dark-yellow rounded-md transition hover:bg-dark-yellow/15"
              >
                Profile
              </Link>
            )}
            <Link
              to={"/login"}
              onClick={logoutUser}
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
