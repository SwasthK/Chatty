const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const SECRET = process.env.JWT_SECRET_KEY

const generatetoken = (id, res) => {
    try {
        const token = jwt.sign({ id }, SECRET, {
            expiresIn: '15d'
        })
        res.cookie("token", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
    } catch (error) {
        console.log(error);
        throw new Error("could not generate token")
    }
}

module.exports = generatetoken