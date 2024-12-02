import express from 'express'
import { verifyToken } from '../utility/verifyToken.js'
import { createTeam, getAllTeams } from '../controllers/team.controller.js'

const route = express.Router()

route.post('/createteam', verifyToken, createTeam)
route.get('/getallteams', verifyToken, getAllTeams)

export default route