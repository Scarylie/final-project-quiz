import express from "express";
import mongoose from "mongoose";

// ************ SCHEMAS & MODELS *************** //
const answerSchema = new mongoose.Schema({
  answer: { type: String, unique: true, required: true, },
  isCorrect: { type: Boolean },
});
const Answers = mongoose.model("Answers", answerSchema);

const questionSchema = new mongoose.Schema({
  question: { type: String },
  answer1: { type: [answerSchema], required: true },
  answer2: { type: [answerSchema], required: true },
  answer3: { type: [answerSchema], required: true },
  answer4: { type: [answerSchema], required: true },
  questionIndex: { type: Number, default: 0, required: true, },
});
const Questions = mongoose.model("Questions", questionSchema);

const quizSchema = new mongoose.Schema({
  title: { type: String, unique: true, trim: true, maxlength: 40, },
  author: { type: String },
  questions: {
    type: [questionSchema],
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId, // if we want: display name?
    ref: "User", // osäker på om denna funkar och om vi behöver den
  },
});
const Quiz = mongoose.model("Quiz", quizSchema);
/* module.exports = mongoose.model("Quiz", quizSchema); */

/* Template for POSTMAN */
/* const ForPostmanTesting = 

{
  "title": "Music quiz",
  "author": "Bob",
  "questions": 
    [{
      "question": "Who won eurovision 2012?",
      "answer1":  [{
        "answer": "Loreen",
        "isCorrect": true
       }
      ],
       "answer2":  [{
        "answer": "Ricky",
        "isCorrect": false
       }
      ],
       "answer3":  [{
        "answer": "Lady gaga",
        "isCorrect": false
       }
      ],
       "answer4":  [{
        "answer": "Obama",
        "isCorrect": false
       }
      ],
      "questionIndex": 1
    }
  ]
}

*/

// ************ ENDPOINTS *************** //

// GET Quiz //
const getQuiz = async (req, res) => {
  try {
    console.log("GET quiz req.body", req.body);
    const quiz = await Quiz.find(req.body);
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
  // const { userId } = req.params;
  const { title, author, questions } = req.body;
  console.log("POST quiz: req.body", req.body);

  try {
/*     const quizObject = {
      title: title,
      author: author,
    };
    questions.foreach(async (singleQuestion) => {
      const answers = [];
      singleQuestion.answers.foreach(async (answer) => {
        const singleAnswer = await new Answers(answer);
        answers.push(singleAnswer).save();
      });
      const question = await new Questions({
        question: singleQuestion.question,
        answers: answers,
      }).save();
      quizObject.questions.push(question);
    }); */
    const newQuiz = await new Quiz({title, author, questions})
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
    const deletedQuiz = await Quiz.findOneAndDelete(req.params.id);
    if (deletedQuiz) {
      res.status(200).json({ success: true, response: "Quiz deleted" });
    } else {
      res.status(404).json({ success: false, response: "Quiz not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
};

/* await Project.findByIdAndUpdate({ _id: projectId}, { $push:{
  guestList: guestList},  $set: {name: name} }) */

// PATCH //
const editQuiz = async (req, res) => {
  const { _id } = req.params;
  const {} = req.body;
  try {
    const quizToUpdate = await Quiz.findByIdAndUpdate({ _id}
       /* {$inc: {hearts: 1}} */
    );
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

module.exports = { getQuiz, singleQuiz, createQuiz, deleteQuiz, editQuiz, Quiz };
