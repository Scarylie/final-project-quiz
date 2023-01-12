import mongoose from "mongoose";

const { UserSchema } = require("./user");

const User = mongoose.model("User", UserSchema);

// ************ SCHEMAS & MODELS *************** //
const answerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
  },
  numberOfAnswers: {
    type: String,
    enum: ["True/False", "Multiple"],
  },
});
const Answers = mongoose.model("Answers", answerSchema); // används ej

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  questionIndex: {
    type: Number,
    default: 0,
  },
  answers: {
    type: [answerSchema],
    required: true,
  },
});
const Questions = mongoose.model("Questions", questionSchema); // används ej

const interactionSchema = new mongoose.Schema({
  name: {
    type: String, // connect to username
  },
  comment: {
    type: String,
    minlength: 5,
    maxlength: 140,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Interaction = mongoose.model("Interaction", interactionSchema);

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: 40,
  },
  creator: {
    type: String,
    maxlength: 15,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  questions: {
    type: [questionSchema],
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  public: {
    type: Boolean,
    default: false,
  },
  interaction: {
    type: [interactionSchema],
  },
  category: [
    {
      type: String,
      maxlength: 15,
    },
  ],
  level: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },
});
const Quiz = mongoose.model("Quiz", quizSchema);

// ************ ENDPOINTS *************** //

// GET all Quiz //
const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.find().sort({ createdAt: "desc" });
    res.status(200).json({ success: true, response: quiz });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
};

// GET Single Quiz //
const singleQuiz = async (req, res) => {
  try {
    const oneQuiz = await Quiz.findById(req.params.id);

    if (oneQuiz) {
      res.status(200).json({ success: true, response: oneQuiz });
    } else {
      res.status(404).json({ error: "Quiz not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid quiz name" });
  }
};

// POST //
const createQuiz = async (req, res) => {
  const { title, creator, questions, category, level, interaction } = req.body;
  console.log("req.body", req.body);
  try {
    const newQuiz = await new Quiz({
      title,
      creator,
      questions,
      category,
      level,
      interaction,
    });
    newQuiz.save();
    res.status(201).json({ success: true, response: newQuiz });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, response: "Failed to add quiz", error: error });
  }
};

// DELETE //
const deleteQuiz = async (req, res) => {
  console.log("deleteQuiz req.params", req.params);
  try {
    const deletedQuiz = await Quiz.findOneAndDelete(req.params._id);
    if (deletedQuiz) {
      res.status(200).json({ success: true, response: "Quiz deleted" });
    } else {
      res.status(404).json({ success: false, response: "Quiz not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
};

// PATCH //
const editQuiz = async (req, res) => {
  const { _id } = req.params;

  try {
    const quizToUpdate = await Quiz.findByIdAndUpdate({ _id });

    quizToUpdate.save();
    if (quizToUpdate) {
      res.status(200).json({
        success: true,
        response: `Quiz ${quizToUpdate._id} has been updated`,
      });
    } else {
      res.status(404).json({ success: false, error: "Quiz not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: "Invalid request" });
  }
};

module.exports = {
  Quiz,
  getQuiz,
  singleQuiz,
  createQuiz,
  deleteQuiz,
  editQuiz,
};
