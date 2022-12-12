import { User } from "./schema"

// authentication 
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
        })//401 unauthorized - inte inloggad (403 är forbidden)
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        response: error
     })
    }
  };