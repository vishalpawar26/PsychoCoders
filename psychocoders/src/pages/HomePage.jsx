import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ProblemTable from "../components/ProblemsTable";
import Navbar from "../components/Navbar";
import loader from "../assets/animations/loader.gif"

const HomePage = ({ problems }) => {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const getUserDetails = async () => {
    try {
      const user = await axios.get(`http://localhost:4001/auth/user`, {
        withCredentials: true,
      });

      setUser(user.data);
    } catch (error) {
      console.log(error.response);
      if (error.response.data.message === "No cookie present!") {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <div className="bg-dark-gray min-w-[1024px] h-main">
        {/* <img src={logo} alt="PsychoCoders" /> */}
        <div className="mx-36 overflow-x-auto">
          {problems && problems.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-white/20 border-b">
                  <th className="p-2 text-white/60 text-left w-1/6 font-normal">
                    Status
                  </th>
                  <th className="p-2 text-white/60 text-left w-2/6 font-normal">
                    Title
                  </th>
                  <th className="p-2 text-white/60 text-left w-1/6 font-normal">
                    Difficulty
                  </th>
                  <th className="p-2 text-white/60 text-left w-1/6 font-normal">
                    Solution
                  </th>
                  <th className="p-2 text-white/60 text-left w-1/6 font-normal">
                    Category
                  </th>
                </tr>
              </thead>
              <ProblemTable problems={problems} user={user} />
            </table>
          ) : (
            <div className="h-main flex flex-col items-center justify-center">
              <img src={loader} alt="" className="h-16" />
              <p className="text-white text-center">Loading Problems...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
