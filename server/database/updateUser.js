const mongoose = require("mongoose");

const UserModel = require("../Models/UserModel");

const updateUser = async (req, res) => {
  const { userId, title, url, difficulty, lang } = req.body;

  const updateSolvedProblems = async () => {
    const existingProblems = await UserModel.findById(userId).select(
      "problemSolved"
    );
    const existingTitles = existingProblems.problemSolved.map(
      (obj) => obj.title
    );

    if (!existingTitles.includes(title)) {
      const updateUser = await UserModel.updateOne(
        { _id: userId },
        {
          $push: {
            // Use $push instead of $addToSet for existing arrays
            problemSolved: { title, url, difficulty },
          },
        }
      );
      console.log(updateUser);
    }
  };

  const updateLanguages = async () => {
    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        $addToSet: {
          languages: lang,
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
