import React, { useEffect, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

import Navbar from "../components/Navbar";
import goto_icon from "../assets/icons/goto.svg";
import LoadingScreen from "../components/LoadingScreen";

const UserSolutionPage = () => {
  const [user, setUser] = useState(null);
  const [code, setCode] = useState(null);
  const [language, setLanguage] = useState(null);
  const [url, setUrl] = useState(null);
  const [title, setTitle] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);

  const currentURL = window.location.href;
  const urlParts = currentURL.split("/");
  const lastIndex = urlParts[urlParts.length - 1];
  const index = lastIndex - 1;

  useEffect(() => {
    getUserDetails();
  }, []);

  const timeAgo = () => {
    const currentDate = new Date();
    const givenDate = new Date(submissionDate);

    const difference = currentDate - givenDate;

    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    if (difference < minute) {
      return "Just now";
    } else if (difference < hour) {
      const minutes = Math.round(difference / minute);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (difference < day) {
      const hours = Math.round(difference / hour);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (difference < week) {
      const days = Math.round(difference / day);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (difference < month) {
      const weeks = Math.round(difference / week);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else if (difference < year) {
      const months = Math.round(difference / month);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.round(difference / year);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
  };

  const getUserDetails = async () => {
    try {
      const user = await axios.get(`http://localhost:4001/auth/user`, {
        withCredentials: true,
      });

      setUser(user.data);
      setCode(user.data.problemSolved[index][3]);
      setLanguage(user.data.problemSolved[index][4]);
      setUrl(user.data.problemSolved[index][1]);
      setTitle(user.data.problemSolved[index][0]);
      setSubmissionDate(user.data.problemSolved[index][5]);
    } catch (error) {
      console.log(error);
      setCode(null);
      if (
        error.response &&
        error.response.data.message === "No cookie present!"
      ) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="h-screen">
      {user ? (
        <>
          <Navbar user={user} />
          <div className="px-36 text-white">
            <div className="text-white/70 py-6 flex gap-16">
              <div className="flex">
                <span className="mr-1">Problem:</span>
                <a className="text-yellow duration-200" href={url}>
                  {title}
                </a>
                <img src={goto_icon} className="w-4" />
              </div>
              <div>
                <span>Submitted:</span>{" "}
                <span className="text-white/80">{timeAgo()}</span>
              </div>
            </div>
            <div className="px-4 py-2 bg-gray text-white/70">
              <p>
                Language:{" "}
                {language === "cpp"
                  ? "C++"
                  : language === "java"
                  ? "Java"
                  : "Python3"}
              </p>
            </div>
            <div className="bg-[#1e1e1e] h-2"></div>
            <Editor
              width="100%"
              height="75vh"
              theme="vs-dark"
              language={user && language}
              value={user && code}
              options={{
                scrollBeyondLastLine: false,
                readOnly: true,
              }}
            />
          </div>
        </>
      ) : (
        <LoadingScreen message="Loading Details..." />
      )}
    </div>
  );
};

export default UserSolutionPage;
