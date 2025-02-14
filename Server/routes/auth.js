//Imports the register and login functions from the authController module. These functions will handle the logic for user registration and login.

const { register, login } = require("../controllers/registerController")

//Creates an Express router instance using express.Router(). This router will be used to define authentication-related routes.

const authRouter = require("express").Router()
//   register route

authRouter.post('/register', register)


//   login route
authRouter.post('/login', login)

//Exports the authRouter instance so it can be used in other parts of the application, typically in the main server file where all routes are assembled.
module.exports = authRouter
