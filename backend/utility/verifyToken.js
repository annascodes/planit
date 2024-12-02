import { errHandler } from "./err.js";
import jwt from 'jsonwebtoken'


export const verifyToken = (req, res, next)=>{
    // console.log('in verify token ')
    const token = req.cookies.access_token;
    // console.log(token)
    if(!token){
        return next(errHandler(404, 'token not found!'))
    }
    jwt.verify(token, process.env.jwt_key,(err, user)=>{
        if(err){
            console.log(err)
            return next(errHandler(400, 'err in verifying token '))
        }
        req.user = user;
        next()
    })    
}