const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  difficulty: String,
  solution: String,
  category: String,
  description: String,
  inputFormat: Array,
  outputFormat: String,
  constraints: Array,
  actualInput: Array,
  sampleInput: Array,
  actualOutput: Array,
  sampleOutput: Array,
  explanation: Array
});

const problemModel = new mongoose.model("Problems", problemSchema);

module.exports = problemModel;