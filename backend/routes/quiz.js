import express from "express";
import mongoose from "mongoose";

const { User } = require("./user");

// ************ SCHEMAS & MODELS *************** //
const answerSchema = new mongoose.Schema({
  answer: { type: String, required: true, },
  isCorrect: { type: Boolean },
  numberOfAnswers: { type: String, enum: ["True/False", "Multiple"] },
 /*  minlength: 2,
  maxlength: 4 */
});
const Answers = mongoose.model("Answers", answerSchema);

const questionSchema = new mongoose.Schema({
  question: { type: String },
  imageUrl: {
    type: String,
    default: "",
  },
    questionIndex: {
    type: Number,
    default: 0,
  },
  answer: { type: [answerSchema], required: true },
  questionIndex: { type: Number, default: 0, required: true, },
});
const Questions = mongoose.model("Questions", questionSchema); 

const interactionSchema = new mongoose.Schema({
    name: {
      type: String,
      default: 'Anonymous', // Or connect to username
      maxlength: 30,
  },
    comment: {
        type: String,
        minlength: 5,
        maxlength: 140,
        trim: true
    },
    likes: {
      type: Number,
      default: 0
    },
})

const Interaction = mongoose.model("Interaction", interactionSchema); 

const quizSchema = new mongoose.Schema({
  title: { type: String, trim: true, maxlength: 40, },
  creator: { type: String }, // connect this to username
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
    default: 0 
  },
  public: {
    type: Boolean,
    default: false
  },
  interaction: {
    type: [interactionSchema]
  },
  tags: [{
    type: String,
    maxlength: 15
  }
  ]
  
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

// allquizes
// create
// personalpage (login) visar ens egna quizes antingen på en gång eller om det är via att man trycker på en knapp

// GET Quiz //
const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.find();
    res.status(200).json({ success: true, response: quiz });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
};

// GET Single Quiz //
const singleQuiz = async (req, res) => {
  try {
    const oneQuiz = await Quiz.findById(req.params.id);
    console.log(oneQuiz)
    console.log(req.params.id)
    if (oneQuiz) {
      res.status(200).json({ success: true, response: oneQuiz }); //returns all quizes
    } else {
      res.status(404).json({ error: "Quiz not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid quiz name" });
  }
};

// http://localhost:8080/quiz/

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
  console.log("deleteQuiz req.params", req.params); //does not work
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

///// COMMENT AND LIKES /////////


module.exports = { getQuiz, singleQuiz, createQuiz, deleteQuiz, editQuiz, Quiz };
