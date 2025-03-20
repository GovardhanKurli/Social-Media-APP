
const { register, login } = require("../controllers/registerController")

//Creates an Express router instance using express.Router(). This router will be used to define authentication-related routes.

const authRouter = require("express").Router()
authRouter.post('/register', register)
authRouter.post('/login', login)

module.exports = authRouter
