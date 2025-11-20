import express from 'express';
import { listTracks, getTrack } from '../../controllers/client/tracksController.js';

const router = express.Router();

// GET all tracks (client read-only)
router.get('/', listTracks);

// GET track by id
router.get('/:id', getTrack);

export default router;
