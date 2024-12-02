import express from 'express'
import { verifyToken } from '../utility/verifyToken.js'
import { activeTasks, deletUser, generateUser, getSingleUser, getUsersWithActiveTasks, getallusers, updateUser, userInTasks } from '../controllers/user.controller.js'


const route= express.Router()

route.get('/getallusers', verifyToken, getallusers) 
route.get('/getsingleuser/:username', verifyToken, getSingleUser) 
route.get('/userintasks/:id', verifyToken, userInTasks)
route.post('/updateuser/:id', verifyToken, updateUser)
route.get('/activetasks/:id', verifyToken, activeTasks)
route.get('/getuserswithactivetasks/', verifyToken, getUsersWithActiveTasks )
route.post('/generateuser', verifyToken, generateUser)
route.delete('/deleteuser', verifyToken, deletUser)

export default route