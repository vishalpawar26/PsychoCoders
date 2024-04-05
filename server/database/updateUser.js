const UserModel = require("../Models/UserModel");

const updateUser = async (req, res) => {
  const { userId, title, url, difficulty, langLabel, langValue, code, submissionDate } = req.body;

  const updateSolvedProblems = async () => {
    const user = await UserModel.findOne({ _id: userId });
    const solvedProblemList = user.problemSolved;

    const index = solvedProblemList.findIndex(
      (problem) => problem[0] === title
    );

    if (index !== -1) {
      solvedProblemList[index] = [title, url, difficulty, code, langValue, submissionDate];
    } else {
      solvedProblemList.push([title, url, difficulty, code, langValue, submissionDate]);
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
