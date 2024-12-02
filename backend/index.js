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


// 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