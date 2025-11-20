import express from 'express';
import { createTrack, updateTrack, deleteTrack } from '../../controllers/admin/tracksController';
import { authenticate, requireAdmin } from '../../middleware/auth';

const router = express.Router();

router.post('/', authenticate, requireAdmin, createTrack);
router.put('/:id', authenticate, requireAdmin, updateTrack);
router.delete('/:id', authenticate, requireAdmin, deleteTrack);

export default router;
