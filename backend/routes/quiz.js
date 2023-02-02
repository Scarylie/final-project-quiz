import mongoose from "mongoose";

const { ScoreSchema } = require("./score");

const Score = mongoose.model("Score", ScoreSchema);

// ************ SCHEMAS & MODELS *************** //
const answerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
  },
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  answers: {
    type: [answerSchema],
    required: true,
  },
});

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
});
const Quiz = mongoose.model("Quiz", quizSchema);

// ************ ENDPOINTS *************** //

// GET Personal Quizzes //
const getQuiz = async (req, res) => {
  const { creator } = req.query;
  const creatorQuery = creator ? creator : /.*/;
  try {
    const quizzes = await Quiz.find({ creator: creatorQuery }).sort({
      createdAt: "desc",
    });
    res.status(200).json({ success: true, response: quizzes });
  } catch (error) {
    res.status(400).json({
      success: false,
      body: {
        message: error,
      },
    });
  }
};

// GET Single Quiz //
const singleQuiz = async (req, res) => {
  try {
    const oneQuiz = await Quiz.findById(req.params.id);
    const highScore = await Score.find({ quizId: req.params.id })
      .sort("desc")
      .limit(5);
    const responseObj = {
      quiz: oneQuiz,
      highScore,
    };
    if (oneQuiz) {
      res.status(200).json({ success: true, response: responseObj });
    } else {
      res.status(404).json({ error: "Quiz not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid quiz name" });
  }
};

// POST //
const createQuiz = async (req, res) => {
  const { title, creator, questions } = req.body;
  try {
    const newQuiz = await new Quiz({
      title,
      creator,
      questions,
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
  try {
    const deletedQuiz = await Quiz.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(req.params.id),
    });
    if (deletedQuiz) {
      res.status(200).json({ success: true, response: deletedQuiz });
    } else {
      res.status(404).json({ success: false, response: "Quiz not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
};

// PATCH - not created in frontend, only in postman //
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
