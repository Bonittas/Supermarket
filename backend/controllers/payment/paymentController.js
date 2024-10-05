const request = require("request");
require("dotenv").config();

const SECRET_KEY = process.env.CHASECK;

exports.initializePayment = (req, res) => {
  const options = {
    method: "POST",
    url: "https://api.chapa.co/v1/transaction/initialize",
    headers: {
      Authorization: `Bearer ${SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      return response.status(500).send("Internal Server Error");
    }
    res.status(200).send(body);
    console.log(body);
  });
};