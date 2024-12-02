import express from 'express';
import { verifyToken } from '../utility/verifyToken.js';
import { create, getAllDesigs } from '../controllers/designation.controller.js';

const route = express.Router();

route.post('/create', verifyToken, create)
route.get('/getalldesigs', verifyToken, getAllDesigs)

export default route