import type { Request, Response } from 'express';
import Track from '../../models/Track.js';

export const listTracks = async (req: Request, res: Response) => {
  try {
    const tracks = await Track.find().sort({ createdAt: -1 }).lean();
    return res.json(tracks);
  } catch (err) {
    console.error('client listTracks error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getTrack = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const track = await Track.findById(id).lean();
    if (!track) return res.status(404).json({ message: 'Track not found' });
    return res.json(track);
  } catch (err) {
    console.error('client getTrack error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
