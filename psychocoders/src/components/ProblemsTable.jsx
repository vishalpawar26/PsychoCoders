import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import sol_icon from "../assets/icons/solution.svg";
import done from "../assets/icons/done.svg";

const ProblemTable = ({ problems, user }) => {
  const getSolvedProblems = (title) => {
    for (const obj of user.problemSolved) {
      if (obj[0] === title) {
        return true;
      }
    }
    return false;
  };

  return (
    <tbody className="text-white/80">
      {problems.map((problem, idx) => {
        const bgcolor = idx & 1 ? "bg-gray" : "bg-dark-gray";
        const color =
          problem.difficulty === "Easy"
            ? "text-green"
            : problem.difficulty === "Medium"
            ? "text-dark-yellow"
            : "text-red-500";
        return (
          <tr className={`${bgcolor}`} key={problem.id}>
            <td className="p-2">
              {user && getSolvedProblems(problem.title) && (
                <img src={done} alt="Solved" />
              )}
            </td>
            <td className="p-2">
              <Link to={`/problems/${problem.id}`}>
                {problem.id}. {problem.title}
              </Link>
            </td>
            <td className={`${color} p-2`}>{problem.difficulty}</td>
            <td className="p-2">
              <a href={problem.solution}>
                <img src={sol_icon} alt="Solution" />
              </a>
            </td>
            <td className="p-2">{problem.category}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default ProblemTable;
