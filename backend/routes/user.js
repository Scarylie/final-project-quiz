import bcrypt from "bcrypt";

import { User } from "./schema"

// här är det const istället för "app.get" osv och så ligger "app.get" i server.js och vi måste inportera consten
 export const RegisterUser = async (req, res) => {
    const { username, password, email } = req.body;
      try {
        const salt = bcrypt.genSaltSync();
        if (password.length < 5) {
          res.status(400).json({
            success: false,
            response: "Password must be at least 5 characters long"
          })
        } else {
          const newUser = await new User({username: username, password: bcrypt.hashSync(password, salt), email: email}).save();
          res.status(201).json({
            success: true,
            response: {
              username: newUser.username,
              accessToken: newUser.accessToken,
              email: newUser.email,
              id: newUser._id
            }
          });
        }
      } catch(error) {
        res.status(400).json({
          success: false,
          response: error // vi måste fixa så error syns i frontend
        });
      }
  };

   export const LoginUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
      const user = await User.findOne({username});
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          success: true,
          response: {
            username: user.username,
            accessToken: user.accessToken,
            id: user._id,
            email: user.email
          }
        });
      } else {
        res.status(400).json({
          success: false,
          response: "Incorrect username or password. Type the correct username and password, and try again."
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        response: error
      });
    }
  };

  export const authenticateUser = async (req, res, next) => {
    const accessToken = req.header("Athorization");
    try {
      const user = await User.findOne({accessToken: accessToken});
      if (user) {
        next()
      } else {
        res.status(401).json({
          success: false,
          response: "Please log in"
        })
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        response: error
     })
    }
  };