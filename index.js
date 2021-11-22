const express = require("express");
const cors = require("cors");
require("dotenv").config();

const dbConn = require("./config/db");

const routesIdea = require("./routes/idea.js");
dbConn();
const app = express();

app.use(cors());

app.use(express.json());
const PORT = process.env.PORT;

app.get("/status", (req, res) => res.json({msg: "OK"}));
app.use("/ideas", routesIdea)

app.listen(PORT, (req, res) => console.log(`Server running on PORT ${PORT}.`)); 

/*

npm start
heroku local web

git remote add origin https://github.com/apguilherme/backend-myideas.git
git branch -M main
git push -u origin main

*/