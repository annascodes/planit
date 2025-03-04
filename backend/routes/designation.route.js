import express from 'express';
import { verifyToken } from '../utility/verifyToken.js';
import { create, deleteDesignation, getAllDesigs, usersUnderDesignation } from '../controllers/designation.controller.js';

const route = express.Router();

route.post('/create', verifyToken, create)
route.get('/getalldesigs', verifyToken, getAllDesigs)
route.get('/usersunderdesignations',verifyToken, usersUnderDesignation)
route.delete('/deletedesignation', verifyToken, deleteDesignation)

export default route