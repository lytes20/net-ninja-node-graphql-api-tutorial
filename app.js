const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config()
console.log("DB user name-->", process.env.DB_USERNAME)

const connectionString =
  "mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+""+process.env.DB_NAME+".mongodb.net/test?retryWrites=true";
mongoose.connect(connectionString);
mongoose.connection.once("open", () => {
  console.log("Connected to the database");
});

const port = process.env.PORT || 4000;

app.use(
  "/graph",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(port, () => {
  console.log("Yaapp ... ");
});
