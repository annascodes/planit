import User from "../models/user.model.js";
import { errHandler } from "../utility/err.js";
import bcryptjs from 'bcryptjs'
import { generateToken } from "../utility/generateToken.js";

export const signup = async (req, res, next) => {
    try {
        const { fullname, email, username, gender, password } = req.body;

        const username_ = await User.findOne({ username })
        if (username_) return next(errHandler(400, 'username taken'))
        const email_ = await User.findOne({ email })
        if (email_) return next(errHandler(400, 'email taken'))

        console.log(username_, email_)
        const hashedPass = bcryptjs.hashSync(password, 10)
        const newUser = new User({
            fullname,
            email,
            username,
            password: hashedPass,
            gender,
            profileImg: `https://avatar.iran.liara.run/public/boy?username=${username}` || `https://ui-avatars.com/api/?name=${username}`
        })

        if (newUser) await newUser.save()

        res.status(200).json('User created.')
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username })
        if (!user) return next(errHandler(400, 'username not found'))

        const validPass = bcryptjs.compareSync(password, user.password)
        if (!validPass) return next(errHandler(400, 'invalid pass'))

        console.log(user._doc)
        const { password: userPass, ...rest } = user._doc;
        generateToken(user._id, user.title, res)
        res.status(200).json(rest)

    } catch (error) {
        next(error)
    }
}

export const logout = async (req, res, next) => {
    try {
        res.status(200).clearCookie('access_token').json('logged out')

    } catch (error) {
        next(error)
    }
}


