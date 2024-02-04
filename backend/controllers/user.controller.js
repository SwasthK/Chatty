const User = require('../models/usermodel')
const bcryptjs = require('bcryptjs')
const generatetoken = require('../utils/tokens')

const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmpassword, gender } = req.body

        if (password !== confirmpassword) {
            return res.status(400).json({ msg: "password does not match" })
        }

        const finduser = await User.findOne({ username })

        if (finduser) {
            return res.status(400).json({ msg: "username already exists" })
        }

        //hash
        const salt = await bcryptjs.genSalt(10)
        const hash = await bcryptjs.hash(password, salt)

        //api call
        const profileboy = `https://avatar.iran.liara.run/public/boy?username=${fullname}`
        const profilegirl = `https://avatar.iran.liara.run/public/girl?username=${fullname}`

        const newUser = new User({
            fullname,
            username,
            password: hash,
            gender,
            profilepicture: gender == "male" ? profileboy : profilegirl
        })

        if (newUser) {
            generatetoken(newUser._id, res)

            await newUser.save()

            res.status(201).json({
                fullname: newUser.fullname,
                username: newUser.username,
                password: newUser.password,
                gender: newUser.gender,
                profilepicture: newUser.profilepicture
            })

        }
        else {
            res.status(500).json({ error: "couldn't add the user" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const find = await User.findOne({ username });

        if (!find) {
            return res.status(400).json({ msg: "No user found with the username" });
        }

        const varifypassword = await bcryptjs.compare(password, find.password);

        if (varifypassword) {
            generatetoken(find._id, res);
            return res.status(200).json(find);
        }

        return res.status(400).json({ msg: "Password doesn't match" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const logout = (req, res) => {
    try {
        res.cookie("token", "", {
            maxAge: 0
        })
        res.status(200).json({
            msg: "Logout successfull"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    signup,
    login,
    logout
}
