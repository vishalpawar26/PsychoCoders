const UserModel = require("../Models/UserModel");
const { v4: uuidv4 } = require("uuid");

const updateUser = async (req, res) => {
  const {
    userId,
    title,
    problemUrl,
    difficulty,
    langLabel,
    langValue,
    code,
    submissionDate,
    submissionBy,
  } = req.body;

  const updateSolvedProblems = async () => {
    const user = await UserModel.findOne({ _id: userId });
    const solvedProblemList = user.problemSolved;
    const submissionId = uuidv4();
    const userUrl = `http://localhost:5173/user/${submissionBy}`;

    const index = solvedProblemList.findIndex(
      (problem) => problem.title === title
    );

    if (index !== -1) {
      solvedProblemList[index] = {
        submissionId,
        title,
        problemUrl,
        difficulty,
        code,
        langValue,
        submissionDate,
        submissionBy,
        userUrl,
      };
    } else {
      solvedProblemList.push({
        submissionId,
        title,
        problemUrl,
        difficulty,
        code,
        langValue,
        submissionDate,
        submissionBy,
        userUrl,
      });
    }

    const update = await UserModel.updateOne(
      { _id: userId },
      { $set: { problemSolved: solvedProblemList } }
    );

    console.log(update);
  };

  const updateLanguages = async () => {
    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        $addToSet: {
          languages: langLabel,
        },
      }
    );

    console.log(updateUser);
  };

  try {
    updateSolvedProblems();
    updateLanguages();

    return res.status(200).json({ message: "Updated the data!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal Server Error!" });
  }
};

module.exports = updateUser;
