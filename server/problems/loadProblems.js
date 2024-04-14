const problemModel = require("../Models/ProblemsModel");

// exports.loadProblemsByDifficulty = (req, res) => {
//   const difficulty = req.params.difficulty;
//   console.log(difficulty);

//   problemModel
//     .find({difficulty})
//     .then((problems) => res.json(problems))
//     .catch(() => res.status(500).json({message: "No problem found!"}));
// };

// exports.loadProblemsByCategory = (req, res) => {
//   const category = req.params.category;
//   console.log(category);

//   problemModel
//     .find({category})
//     .then((problems) => res.json(problems))
//     .catch(() => res.status(500).json({message: "No problem found!"}));
// };

exports.loadProblems = (req, res) => {
  const query = req.query;
  
  problemModel
    .find(query)
    .then((problems) => res.json(problems))
    .catch(() => res.status(500).json({message: "No problem found!"}));
};
