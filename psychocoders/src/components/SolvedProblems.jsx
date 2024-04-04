import React from "react";

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
            {solvedProblemsList.map((problem, index) => {
              return (
                <div key={problem[0]} className="w-full">
                  <div
                    className={`px-4 py-2 ${
                      index & 1 ? "bg-transparent" : "bg-white/5"
                    } rounded flex justify-between`}
                  >
                    <a href={problem[1]}>{problem[0]}</a>
                    <p
                      className={`${
                        problem[2] === "Easy"
                          ? "text-green"
                          : problem[2] === "Medium"
                          ? "text-yellow"
                          : "text-red-500"
                      }`}
                    >
                      {problem[2]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-3/4 text-white/75 bg-white/5 p-4 rounded-md">
            Solved problems will be displayed here
          </div>
        )}
      </div>
    </div>
  );
};

export default SolvedProblems;
