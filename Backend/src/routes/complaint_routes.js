import express from 'express';
import { issueComplaint } from '../controllers/complaint_controller.js';

const router = express.Router();

router.post('/issue', issueComplaint);

export default router;