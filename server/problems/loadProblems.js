const problemModel = require("../Models/ProblemsModel");

exports.loadProblems = (req, res) => {
  const query = req.query;
  
  problemModel
    .find(query)
    .then((problems) => res.json(problems))
    .catch(() => res.status(500).json({message: "No problem found!"}));
};
