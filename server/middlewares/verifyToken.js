const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // get token from headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(400).json({message: "No token found!"});
  }

  // verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(401).json({message: "Invalid Token"});
    }
    req.id = user.id;

    return next();
  })
};

module.exports = verifyToken;