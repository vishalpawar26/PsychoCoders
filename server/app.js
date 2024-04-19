const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const UserRouter = require("./routes/user.js");
const ProblemRouter = require("./routes/problemRoute.js");
const {
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
    origin: "https://psycho-coders.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/auth", UserRouter);
app.use("/problem", ProblemRouter);

app.get("/problems", loadProblems);

app.post("/run", executeCode);
app.post("/update", updateUser);

module.exports = app;
