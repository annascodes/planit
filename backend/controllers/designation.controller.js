import Designation from "../models/designation.model.js"
import User from "../models/user.model.js"
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

export const usersUnderDesignation = async(req, res, next)=>{
    try {
        const allDesignations = await Designation.find().select('title').sort({createdAt: -1})
        let  desigsArray = allDesignations.map(d=>d.title)

        let result = []
        
        for(let i=0; i<allDesignations.length;i++){
            const users = await User.find({title: allDesignations[i].title}).select('username')
            result.push(
                {
                    title_id: allDesignations[i]._id,
                    title: allDesignations[i].title,
                    users
                }
            )
        }


        res.status(200).json(result)
        
    } catch (error) {
        next(error)   
    }

}

export const deleteDesignation = async(req, res, next)=>{
    console.log(req.body)

    if(req.user.title !== 'admin'){
        return next(errHandler(400, 'you can not do this action'))
    }


    try {
        
    const desig = await Designation.findByIdAndDelete(req.body.title_id)


    res.status(200).json(desig)
        
    } catch (error) {
        next(error)
    }
}