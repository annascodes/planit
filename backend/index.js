import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { dbConnection } from './config/dbConn.js'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import teamRouter from './routes/team.route.js'
import taskRouter from './routes/task.route.js'
import designationRouteer from './routes/designation.route.js'


const app = express()
app.use(express.json())
app.use(cookieParser())
dotenv.config()





app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/team', teamRouter)
app.use('/api/task', taskRouter)
app.use('/api/designation', designationRouteer)





const port = process.env.PORT || 8000;
app.listen(port,  ()=>{
    console.log(`-- SERVER RUNNING ON ${port} --`.bgYellow.black)
    dbConnection()
    // // console.log(process.env.db_path)
    // await mongoose.connect(process.env.db_path)
    // .then(()=>{
    //     console.log(`-- db connected -- `.bgGreen.white)
    // })
    // .catch((err)=>{
    //     console.log(` -- err in db conn -- `.bgRed)
    //     console.log(err)
    // })
})
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'middleware err msg'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

 
//----------instruction for newbies-------(or new comers)
// git init
// git add .
// git commit -m "message for commit"

// then create repo and connect it by commands from github like:
//1- git remote add origin https://github.com/annascodes/mern-auth.git
//2- git branch - M main
//3- git push - u origin main

// remote authentication error:
//1- go to account settings
//2- then go to developer settings
//3- create token copied the token
//4- git remote set-url origin http://<created_token>@github...
//5- git push - u origin main
