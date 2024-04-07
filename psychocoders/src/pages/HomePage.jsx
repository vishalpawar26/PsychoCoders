import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ProblemsTable from "../components/ProblemsTable";
import Navbar from "../components/Navbar";
import LoadingScreen from "../components/LoadingScreen";

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
    <div className="h-screen">
      <Navbar user={user} />
      <div className="bg-dark-gray min-w-[1024px] h-main">
        <div className="mx-36 overflow-x-auto h-full">
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
              <ProblemsTable problems={problems} user={user} />
            </table>
          ) : (
            <LoadingScreen message="Loading Problems..." />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
