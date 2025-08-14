import express from 'express';
import {createUser} from '../controllers/register_controller.js';

const router = express.Router();

router.post("/",createUser);

export default router;