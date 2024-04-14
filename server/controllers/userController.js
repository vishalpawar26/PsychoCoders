const userModel = require("../Models/UserModel");

exports.getUserById = async (req, res) => {
  const userId = req.id;

  try {
    const user = await userModel.findById(userId, "-password");

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

exports.getUserByUsername = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await userModel.findOne({ username }, "-password");
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
