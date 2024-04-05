import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import loader from "../assets/animations/loader.gif";
import Navbar from "../components/Navbar";
import SolvedProblems from "../components/SolvedProblems";

const Dashboard = ({ totalProblems }) => {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const getUserDetails = async () => {
    try {
      const user = await axios.get(`http://localhost:4001/auth/user`, {
        withCredentials: true,
      });

      setUser(user.data);
    } catch (error) {
      console.log(error);
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
      <div className="px-36 py-4 h-main bg-dark-gray">
        {user ? (
          <div className="text-white">
            <div className="flex gap-4">
              <div className="px-8 py-4 w-1/4 bg-white/5 rounded-md">
                <p className="text-white/50">Username</p>
                <p className="text-xl text-white/75">{user.username}</p>
              </div>
              <div className="px-8 py-4 w-1/4 bg-white/5 rounded-md">
                <p className="text-white/50">Languages</p>
                {
                  user.languages.length > 0 ? (
                    <p className="text-xl text-white/75">{user.languages.join(", ")}</p>
                  ) : (
                    <p className="text-sm text-white/50">Langauages will be displayed here</p>
                  )
                }
              </div>
              <div className="px-8 py-4 w-1/2 bg-white/5 rounded-md">
                <p className="text-white/50">Institution</p>
                <p className="text-xl text-white/75">{user.institution}</p>
              </div>
            </div>
            
            <SolvedProblems solvedProblemsList={user.problemSolved} totalProblems={totalProblems} />
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center">
            <img src={loader} alt="Loading..." className="h-16" />
            <p className="text-white">Loading Details...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
