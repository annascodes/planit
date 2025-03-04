import express from 'express'
import { verifyToken } from '../utility/verifyToken.js';
import { addSubTask, createTask, deleteSubtask, getAllTasks, getSingleTask, taskStats, updateIsSeen, updateSubtask } from '../controllers/task.controller.js';

const route = express.Router();

route.post('/createtask', verifyToken, createTask)
route.get('/getalltasks', verifyToken, getAllTasks )
route.get('/getsingletask/:id', verifyToken, getSingleTask)
route.post('/addsubtask/:id', verifyToken, addSubTask)
route.get('/taskstats', verifyToken, taskStats)
route.delete('/deletesubtask', verifyToken, deleteSubtask)
route.post('/updatesubtask/:id', verifyToken, updateSubtask )
route.post('/updateisseen/:id', verifyToken, updateIsSeen)

export default  route;