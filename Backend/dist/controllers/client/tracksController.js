"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrack = exports.listTracks = void 0;
const Track_js_1 = __importDefault(require("../../models/Track.js"));
const listTracks = async (req, res) => {
    try {
        const tracks = await Track_js_1.default.find().sort({ createdAt: -1 }).lean();
        return res.json(tracks);
    }
    catch (err) {
        console.error('client listTracks error', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.listTracks = listTracks;
const getTrack = async (req, res) => {
    try {
        const { id } = req.params;
        const track = await Track_js_1.default.findById(id).lean();
        if (!track)
            return res.status(404).json({ message: 'Track not found' });
        return res.json(track);
    }
    catch (err) {
        console.error('client getTrack error', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.getTrack = getTrack;
//# sourceMappingURL=tracksController.js.map