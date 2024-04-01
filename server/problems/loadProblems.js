const problemModel = require("../Models/ProblemsModel");

const loadProblems = (req, res) => {
  problemModel
    .find()
    .then((problems) => res.json(problems))
    .catch((error) => res.json(error));
};

module.exports = loadProblems;
