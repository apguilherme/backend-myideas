const express = require("express");
require("dotenv").config();
const dbConn = require("./config/db");

const routesIdea = require("./routes/idea.js");
dbConn();
const app = express();

app.use(express.json());
const PORT = process.env.PORT;

app.get("/status", (req, res) => res.json({msg: "OK"}));
app.use("/ideas", routesIdea)

app.listen(PORT, (req, res) => console.log(`Server running on PORT ${PORT}.`)); // node index.js