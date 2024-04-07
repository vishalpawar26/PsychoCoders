const express = require("express");
const ProblemModel = require("../Models/ProblemsModel.js");
const UserModel = require("../Models/UserModel.js");

const router = express.Router();

router.get("/:problemId", async (req, res) => {
  const problemId = req.params.problemId;

  try {
    const problem = await ProblemModel.findOne({ id: problemId });
    if (!problem) {
      return res.status(400).json({ message: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/viewsolution/:submissionId", async (req, res) => {
  const submissionId = req.params.submissionId;

  try {
    const solution = await UserModel.findOne({
      "problemSolved": {
        $elemMatch: {
          submissionId: submissionId,
        }
      }
    });
    if (!solution) {
      return res.status(400).json({ message: "Solution not found" });
    }

    const solutionObject = solution.problemSolved.find(problem => problem.submissionId === submissionId);
    res.status(200).json(solutionObject);
  } catch (error) {
    console.log(error);
    req.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
