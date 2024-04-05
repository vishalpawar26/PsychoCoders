import React from "react";
import ProblemPage from "../pages/ProblemPage";
import LoadingScreen from "../components/LoadingScreen";

const Problem = ({ problems }) => {
  const currentURL = window.location.href;
  const urlParts = currentURL.split("/");
  const lastIndex = urlParts[urlParts.length - 1];
  const index = lastIndex - 1;

  return (
    <div className="h-screen">
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
        <LoadingScreen message="Loading Problem..." />
      )}
    </div>
  );
};

export default Problem;
