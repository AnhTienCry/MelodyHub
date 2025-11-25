"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSong = exports.listSongs = void 0;
const Song_js_1 = __importDefault(require("../../models/Song.js"));
const spotifyService = __importStar(require("../../services/spotifyService.js"));
// List songs for clients. If DB is empty, fetch from Spotify, save to DB, and return saved songs.
const listSongs = async (req, res) => {
    try {
        const q = String(req.query.q || 'lofi');
        const limit = Number(req.query.limit || 12);
        let songs = await Song_js_1.default.find().sort({ createdAt: -1 }).lean();
        if (!songs || songs.length === 0) {
            // Fetch from Spotify and upsert into DB by spotifyId
            try {
                const spotifyData = await spotifyService.search(q, 'track', limit);
                const items = spotifyData?.tracks?.items || [];
                if (items.length > 0) {
                    const ops = items.map((t) => {
                        const doc = {
                            spotifyId: t.id,
                            title: t.name,
                            artist: (t.artists || []).map((a) => a.name).join(', '),
                            album: t.album?.name,
                            duration: t.duration_ms ? `${Math.floor(t.duration_ms / 60000)}:${String(Math.floor((t.duration_ms % 60000) / 1000)).padStart(2, '0')}` : undefined,
                            cover: t.album?.images?.[0]?.url,
                            audioUrl: t.preview_url || undefined,
                        };
                        return {
                            updateOne: {
                                filter: { spotifyId: t.id },
                                update: { $set: doc },
                                upsert: true,
                            },
                        };
                    });
                    // Execute bulk upsert
                    if (ops.length > 0) {
                        await Song_js_1.default.bulkWrite(ops);
                        // Read back the inserted/updated docs
                        const spotifyIds = items.map((t) => t.id);
                        songs = await Song_js_1.default.find({ spotifyId: { $in: spotifyIds } }).lean();
                    }
                }
            }
            catch (err) {
                console.error('Failed to fetch from Spotify', err);
                // Return empty list if spotify fails
                return res.json([]);
            }
        }
        return res.json(songs);
    }
    catch (err) {
        console.error('listSongs error', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.listSongs = listSongs;
const getSong = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await Song_js_1.default.findById(id).lean();
        if (!song)
            return res.status(404).json({ message: 'Song not found' });
        return res.json(song);
    }
    catch (err) {
        console.error('getSong error', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.getSong = getSong;
exports.default = { listSongs: exports.listSongs, getSong: exports.getSong };
//# sourceMappingURL=songsController.js.map