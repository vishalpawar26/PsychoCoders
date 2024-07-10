import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import loader from "../assets/animations/loader.gif";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SolvedProblems from "../components/SolvedProblems";

const Dashboard = () => {
  const [user, setUser] = useState();
  const { username } = useParams();

  const navigate = useNavigate();

  const getUserDetails = async () => {
    try {
      const user = await axios.get(
        `https://psycho-coders-server.vercel.app/auth/user/${username}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUser(user.data);
    } catch (error) {
      console.log(error);
      navigate("/login");
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
              <div className="px-8 py-4 w-[25%] bg-white/5 rounded-md">
                <p className="text-white/50">Username</p>
                <p className="text-xl text-white/75">{user.username}</p>
              </div>
              <div className="px-8 py-4 w-[25%] bg-white/5 rounded-md">
                <p className="text-white/50">Languages</p>
                {user.languages && user.languages.length > 0 ? (
                  <p className="text-xl text-white/75">
                    {user.languages.join(", ")}
                  </p>
                ) : (
                  <p className="text-sm text-white/50">
                    Langauages will be displayed here
                  </p>
                )}
              </div>
              <div className="px-8 py-4 w-[50%] bg-white/5 rounded-md">
                <p className="text-white/50">Institution</p>
                <p className="text-xl text-white/75">{user.institution}</p>
              </div>
            </div>

            <SolvedProblems solvedProblemsList={user.problemSolved} />
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center">
            <img src={loader} alt="Loading..." className="h-16" />
            <p className="text-white">Loading Details...</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
