import React, { useEffect, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import goto_icon from "../assets/icons/goto.svg";
import LoadingScreen from "../components/LoadingScreen";
import Footer from "../components/Footer";

const UserSolutionPage = () => {
  const { submissionId } = useParams();

  const [copied, setCopied] = useState(false);
  const [solution, setSolution] = useState();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const getSolutionDetails = async () => {
      try {
        const response = await axios.get(
          `https://psycho-coders-server.vercel.app/problem/viewsolution/${submissionId}`
        );
        setSolution(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSolutionDetails();
  }, []);

  const timeAgo = () => {
    const currentDate = new Date();
    const givenDate = new Date(solution.submissionDate);

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

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="h-screen">
      {solution ? (
        <>
          <Navbar user={solution} />
          <div className="px-36 h-main text-white">
            <div className="text-white/70 py-6 flex gap-8">
              <div className="flex">
                <span className="mr-1">Problem:</span>
                <a
                  className="text-yellow duration-200"
                  href={solution.problemUrl}
                >
                  {solution.title}
                </a>
                <img src={goto_icon} className="w-4" />
              </div>
              <div className="flex">
                <span className="mr-1">Submission By:</span>
                <a className="text-yellow duration-200" href={solution.userUrl}>
                  {solution.submissionBy}
                </a>
                <img src={goto_icon} className="w-4" />
              </div>
              <div>
                <span>Submitted:</span>{" "}
                <span className="text-white/50">{timeAgo()}</span>
              </div>
              <div>
                <span>Submission ID:</span>{" "}
                <span className="text-white/50">{solution.submissionId}</span>
              </div>
            </div>
            <div className="px-4 py-2 bg-gray text-white/70 flex justify-between">
              <p>
                Language:{" "}
                {solution.langValue === "cpp"
                  ? "C++"
                  : solution.langValue === "java"
                  ? "Java"
                  : "Python3"}
              </p>
              <div className="relative">
                <CopyToClipboard text={solution.code} onCopy={onCopy}>
                  <button
                    className={`hover:text-yellow duration-200 ${
                      copied && "hidden"
                    }`}
                  >
                    Copy
                  </button>
                </CopyToClipboard>
                {copied && <p>Copied!</p>}
              </div>
            </div>
            <div className="bg-[#1e1e1e] h-2"></div>
            <Editor
              width="100%"
              height="75vh"
              theme="vs-dark"
              language={solution && solution.langValue}
              value={solution && solution.code}
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
      <Footer />
    </div>
  );
};

export default UserSolutionPage;
