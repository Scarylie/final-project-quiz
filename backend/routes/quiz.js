import express from "express";
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
    // connect to username denna syns inte i consolen
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
    type: String, // syns ej i console
    enum: ["easy", "medium", "hard"],
  }, // tror vi vill ha nån automatisk question index
});
const Quiz = mongoose.model("Quiz", quizSchema);
/* module.exports = mongoose.model("Quiz", quizSchema); */

/* Template for POSTMAN */
/* const ForPostmanTesting = 

{
  "title": "Template quiz",
  "creator": "User name",
  "questions": 
    [{
      "question": "Question one?",
      "imageUrl":"http://image.com",
      "answers":  [{
        "answer": "answer one",
        "isCorrect": true
       }
      ,
        {
        "answer": "answer two",
        "isCorrect": false
       }
      ,
        {
        "answer": "answer three",
        "isCorrect": false
       }
      ,
       {
        "answer": "answer four",
        "isCorrect": false
       }
      ]
    },
    {
      "question": "Question 2?",
      "imageUrl":"http://image.com",
      "answers":  [{
        "answer": "answer one",
        "isCorrect": true
       }
      ,
        {
        "answer": "answer two",
        "isCorrect": false
       }
      ]
    }
  ],
  "interaction":[{
      "name":"username 1",
      "comment":"comment"
  },{
      "name":"username 2",
      "comment":"comment"
  }
  ],
  "category": ["category" , "second tag"],
  "level": "easy"
}

*/

// ************ ENDPOINTS *************** //

// allquizes
// create
// personalpage (login) visar ens egna quizes antingen på en gång eller om det är via att man trycker på en knapp

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
  /*   const { _id } = req.params; */
  const { title, questions, category, level, interaction } = req.body;

  try {
    const newQuiz = await new Quiz({
      title,
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
  console.log(`Before updating quiz ${_id}`)
  const {updateQuestions} = req.body;
  console.log(JSON.stringify(updateQuestions))
  try {

    const updatedQuiz = await Quiz.updateOne({_id: _id},{ $set: { questions: updateQuestions }})
  
    console.log(JSON.stringify(updatedQuiz))
    console.log(`After updating quiz ${_id}`)
    // optional approach
    // const arrayOfPropertyNames = Object.keys(valuesToUpdate);
    // arrayOfPropertyNames.map((singlePropertyName) => {
    //   await Quiz.updateOne({_id: _id},{ $set: { singlePropertyName: valuesToUpdate[singlePropertyName] }})
    //   quizToUpdate[singlePropertyName] = valuesToUpdate[singlePropertyName];
    // });
    // quizToUpdate.save();
    if (updatedQuiz) {
      res.status(200).json({
        success: true,
        response: `Quiz ${_id} has been updated`,
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
