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
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: "Service unavailable" });
  }
});

/// SCHEMAS ///
// User Schema //
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please add a username"],
    unique: true,
    lowercase: true,
    maxlength: 15,
  },
  password: { type: String, required: true },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add valid email",
    ],
  },
});
const User = mongoose.model("User", UserSchema);

/// END POINTS ///

// Registration //
app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
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
        email: email,
      }).save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        response:
          "Username or email already exists, please choose another username!",
        error: error,
        success: false,
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Something went wrong",
        error: error,
      });
    }
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

// QUIZ SCHEMA //
// const QuizSchema = new mongoose.Schema({
//   title: { type: String, maxlength: 40/* , required: true  */},
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   createdAt: { type: Date, default: () => new Date() },
//   questionList: [
//     {
//       question: {
//         type: String,
//         required: true, // does not work
//       },
//       questionIndex: {
//         type: Number
//       },
//       answer: {
//         type: String,
//         required: true, // does not work
//       },
//       isCorrect: {
//         type: Boolean
//       }
//     },
//   ],
// });

// const Quiz = mongoose.model("Quiz", QuizSchema);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Following code is inspired from https://stackoverflow.com/questions/39596625/nested-objects-in-mongoose-schemas
// Define Schemas
// // https://mongoosejs.com/docs/models.html#compiling

const answerModelSchema = new mongoose.Schema({
  answer: { type: String },
  isCorrect: { type: Boolean },
});
/* mongoose.model("answer", answerModelSchema, "answer"); */

const questionModelSchema = new mongoose.Schema({
  question: { type: String },
  answers: [
    [
      {
        type: { type: answerModelSchema },
        /*  type: mongoose.Schema.Types.ObjectId,
      ref: "answers", */
      },
    ],
  ],
});
/* mongoose.model("question", questionModelSchema, "question"); */

const quizModelSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
  questions: [
    [
      {
        type: { type: questionModelSchema },
        /*       type: mongoose.Schema.Types.ObjectId,
      ref: "question", */
      },
    ],
  ],
});
const Quiz = mongoose.model("Quiz", quizModelSchema);

/* const quizTemplate = new quizModelSchema({
  title: "Music quiz",
  author: "Saralie",
  questions: [[{
    question: "Who won eurovision 2012?",
    answers: [[{
      answer: "Loreen",
      isCorrect: true,
    }]],
  }]],
}); */

app.get("/quizzes", async (req, res) => {
  console.log("questionList inside get quiz: req.body", req.body);
  try {
    const quizzes = await Quiz.find(req.body);
    res.status(200).json({ success: true, response: quizzes });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
});

app.post("/quizzes", async (req, res) => {
  const { title, author } = req.body;
  const { question, answer } = req.body.questions;
  // const { answer } = req.body.questions.answers;
  console.log("questionList inside post quiz: req.body", req.body);
  console.log(
    "questionList inside post quiz: req.body.questions",
    req.body.questions
  );
  console.log(
    "questionList inside post quiz: req.body.answers",
    req.body.answers
  );
  try {
    const newQuiz = await Quiz({
      title,
      author,

      question,

      answer,
    }).save();
    res.status(201).json({ success: true, response: newQuiz });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get("/quiz", authenticateUser);
app.get("/quiz", async (req, res) => {
  try {
    const quiz = await Quiz.find(req.body);
    res.status(200).json({ success: true, response: quiz });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
});

app.post("/quiz", authenticateUser);
app.post("/quiz", async (req, res) => {
  const { title, question, answer } = req.body;
  console.log("questionList inside get quiz: req.body", req.body);

  try {
    const newQuiz = await new Quiz({ title, question, answer }).save();
    res.status(201).json({ success: true, response: newQuiz });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
});

// DELETE QUIZ BY ID //
app.delete("/quiz/:id", async (req, res) => {
  const { _id } = req.body;
  try {
    const deletedQuiz = await Quiz.findOneAndDelete({ _id: _id });
    if (deletedQuiz) {
      res.status(200).json({ success: true, response: deletedQuiz });
    } else {
      res.status(404).json({ success: false, response: "Quiz not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
