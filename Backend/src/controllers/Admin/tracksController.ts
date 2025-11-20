import type { Request, Response } from 'express';
import Track from '../../models/Track.js';

export const createTrack = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const track = new Track(payload);
    await track.save();
    return res.status(201).json(track);
  } catch (err) {
    console.error('createTrack error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateTrack = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Track.findByIdAndUpdate(id, req.body, { new: true }).lean();
    if (!updated) return res.status(404).json({ message: 'Track not found' });
    return res.json(updated);
  } catch (err) {
    console.error('updateTrack error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTrack = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Track.findByIdAndDelete(id).lean();
    if (!deleted) return res.status(404).json({ message: 'Track not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('deleteTrack error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
