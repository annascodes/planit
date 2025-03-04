import Subtask from "../models/subTask.model.js";
import Task from "../models/task.model.js";
import Team from "../models/team.model.js";
import { errHandler } from "../utility/err.js";

export const createTask = async (req, res, next) => {
    console.log('inside createTask')
    console.log(req.body)

    const { title, priority, deadline, assignedtouser, assignedtoteam } = req.body;
    const createdBy = req.user.id;

    try {
        const newTask = await Task({
            createdBy,
            title,
            assignedToUser: assignedtouser,
            assignedToTeam: assignedtoteam,
            priority,
            deadline,

        })
        await newTask.save()

        res.status(200).json(newTask)

    } catch (error) {
        next(error)
    }

}

export const getAllTasks = async (req, res, next) => {

    try {
        if (req.user.title === 'admin') {
            const allTasks = await Task.find().sort({ createdAt: -1 }).populate(
                [
                    {
                        path: 'assignedToUser',
                        select: ['username', 'title']
                    },
                    {
                        path: 'assignedToTeam',
                        select: ['teamName', 'team', 'createdBy'], //'team','createdBy'
                        populate: [
                            {
                                path: 'team',
                                select: ['profileImg', 'username', 'title']
                            },
                            {
                                path: 'createdBy',
                                select: ['fullname']
                            }
                        ]

                    },
                    {
                        path: 'subtasks',

                    },
                    {
                        path: 'createdBy'
                    }

                ]
            )
            res.status(200).json(allTasks)
        } else {
            let InTeamsHesIn = await Team.find({ team: req.user.id }, { teamName: 1 })
            const InTeamsHesInIds = InTeamsHesIn.map(t => {
                return t._id
            })
            console.log(InTeamsHesIn)
            console.log(InTeamsHesInIds)

            let allTasks = await Task.find(
                {
                    assignedToTeam: { $in: InTeamsHesInIds }
                }
            ).sort({ createdAt: -1 }).populate(
                [
                    {
                        path: 'assignedToUser',
                        select: ['username', 'title']
                    },
                    {
                        path: 'assignedToTeam',
                        select: ['teamName', 'team', 'createdBy'], //'team','createdBy'
                        populate: [
                            {
                                path: 'team',
                                select: ['profileImg', 'username', 'title']
                            },
                            {
                                path: 'createdBy',
                                select: ['fullname']
                            }
                        ]

                    },
                    {
                        path: 'subtasks',
                        populate: [
                            {
                                path: 'createdBy',
                                select: ['username']
                            }
                        ]

                    },
                    {
                        path: 'createdBy'
                    }

                ]
            )
            let allTasks2 = await Task.find(
                {

                    assignedToUser: req.user.id
                }
            ).sort({ createdAt: -1 }).populate(
                [
                    {
                        path: 'assignedToUser',
                        select: ['username', 'title']
                    },
                    {
                        path: 'assignedToTeam',
                        select: ['teamName', 'team', 'createdBy'], //'team','createdBy'
                        populate: [
                            {
                                path: 'team',
                                select: ['profileImg', 'username', 'title']
                            },
                            {
                                path: 'createdBy',
                                select: ['fullname']
                            }
                        ]

                    },
                    {
                        path: 'subtasks',
                        populate: [
                            {
                                path: 'createdBy',
                                select: ['username']
                            }
                        ]

                    },
                    {
                        path: 'createdBy'
                    }

                ]
            )
            res.status(200).json([...allTasks, ...allTasks2])
        }


    } catch (error) {
        next(error)
    }
}

export const getSingleTask = async (req, res, next) => {
    try {

        const task = await Task.findOne({ _id: req.params.id }).populate(
            [
                {
                    path: 'createdBy',
                    select: ['fullname', 'username']
                },
                {
                    path: 'assignedToTeam',
                    select: ['teamName', 'team', 'createdBy'],
                    populate: [
                        {
                            path: 'team',
                            select: ['username', 'title', 'profileImg']
                        },
                        {
                            path: 'createdBy',
                            select: ['fullname']
                        }
                    ]
                },
                {
                    path: 'assignedToUser',
                    select: ['username', 'title', 'profileImg']
                },
                {
                    path: 'subtasks',
                    populate: [
                        {
                            path: 'createdBy',
                            select: ['username','title']
                        }
                    ]
                }
            ]
        )
        if (!task) return next(errHandler(404, 'task not found!'))
        res.status(200).json(task)




    } catch (error) {
        next(error)
    }
}

export const addSubTask = async (req, res, next) => {
    console.log('inside addsubtask')
    try {

        const newSubTask = new Subtask({
            createdBy: req.user.id,
            title: req.body.subtask,

        })
        await newSubTask.save()
        if (!newSubTask) return next(errHandler(400, 'err in adding subtask'))
        const addedsubtask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    subtasks: newSubTask._id,
                }
            }
        )
        let x = {...newSubTask._doc, createdBy:{title:req.user.title, _id:req.user.id}}
        res.status(200).json(x)
    } catch (error) {
        next(error)
    }
}

export const taskStats = async(req, res, next)=>{
    try {
        let todo = 0;
        let inprogress = 0;
        let completed = 0;
        const tasks = await Task.find({},{status:1})
        tasks.map(t=>{
            if(t.status === 'todo') todo++;
            if(t.status === 'inprogress') inprogress++;
            if(t.status === 'completed') completed++;
        })
        res.status(200).json({todo, inprogress, completed})
    } catch (error) {
        next(error)
    }
}

export const deleteSubtask = async(req, res, next)=>{
    const subtaskId = req.body.subtaskId;
    try {
        const subtask = await Subtask.findOne({_id:subtaskId}).populate({path:'createdBy',select:['title']})
        if(!subtask) return next(errHandler(404, 'subtask not found'))

        if (!(subtask.createdBy._id.toString() === req.user.id)   ){
           if(req.user.title !== 'admin')
           {
            return next(errHandler(403, 'only owner of this post and admins can delete it!'))
           }
        }
        const subtask_ = await Subtask.findByIdAndDelete(subtaskId)
        res.status(200).json({subtask})       
    } catch (error) {
        next(error)
    }
}

export const updateSubtask = async(req, res, next)=>{
    console.log(req.params.id)
    console.log(req.body)
    try {
        const subtask = await Subtask.findByIdAndUpdate(
            req.params.id,
           {
            $set:{
                status: req.body.status,
                title: req.body.title,
            }
           },
           {new:true}
        )

        const st = await Subtask.findOne({_id:subtask._id}).populate({path:'createdBy',select:['username', 'fullname', 'title']})
        res.status(200).json(st)
        
    } catch (error) {
        next(error)
    }

}

export const updateIsSeen = async(req, res, next)=>{
    try {
        const task = await Task.findByIdAndUpdate(req.params.id,{
            $set:{
                isSeen: true
            }
        },{new:true})
        
        res.status(200).json({msg:'task isSeen is updated: ', updatedTask: task})
        
    } catch (error) {
        next(error)
    }
}