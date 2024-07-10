import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ProblemPage from "../pages/ProblemPage";
import LoadingScreen from "../components/LoadingScreen";

const Problem = () => {
  const { problemId } = useParams();

  const [problem, setProblem] = useState();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(
          `https://psycho-coders-server.vercel.app/problem/${problemId}`,
          { withCredentials: true }
        );
        setProblem(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProblem();
  }, [problemId]);

  return (
    <div className="h-screen">
      {problem ? (
        <ProblemPage
          title={problem.title}
          desc={problem.description}
          difficulty={problem.difficulty}
          inputFormat={problem.inputFormat}
          outputFormat={problem.outputFormat}
          constraints={problem.constraints}
          sampleInput={problem.sampleInput}
          actualInput={problem.actualInput}
          sampleOutput={problem.sampleOutput}
          actualOutput={problem.actualOutput}
          explanation={problem.explanation}
        />
      ) : (
        <LoadingScreen message="Loading Problem..." />
      )}
    </div>
  );
};

export default Problem;
