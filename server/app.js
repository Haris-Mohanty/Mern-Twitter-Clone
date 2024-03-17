import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./database/db.js";

//Dotenv Configuration
dotenv.config();

//Database configuration
connectDb();

//Rest Obj
const app = express();

//Port & Listen
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on Port ${port}.`
      .bgBrightMagenta.white
  );
});
