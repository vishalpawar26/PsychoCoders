import React from "react";
import ProblemPage from "../pages/ProblemPage";
import loader from "../assets/animations/loader.gif";

const Problem = ({ problems }) => {
  const currentURL = window.location.href;
  const urlParts = currentURL.split("/");
  const lastIndex = urlParts[urlParts.length - 1];
  const index = lastIndex - 1;

  return (
    <div>
      {problems && problems.length > 0 ? (
        <ProblemPage
          title={problems[index].title}
          desc={problems[index].description}
          difficulty={problems[index].difficulty}
          inputFormat={problems[index].inputFormat}
          outputFormat={problems[index].outputFormat}
          constraints={problems[index].constraints}
          sampleInput={problems[index].sampleInput}
          actualInput={problems[index].actualInput}
          sampleOutput={problems[index].sampleOutput}
          actualOutput={problems[index].actualOutput}
          explanation={problems[index].explanation}
        />
      ) : (
        <div className=" h-screen flex flex-col justify-center items-center">
          <img src={loader} alt="Loading..." className="h-16" />
          <p className="text-white">Loading Problem...</p>
        </div>
      )}
    </div>
  );
};

export default Problem;
