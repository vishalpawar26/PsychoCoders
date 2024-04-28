import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ProblemsTable from "../components/ProblemsTable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import { RadioButton } from "../components/RadioButton";

const HomePage = () => {
  const [user, setUser] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [problems, setProblems] = useState([]);

  const { key, value } = useParams();

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    getProblems();
  }, [selectedValue]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleDifficultyCheck = (e) => {
    setSelectedValue(e.target.value);
    navigate(`/problems/difficulty/${e.target.value}`);
    console.log(e.target.value);
  };

  const handleCategoryCheck = (e) => {
    setSelectedValue(e.target.value);
    navigate(`/problems/category/${e.target.value}`);
    console.log(e.target.value);
  };

  const clearFilters = () => {
    setSelectedValue("");
    navigate("/");
  };

  const getUserDetails = async () => {
    try {
      const user = await axios.get(
        `https://psycho-coders-server.vercel.app/auth/user`,
        {
          withCredentials: true,
        }
      );

      setUser(user.data);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  };

  const getProblems = () => {
    const url = key
      ? `https://psycho-coders-server.vercel.app/problems?${key}=${value}`
      : `https://psycho-coders-server.vercel.app/problems`;

    axios
      .get(url)
      .then((problems) => {
        setProblems(problems.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-screen bg-dark-gray">
      <Navbar user={user} />
      <div className="mx-36 bg-dark-gray min-w-[1024px] h-main flex">
        <div className="my-4 mr-4 px-4 py-2 w-[25%] bg-gray rounded-md">
          <div className="pb-2 flex justify-between">
            <h2 className="text-white/80 font-semibold text-xl">Filters</h2>
            <button onClick={clearFilters} className="text-white/60">
              Clear
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-white/80">Difficulty</h3>
            <RadioButton
              label="Easy"
              selectedValue={selectedValue}
              onChange={handleDifficultyCheck}
              name="difficulty"
            />
            <RadioButton
              label="Medium"
              selectedValue={selectedValue}
              onChange={handleDifficultyCheck}
              name="difficulty"
            />
            <RadioButton
              label="Hard"
              selectedValue={selectedValue}
              onChange={handleDifficultyCheck}
              name="difficulty"
            />
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <h3 className="text-white/80">Categories</h3>
            <RadioButton
              label="Maths"
              selectedValue={selectedValue}
              onChange={handleCategoryCheck}
              name="category"
            />
            <RadioButton
              label="Arrays"
              selectedValue={selectedValue}
              onChange={handleCategoryCheck}
              name="category"
            />
            <RadioButton
              label="Strings"
              selectedValue={selectedValue}
              onChange={handleCategoryCheck}
              name="category"
            />
            <RadioButton
              label="Dynamic Programming"
              selectedValue={selectedValue}
              onChange={handleCategoryCheck}
              name="category"
            />
          </div>
        </div>
        <div className="pt-4 overflow-x-auto w-[75%] h-full">
          {problems && problems.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-white/20 border-b">
                  <th className="p-2 text-white/60 text-left w-[10%] font-normal">
                    Status
                  </th>
                  <th className="p-2 text-white/60 text-left w-[45%] font-normal">
                    Title
                  </th>
                  <th className="p-2 text-white/60 text-left w-[10%] font-normal">
                    Difficulty
                  </th>
                  <th className="p-2 text-white/60 text-left w-[10%] font-normal">
                    Solution
                  </th>
                  <th className="p-2 text-white/60 text-left w-[25%] font-normal">
                    Category
                  </th>
                </tr>
              </thead>
              <ProblemsTable
                problems={problems}
                user={user}
                filter={selectedValue}
              />
            </table>
          ) : (
            <LoadingScreen message="Loading Problems..." />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
