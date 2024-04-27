import React from "react";

const SolvedProblemsProgress = ({
  easySolvedProblemsCount,
  totalEasyProblemsCount,
  mediumSolvedProblemsCount,
  totalMediumProblemsCount,
  hardSolvedProblemsCount,
  totalHardProblemsCount,
}) => {
  const easySolvedProblemsPercentage =
    (easySolvedProblemsCount / totalEasyProblemsCount) * 100;

  const mediumSolvedProblemsPercentage =
    (mediumSolvedProblemsCount / totalMediumProblemsCount) * 100;

  const hardSolvedProblemsPercentage =
    (hardSolvedProblemsCount / totalHardProblemsCount) * 100;

  return (
    <>
      <div className="mt-2 flex flex-col">
        <div className="flex justify-between">
          <span className="text-sm text-white/60">Easy</span>
          <div>
            <span>{easySolvedProblemsCount}</span>
            <span className="text-sm text-white/60">
              {" "}
              / {totalEasyProblemsCount}
            </span>
          </div>
        </div>
        <div
          className={`h-1 w-full ${
            easySolvedProblemsPercentage === 100
              ? "bg-green"
              : "bg-green/15"
          } rounded-full relative`}
        >
          <div
            className={`h-1 rounded-full absolute bg-green w-[${easySolvedProblemsPercentage}%]`}
          ></div>
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <div className="flex justify-between">
          <span className="text-sm text-white/60">Medium</span>
          <div>
            <span>{mediumSolvedProblemsCount}</span>
            <span className="text-sm text-white/60">
              {" "}
              / {totalMediumProblemsCount}
            </span>
          </div>
        </div>
        <div
          className={`h-1 w-full ${
            mediumSolvedProblemsPercentage === 100
              ? "bg-dark-yellow"
              : "bg-dark-yellow/15"
          } rounded-full relative`}
        >
          <div
            className={`h-1 rounded-full absolute bg-dark-yellow w-[${mediumSolvedProblemsPercentage}%]`}
          ></div>
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <div className="flex justify-between">
          <span className="text-sm text-white/60">Hard</span>
          <div>
            <span>{hardSolvedProblemsCount}</span>
            <span className="text-sm text-white/60">
              {" "}
              / {totalHardProblemsCount}
            </span>
          </div>
        </div>
        <div className={`h-1 w-full ${
            hardSolvedProblemsPercentage === 100
              ? "bg-red-500"
              : "bg-red-500/15"
          } rounded-full relative`}>
          <div
            className={`h-1 rounded-full absolute bg-red-500 w-[${hardSolvedProblemsPercentage}%]`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default SolvedProblemsProgress;
