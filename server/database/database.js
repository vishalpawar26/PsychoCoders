const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;

exports.connent = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(console.log("DB connected successfully!"))
    .catch((error) => {
      console.log("ERROR!!!!\n", error);
      process.exit(1);
    });
};
