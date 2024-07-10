import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SolvedProblemsProgress from "./SolvedProblemsProgress";

const SolvedProblems = ({ solvedProblemsList }) => {
  const [totalProblems, setTotalProblems] = useState(0);

  const [easySolvedProblemsCount, setEasyProblemsCount] = useState(0);
  const [mediumSolvedProblemsCount, setMediumProblemsCount] = useState(0);
  const [hardSolvedProblemsCount, setHardProblemsCount] = useState(0);

  const [totalEasyProblemsCount, setTotalEasyProblemsCount] = useState(0);
  const [totalMediumProblemsCount, setTotalMediumProblemsCount] = useState(0);
  const [totalHardProblemsCount, setTotalHardProblemsCount] = useState(0);

  const countSolvedProblems = () => {
    let easyPC = 0;
    let mediumPC = 0;
    let hardPC = 0;

    solvedProblemsList &&
      solvedProblemsList.map((problem) => {
        if (problem.difficulty === "Easy") {
          easyPC++;
        } else if (problem.difficulty === "Medium") {
          mediumPC++;
        } else {
          hardPC++;
        }
      });

    setEasyProblemsCount(easyPC);
    setMediumProblemsCount(mediumPC);
    setHardProblemsCount(hardPC);
  };

  const countTotalProblems = (problems) => {
    let easyPC = 0;
    let mediumPC = 0;
    let hardPC = 0;

    problems.map((problem) => {
      if (problem.difficulty === "Easy") {
        easyPC++;
      } else if (problem.difficulty === "Medium") {
        mediumPC++;
      } else {
        hardPC++;
      }
    });

    setTotalEasyProblemsCount(easyPC);
    setTotalMediumProblemsCount(mediumPC);
    setTotalHardProblemsCount(hardPC);
  };

  const getTotalProblems = () => {
    axios
      .get("https://psycho-coders-server.vercel.app/problems", {
        withCredentials: true,
      })
      .then((problems) => {
        setTotalProblems(problems.data.length);
        countTotalProblems(problems.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTotalProblems();
    countSolvedProblems();
  }, []);

  return (
    <div>
      <div className="w-full mt-4 flex gap-4">
        <div className="w-[25%] pt-4 pb-2 h-fit text-center bg-white/5 rounded-md">
          <p className="text-left text-white/50 px-4 text-sm">
            Solved Problems
          </p>
          {solvedProblemsList && totalProblems > 0 ? (
            <div className="p-4 flex flex-col justify-between items-center">
              <div>
                <span className="text-3xl font-bold text-yellow">
                  {solvedProblemsList.length}
                </span>
                <span className="text-xl font-semibold text-white/75">
                  {" "}
                  / {totalProblems}
                </span>
                <p className="text-white/50 text-sm">Solved</p>
              </div>
              <div className="w-full">
                <SolvedProblemsProgress
                  solvedProblemsCount={easySolvedProblemsCount}
                  totalProblemsCount={totalEasyProblemsCount}
                  difficulty="Easy"
                />
                <SolvedProblemsProgress
                  solvedProblemsCount={mediumSolvedProblemsCount}
                  totalProblemsCount={totalMediumProblemsCount}
                  difficulty="Medium"
                />
                <SolvedProblemsProgress
                  solvedProblemsCount={hardSolvedProblemsCount}
                  totalProblemsCount={totalHardProblemsCount}
                  difficulty="Hard"
                />
              </div>
            </div>
          ) : (
            <div className="py-16">Loading...</div>
          )}
        </div>
        {solvedProblemsList && solvedProblemsList.length > 0 ? (
          <div className="w-[75%] bg-white/5 p-4 rounded-md">
            <p className="text-left text-white/50 mb-4 text-sm">
              Recent Submissions
            </p>
            {solvedProblemsList
              .slice()
              .reverse()
              .map((problem, index) => {
                return (
                  <div key={problem.title} className="w-full">
                    <div
                      className={`px-4 py-2 ${
                        index & 1 ? "bg-transparent" : "bg-white/5"
                      } rounded flex justify-between`}
                    >
                      <Link
                        to={`/userSolution/${problem.submissionId}`}
                        className="text-white/70 hover:text-dark-yellow duration-200"
                      >
                        {problem.title}
                      </Link>
                      <p
                        className={`${
                          problem.difficulty === "Easy"
                            ? "text-green"
                            : problem.difficulty === "Medium"
                            ? "text-yellow"
                            : "text-red-500"
                        }`}
                      >
                        {problem.difficulty}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="w-3/4 text-white/75 bg-white/5 p-4 rounded-md">
            Submissions will be displayed here
          </div>
        )}
      </div>
    </div>
  );
};

export default SolvedProblems;
