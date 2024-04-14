const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const UserRouter = require("./routes/user.js");
const ProblemRouter = require("./routes/problemRoute.js");
const {
  loadAllProblems,
  loadProblemsByDifficulty,
  loadProblemsByCategory,
  loadProblems
} = require("./problems/loadProblems.js");
const executeCode = require("./problems/executeCode.js");
const updateUser = require("./database/updateUser.js");

require("dotenv").config();
require("./database/database.js").connent();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/auth", UserRouter);
app.use("/problem", ProblemRouter);

// app.get("/problems", loadAllProblems);
// app.get("/problems/difficulty/:difficulty", loadProblemsByDifficulty);
// app.get("/problems/category/:category", loadProblemsByCategory);/
app.get("/problems", loadProblems);

app.post("/run", executeCode);
app.post("/update", updateUser);

module.exports = app;
