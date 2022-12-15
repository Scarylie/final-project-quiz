import express from "express";
import mongoose from "mongoose";

// ************ SCHEMAS & MODELS *************** //
const answerModelSchema = new mongoose.Schema({
  answer: { type: String },
  isCorrect: { type: Boolean },
});

/* const questionModelSchema = new mongoose.Schema({
  question: { type: String },
  answers: [
    [
      {
        type: { type: answerModelSchema },
      },
    ],
  ],
}); */

const questionModelSchema = new mongoose.Schema({
  question: { type: String },
  answers: { type: [answerModelSchema],
   }
});

/* const quizModelSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
  questions: [
    [
      {
        type: { type: questionModelSchema },
      },
    ],
  ],
});
const Quiz = mongoose.model("Quiz", quizModelSchema); */

const quizModelSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
  questions: {
        type:[ questionModelSchema] 
      }
});
const Quiz = mongoose.model("Quiz", quizModelSchema);

// ************ ENDPOINTS *************** //

// GET Quiz //
const getQuiz = async (req, res) => {
  try {
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
  const { userId } = req.params
  const { title, author } = req.body;
  console.log("questionList inside get quiz: req.body", req.body);

  try {
    const newQuiz = await new Quiz({ title, author, questions }).save();
    res.status(201).json({ success: true, response: newQuiz });
  } catch (error) {
    res.status(400).json({ success: false, response: "Failed to add quiz", error: error });
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
  const {} = req.body
  try {
    const quizToUpdate = await Quiz.findByIdAndUpdate(
      _id /* {$inc: {hearts: 1}} */
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

module.exports = { getQuiz, singleQuiz, createQuiz, deleteQuiz, editQuiz };

/* quizTemplate for POSTMAN 

{
  "title": "Music quiz",
  "author": "Saralie",
  "questions": [[{
    "question": "Who won eurovision 2012?",
    "answers": [[{
      "answer": "Loreen",
      "isCorrect": true,
    }]],
  }]],
}); 

*/
