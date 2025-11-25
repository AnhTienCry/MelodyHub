import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Song from '../../models/Song.js';
// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir))
    fs.mkdirSync(uploadsDir, { recursive: true });
// Multer config for MP3 files
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});
const fileFilter = (_req, file, cb) => {
    if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3')
        cb(null, true);
    else
        cb(new Error('Only MP3 files are allowed!'));
};
export const upload = multer({ storage, fileFilter });
export const createSong = async (req, res) => {
    try {
        const payload = { ...req.body };
        if (req.file)
            payload.fileMp3 = `/uploads/${req.file.filename}`;
        const song = new Song(payload);
        await song.save();
        return res.status(201).json(song);
    }
    catch (err) {
        console.error('createSong error', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
export const updateSong = async (req, res) => {
    try {
        const { id } = req.params;
        const payload = { ...req.body };
        if (req.file)
            payload.fileMp3 = `/uploads/${req.file.filename}`;
        const updated = await Song.findByIdAndUpdate(id, payload, { new: true }).lean();
        if (!updated)
            return res.status(404).json({ message: 'Song not found' });
        return res.json(updated);
    }
    catch (err) {
        console.error('updateSong error', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
export const deleteSong = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id);
        if (song && song.fileMp3) {
            const filePath = path.join(process.cwd(), song.fileMp3.replace('/uploads/', 'uploads/'));
            if (fs.existsSync(filePath))
                fs.unlinkSync(filePath);
        }
        const deleted = await Song.findByIdAndDelete(id).lean();
        if (!deleted)
            return res.status(404).json({ message: 'Song not found' });
        return res.json({ message: 'Deleted' });
    }
    catch (err) {
        console.error('deleteSong error', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
export default { createSong, updateSong, deleteSong, upload };
//# sourceMappingURL=songsController.js.map