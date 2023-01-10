import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import crypto from "crypto";
// import bcrypt from "bcrypt";
import dotenv from "dotenv";

const { registerUser, logInUser, authenticateUser } = require("./routes/user");
const {
  getQuiz,
  singleQuiz,
  createQuiz,
  deleteQuiz,
  editQuiz,
} = require("./routes/quiz");
const { addScore, getScore } = require("./routes/score");

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: "Service unavailable" });
  }
});

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// * Registration * //
app.post("/register", registerUser);
app.post("/login", logInUser);
app.get("/user", authenticateUser);

// * Quiz * //
// app.get("/quiz", authenticateUser);
app.get("/quiz", getQuiz);
app.get("/quiz/:id", singleQuiz);
app.post("/quiz", createQuiz);
app.delete("/quiz/:id", deleteQuiz);
app.patch("/quiz/:id", editQuiz);

// * Quiz * //
app.get("/score/:id", getScore);
app.post("/score", addScore);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
