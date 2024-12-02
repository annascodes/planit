import Designation from "../models/designation.model.js"
import { errHandler } from "../utility/err.js"

export const create = async(req, res, next)=>{
    console.log(req.body)
    if(req.user.title !== 'admin') return next(errHandler(400, 'dont have the authority to add new designation'))
    try {
        const newDesig = new Designation({
            createdBy: req.user.id,
            title: req.body.title.toLowerCase(),
        })

        if(!newDesig) return next(errHandler(400, 'err in create new designation'))
        await newDesig.save()
       res.status(200).json(newDesig)
    } catch (error) {
        
    }
}

export const getAllDesigs = async(req, res, next)=>{

    try {
        const allDigs = await Designation.find().populate(
            [
                {
                    path:'createdBy',
                    select: 'username'
                }
            ]
        )
        res.status(200).json(allDigs)
    } catch (error) {
        
    }
}