 
import Task from "../models/task.model.js"
import Team from "../models/team.model.js"
import User from "../models/user.model.js"
import { errHandler } from "../utility/err.js"
import bcryptjs from "bcryptjs"

export const getallusers = async (req, res, next) => {

    try {
        const allUsers = await User.find({ title: { $ne: 'admin' } }).select('-password')
        // const allAdmins = await User.find({ title: 'admin' })

        // if (req.user.title === 'admin')
        //     res.status(200).json([...allUsers, ...allAdmins])
        // else 
        res.status(200).json(allUsers)

    } catch (error) {
        next(error)
    }
}

export const getSingleUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select('-password')
        if (!user) return next(errHandler(404, 'user not found!'))
        res.status(200).json(user)
    } catch (error) {

        next(error)
    }
}

export const userInTasks = async (req, res, next) => {
    // console.log(`inside userInTasks ${req.params.id}`)
    try {
        const individualTasks = await Task.find({ assignedToUser: req.params.id }, { title: 1, status: 1 })
        const partOfTeams = await Team.find({ team: { $in: [req.params.id] } }, { teamName: 1 })
        let teamsId = [];
        partOfTeams.map(t => {
            teamsId.push(t._id)
        })
        const teamTasks = await Task.find({ assignedToTeam: { $in: teamsId } }, { title: 1, status: 1 })
        // console.log(teamTasks)

        res.status(200).json([...individualTasks, ...teamTasks])

    } catch (error) {
        next(error)
    }

}


export const updateUser = async (req, res, next) => {
    console.log(req.body)
    let newPassword = '';
    if (req.user.title !== 'admin' && req.user.id !== req.params.id) return next(errHandler(400, 'cant update someones profile'))
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (!user) return next(errHandler(404, 'user not found'))

        if (req.body.password) {
            if (req.body.password === '' || req.body.password === ' ')
                return next(errHandler(400, 'Password required'))
            newPassword = bcryptjs.hashSync(req.body.password, 10)
            console.log('newPassword:', newPassword)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    fullname: req.body.fullname,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password ? newPassword : user.password,
                    profileImg: req.body.profileImg,
                    title: req.user.title === 'admin' ? req.body.title : user.title,
                }
            }, { new: true })
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest)


    } catch (error) {
        next(error)
    }
}

export const activeTasks = async (req, res, next) => {
    try {
        const personalActiveTasks = await Task.find({ assignedToUser: req.params.id, status: { $ne: 'completed' } })

        const partOfTeams = await Team.find({ team: { $in: [req.params.id] } }, { teamName: 1 })

        let teamsId = [];
        partOfTeams.map(t => {
            teamsId.push(t._id)
        })

        const activeTasksWithTeam = await Task.find({ assignedToTeam: { $in: teamsId }, status: { $ne: 'completed' } })
        res.status(200).json([...activeTasksWithTeam, ...personalActiveTasks])
    } catch (error) {
        next(error)
    }
}

export const getUsersWithActiveTasks = async (req, res, next) => {
    const startIndex = req.query.startIndex || 0;
    const limit = req.query.limit || 5;

    try {
        const users = await User.find().sort({ createdAt: -1 }).skip(startIndex).limit(limit).select({username:1, title:1, profileImg:1, fullname:1, email:1, _id:1})

        let theirIds = [];
        users.map((u) => {
            theirIds.push(u._id)
        })

        const usersInTeams = {};
        for (let x = 0; x < users.length; x++) {
            const userinteams = await Team.find({ team: users[x]._id }, { _id: 1, teamName: 1 })

            const teamesIds = [];
            userinteams.map(t=>{
                teamesIds.push(t._id)
            })
            
            usersInTeams[users[x].username] = teamesIds
        }

        const response = [];
        const Users_ = Object.keys(usersInTeams)
       
        for(let x =0 ; x<Users_.length ; x++){
            // console.log(Users_[x])
            const temp =[];
            const loopTill = usersInTeams[Users_[x]]
            for (let i = 0; i < loopTill.length; i++) {
                const data = await Task.findOne({ assignedToTeam: loopTill[i], status:{$ne:'completed'} },{title:1, status:1})
                // console.log(data)
                if(data) temp.push(data)
            }
            // console.log(temp.length)
            // respose.push({[Users_[x]]: temp})
            let fullProfile = {}
            users.map(u=>{
                if(u.username === Users_[x])
                fullProfile = u
            })
            response.push(
                {
                    fullProfile,
                    // name:Users_[x],
                    work: temp
                }
            )
            // respose[Users_[x]] = temp
            
        }
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

export const generateUser = async(req, res, next)=>{
    console.log('in generation')
    if(!req.body.fullname || !req.body.gender || !req.body.title) return next(errHandler(400,'fullname , title and gender required'));
    

  
    let username = req.body.fullname.replaceAll(' ', '').toLowerCase()
    let email = username;
    let checkuser;
    let randomNum= '';
    do{
        username= username + randomNum;
        checkuser = await User.findOne({username})
        randomNum = Math.floor(Math.random() * 1000)

    }while( checkuser)

    randomNum=''
    let checkemail;
    do{
        
        email = `${username}${randomNum}@test.com`
        checkemail = await User.findOne({email})
        randomNum = Math.floor(Math.random() * 1000)

    }while( checkemail)

    const password = bcryptjs.hashSync('123', 10)

     const newUser = new User(
        {
            fullname: req.body.fullname,
            email,
            username,
            profileImg: `https://avatar.iran.liara.run/public/boy?username=${username}` || `https://ui-avatars.com/api/?name=${username}`,
            gender: req.body.gender,
            title: req.body.title,
            password,

        }
     )

    await newUser.save();

    console.log( 'out')
    res.status(200).json(newUser)
}


export const deletUser = async(req, res, next)=>{

   if(!req.body.deleteId) return next(errHandler(400, 'no deleteId'))

   try {
    const delUser = await User.findByIdAndDelete(req.body.deleteId)

    res.status(200).json(delUser)
    
   } catch (error) {
    next(error)
   }
}

