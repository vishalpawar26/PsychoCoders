const userModel = require("../Models/UserModel");

exports.getUser = async (req, res) => {
  const userId = req.id;

  try {
    const user = await userModel.findById(userId, "-password");

    if (!user) {
      return res.status(400).json({message: "User not found!"});
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
