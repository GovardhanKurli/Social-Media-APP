const User = require('../models/User')
const jwt = require("jsonwebtoken")

const bcrypt = require('bcrypt')

const register = async (req, res) => {
    console.log('register')
    try {
        const isEmpty = Object.values(req.body).some((empty) => !empty)
        if (isEmpty) {
            throw new Error("Enter  all required fields!")
        }

        const isExisting = await User.findOne({ username: req.body.username })
        if (isExisting) {
            throw new Error(" This user is already member register anther account")
        }
        console.log(req.body)  
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({ ...req.body, password: hashedPassword })
        await user.save()
        const payload = { id: user._id, username: user.username }
        const { password, ...others } = user._doc
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        return res.status(201).json({ token, others })
    } 
    catch (error) {
        return res.status(500).json(error.message)
    }
}


const login = async (req, res) => {
    try {
        const isEmpty = Object.values(req.body).some((v) => !v)
        if (isEmpty) {
            throw new Error("Fill all fields!")
        }

        //Finds a user by their email. If no user is found, it throws an error.
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw new Error("Wrong credentials")
        }

        //Compares the provided password with the hashed password stored in the database. If they don’t match, it throws an error.
        const comparePass = await bcrypt.compare(req.body.password, user.password)
        if (!comparePass) {
            throw new Error("Wrong credentials")
        }

        //Creates a JWT with the user’s ID and username as payload and signs it using a secret key.
        const payload = { id: user._id, username: user.username }
        const { password, ...others } = user._doc

        const token = jwt.sign(payload, process.env.JWT_SECRET)

        //Sends a JSON response with the JWT and user details (excluding the password).
        return res.status(200).json({ token, others })
    } 
    //Catches and returns any errors that occur during the process.
    catch (error) {
        return res.status(500).json(error.message)
    }
}


module.exports = {
    register,
    login
}