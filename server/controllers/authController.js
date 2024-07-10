const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel.js");

exports.signup = async (req, res) => {
  // get data from the body
  const { username, institution, email, password } = req.body; 

  // check for any incomplete data
  if (!(username && institution && email && password)) {
    return res.status(400).json({
      message: "Please complete all fields to register!",
    });
  }

  // check for existing user
  const existingUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    let message;
    if (existingUser.username === username) {
      message = "The username is already taken!";
    } else {
      message = "User already exists with this email!";
    }
    return res.status(401).json({ message: message });
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // save the user
  try {
    const user = new UserModel({
      username,
      institution,
      email,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  // get data from body
  const { email, password } = req.body;

  try {
    // check for incomplete data
    if (!(email && password)) {
      return res
        .status(400)
        .json({ message: "Please complete all fields to login!" });
    }

    // check for existing user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({
          message: "Invalid email. Please create an account to proceed!",
        });
    }

    // varify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(402)
        .json({ message: "Incorrect password! Please try again!" });
    }

    // generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d"
    });

    return res.status(200).json({ message: "Logged in successfully!", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
