import React, { useEffect, useState } from "react";
import done from "../assets/icons/done.svg";
import cancel from "../assets/icons/cancel.svg";

const OutputTable = ({ results, cpuTime, memory }) => {
  const [passedTestcases, setPassedTestcases] = useState(0);

  const totalTestcases = results.length;
  let finalPassedTestcases = 0;
  let failedResult = null;

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.userAnswer === result.correctAnswer) {
      finalPassedTestcases++;
    } else {
      failedResult = result;
      break;
    }
  }

  useEffect(() => {
    setPassedTestcases(finalPassedTestcases);
  }, [finalPassedTestcases]);

  return (
    <div className="p-4 h-full border-t border-white/20 bg-dark-gray">
      <div>
        {finalPassedTestcases === totalTestcases ? (
          <>
            <div className={"flex"}>
              <img src={done} alt="Correct" />
              <span className={"text-white/80 text-xl font-semibold ml-2"}>
                Problem Solved Successfully
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div>
                <p className="text-xl">Test Cases Passed:</p>
                <p>
                  <span className="text-3xl font-semibold text-green">
                    {passedTestcases}
                  </span>{" "}
                  / {totalTestcases}
                </p>
              </div>
              <div>
                <p className="text-xl">Total Time Taken:</p>
                <p className="text-3xl font-semibold text-green">{cpuTime}</p>
              </div>
              <div>
                <p className="text-xl">Total Memory:</p>
                <p className="text-3xl font-semibold text-green">{memory}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 flex">
              <img src={cancel} alt="wrong" />
              <span className={"text-white/80 text-xl font-semibold ml-2"}>
                Wrong Answer
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-white/60 font-semibold">
                  Test Cases Passed:
                </p>
                <p>
                  {passedTestcases} / {totalTestcases}
                </p>
              </div>
              <div>
                <p className="pb-1 text-white/60 font-semibold">For Input:</p>
                <textarea
                  disabled
                  rows="8"
                  value={failedResult.testcase}
                  className="p-2 w-full text-sm font-roboto resize-none rounded-md border border-white/10 bg-dark-gray outline-none"
                >
                </textarea>
              </div>
              <div>
                <p className="text-white/60 font-semibold">Your Output:</p>
                <pre className="whitespace-pre-wrap">
                  {failedResult.userAnswer}
                </pre>
              </div>
              <div>
                <p className="text-white/60 font-semibold">Expected Output:</p>
                <pre className="whitespace-pre-wrap">
                  {failedResult.correctAnswer}
                </pre>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OutputTable;
