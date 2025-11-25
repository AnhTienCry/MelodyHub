"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrack = exports.updateTrack = exports.createTrack = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Track_js_1 = __importDefault(require("../../models/Track.js"));
// Ensure uploads directory exists
const uploadsDir = path_1.default.join(process.cwd(), 'uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
// Multer config for MP3 files
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3') {
        cb(null, true);
    }
    else {
        cb(new Error('Only MP3 files are allowed!'));
    }
};
exports.upload = (0, multer_1.default)({ storage, fileFilter });
const createTrack = async (req, res) => {
    try {
        const payload = { ...req.body };
        if (req.file) {
            payload.fileMp3 = `/uploads/${req.file.filename}`;
        }
        const track = new Track_js_1.default(payload);
        await track.save();
        return res.status(201).json(track);
    }
    catch (err) {
        console.error('createTrack error', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.createTrack = createTrack;
const updateTrack = async (req, res) => {
    try {
        const { id } = req.params;
        const payload = { ...req.body };
        if (req.file) {
            payload.fileMp3 = `/uploads/${req.file.filename}`;
        }
        const updated = await Track_js_1.default.findByIdAndUpdate(id, payload, { new: true }).lean();
        if (!updated)
            return res.status(404).json({ message: 'Track not found' });
        return res.json(updated);
    }
    catch (err) {
        console.error('updateTrack error', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.updateTrack = updateTrack;
const deleteTrack = async (req, res) => {
    try {
        const { id } = req.params;
        const track = await Track_js_1.default.findById(id);
        if (track && track.fileMp3) {
            // Delete file from disk
            const filePath = path_1.default.join(process.cwd(), track.fileMp3.replace('/uploads/', 'uploads/'));
            if (fs_1.default.existsSync(filePath)) {
                fs_1.default.unlinkSync(filePath);
            }
        }
        const deleted = await Track_js_1.default.findByIdAndDelete(id).lean();
        if (!deleted)
            return res.status(404).json({ message: 'Track not found' });
        return res.json({ message: 'Deleted' });
    }
    catch (err) {
        console.error('deleteTrack error', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteTrack = deleteTrack;
//# sourceMappingURL=tracksController.js.map