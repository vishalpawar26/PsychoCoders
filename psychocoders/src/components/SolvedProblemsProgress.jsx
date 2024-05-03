import React from "react";

const SolvedProblemsProgress = ({
  solvedProblemsCount,
  totalProblemsCount,
  difficulty,
}) => {
  const easySolvedProblemsPercentage = (solvedProblemsCount / totalProblemsCount) * 100;

  const bgColor = difficulty === "Easy" ? "#2cbb5d" : difficulty === "Medium" ? "#f89d16" : "#EF4444";

  return (
    <>
      <div className="mt-2 flex flex-col">
        <div className="flex justify-between">
          <span className="text-sm text-white/60">{difficulty}</span>
          <div>
            <span>{solvedProblemsCount}</span>
            <span className="text-sm text-white/60">
              {" "}
              / {totalProblemsCount}
            </span>
          </div>
        </div>
        <div
          className={`h-1 w-full rounded-full relative bg-red`}
          style={{backgroundColor: `${bgColor}30`}}
        >
          <div
            className={`h-1 rounded-full absolute bg-green`}
            style={{width: `${easySolvedProblemsPercentage}%`, backgroundColor: `${bgColor}`}}
          ></div>
        </div>
      </div>
    </>
  );
};

export default SolvedProblemsProgress;
