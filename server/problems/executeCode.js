const axios = require("axios");

const executeCode = async (req, res) => {
  const { script, stdin, language, versionIndex } = await req.body;

  let program = {
    script,
    stdin,
    language,
    versionIndex,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  };

  axios
    .post("https://api.jdoodle.com/v1/execute", program)
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((err) => {
      console.log("Error: " + err);
      res.status(500).send(err);
    });
};

module.exports = executeCode;
