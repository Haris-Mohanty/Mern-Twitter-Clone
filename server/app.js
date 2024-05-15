import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDb from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import tweetRoutes from "./routes/tweetRoutes.js";
import cookieParser from "cookie-parser";

//Dotenv Configuration
dotenv.config();

//Database configuration
connectDb();

//Rest Obj
const app = express();

//Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is allowed
      if (!origin || origin === "https://cheery-fenglisu-1853d4.netlify.app") {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

//Middleware routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tweet", tweetRoutes);

//Port & Listen
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on Port ${port}.`
      .bgBrightMagenta.white
  );
});
