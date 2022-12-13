import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

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

/// SCHEMAS ///
// User Schema //
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});
const User = mongoose.model("User", UserSchema);

/// END POINTS ///

// Registration //
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        response: "Password must be at least 8 characters long",
      });
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt),
      }).save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error,
    });
  }
});

// Log in //
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials didn't match",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
    });
  }
});

// Authentication //
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken: accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({
        response: "Please log in",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
};

const QuizSchema = new mongoose.Schema({
  quizName: { type: String, maxlength: 40, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: () => new Date() },
  questionList: [
    {
      question: {
        type: String,
      },
      answer: {
        type: String,
      },
    },
  ],
});
const Quiz = mongoose.model("Quiz", QuizSchema /* , QuestionSchema */);

//  Question SCHEMA //
/* const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
}); */

app.get("/quiz", authenticateUser);
app.get("/quiz", async (req, res) => {
  const quiz = await Quiz.find().sort({ createdAt: "desc" }).limit(18).exec();
  res.status(200).json({ success: true, response: quiz });
});

app.post("/quiz", authenticateUser);
app.post("/quiz", async (req, res) => {
  const { quizName, question } = req.body;
  try {
    const newQuiz = await new Quiz({ quizName, question }).save();
    res.status(201).json({ success: true, response: newQuiz });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
});
app.post("/quiz", authenticateUser);
app.post("/quiz", async (req, res) => {
  const { questionList } = req.body;
  try {
    const newQuiz = await new Quiz({ questionList }).save();
    res.status(201).json({ success: true, response: newQuiz });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
});

///////
// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
