import express from 'express';
import {registerUser} from '../controllers/register_controller';

const router = express.Router();

router.post("/",registerUser);

export default router;