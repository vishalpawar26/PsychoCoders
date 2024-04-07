import React from "react";
import { Link } from "react-router-dom";

const SolvedProblems = ({ solvedProblemsList, totalProblems }) => {
  return (
    <div>
      <div className="w-full mt-4 flex gap-4">
        {solvedProblemsList && totalProblems && (
          <div className="w-1/4 py-4 max-h-[140.8px] text-center bg-white/5 rounded-md">
            <p className="text-left text-white/50 px-4 text-sm">
              Solved Problems
            </p>
            <div className="py-4">
              <span className="text-3xl font-bold text-yellow">
                {solvedProblemsList.length}
              </span>
              <span className="text-xl font-semibold text-white/75">
                {" "}
                / {totalProblems}
              </span>
              <p className="text-white/50 text-sm">Solved</p>
            </div>
          </div>
        )}
        {solvedProblemsList.length > 0 ? (
          <div className="w-3/4 bg-white/5 p-4 rounded-md">
            <p className="text-left text-white/50 mb-4 text-sm">Submissions</p>
            {solvedProblemsList.map((problem, index) => {
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
