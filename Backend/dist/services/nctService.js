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
exports.importSearchTracks = exports.importTop100Tracks = exports.importTop20Tracks = exports.getTop100 = exports.getTop20 = exports.getLyric = exports.getPlaylist = exports.searchSong = exports.getSong = exports.getTopic = exports.getHome = void 0;
const nctapi = __importStar(require("nctapi"));
const Track_js_1 = __importDefault(require("../models/Track.js"));
const top100Keys = [
    { name: 'nhactre', key: 'm3liaiy6vVsF' },
    { name: 'trutinh', key: 'RKuTtHiGC8US' },
    { name: 'nhactrinh', key: 'v0AGjIhhCegh' },
    { name: 'tienchien', key: 'TDSMAL1lI8F6' },
    { name: 'rapviet', key: 'iY1AnIsXedqE' },
    { name: 'remixviet', key: 'aY3KIEnpCywU' },
];
const getHome = async () => {
    try {
        return await nctapi.getHome();
    }
    catch (error) {
        console.error('NCT getHome error:', error);
        throw error;
    }
};
exports.getHome = getHome;
const getTopic = async () => {
    return await nctapi.getTopic();
};
exports.getTopic = getTopic;
const getSong = async (key) => {
    const rs = await nctapi.getSong(key);
    return rs.song;
};
exports.getSong = getSong;
const searchSong = async (key) => {
    const rs = await nctapi.searchSong(key);
    return rs.search;
};
exports.searchSong = searchSong;
const getPlaylist = async (key) => {
    const rs = await nctapi.getPlaylist(key);
    return rs.playlist;
};
exports.getPlaylist = getPlaylist;
const getLyric = async (key) => {
    const rs = await nctapi.getLyric(key);
    return rs.lyric;
};
exports.getLyric = getLyric;
const getTop20 = async () => {
    const rs = await nctapi.getTop20();
    return rs.ranking.song;
};
exports.getTop20 = getTop20;
const getTop100 = async (name) => {
    const entry = top100Keys.find(e => e.name === name);
    if (!entry)
        throw new Error('Invalid top100 name');
    const rs = await nctapi.getTop100(entry.key);
    return rs.playlist;
};
exports.getTop100 = getTop100;
// Transform NCT track data to our Track format
const transformNCTTrack = (nctTrack) => {
    return {
        title: nctTrack.title || nctTrack.name || '',
        artist: nctTrack.artists?.map((a) => a.name).join(', ') || nctTrack.creator || '',
        album: nctTrack.album?.title || '',
        duration: nctTrack.duration || '',
        cover: nctTrack.thumbnail || nctTrack.avatar || '',
        audioUrl: nctTrack.streamUrls?.[0]?.streamUrl || nctTrack.source?.mp3 || '',
        color: '#1db954', // Default green color
    };
};
// Import tracks from NCT Top 20
const importTop20Tracks = async () => {
    try {
        const nctData = await (0, exports.getTop20)();
        const tracks = [];
        for (const nctTrack of nctData) {
            const trackData = transformNCTTrack(nctTrack);
            if (trackData.title && trackData.artist) {
                // Check if track already exists
                const existing = await Track_js_1.default.findOne({
                    title: trackData.title,
                    artist: trackData.artist
                });
                if (!existing) {
                    const track = new Track_js_1.default(trackData);
                    await track.save();
                    tracks.push(track);
                }
            }
        }
        return tracks;
    }
    catch (error) {
        console.error('Import Top 20 error:', error);
        throw error;
    }
};
exports.importTop20Tracks = importTop20Tracks;
// Import tracks from NCT Top 100
const importTop100Tracks = async (name) => {
    try {
        const nctData = await (0, exports.getTop100)(name);
        const tracks = [];
        // NCT Top 100 returns a playlist with songs
        if (nctData.songs) {
            for (const nctTrack of nctData.songs) {
                const trackData = transformNCTTrack(nctTrack);
                if (trackData.title && trackData.artist) {
                    // Check if track already exists
                    const existing = await Track_js_1.default.findOne({
                        title: trackData.title,
                        artist: trackData.artist
                    });
                    if (!existing) {
                        const track = new Track_js_1.default(trackData);
                        await track.save();
                        tracks.push(track);
                    }
                }
            }
        }
        return tracks;
    }
    catch (error) {
        console.error('Import Top 100 error:', error);
        throw error;
    }
};
exports.importTop100Tracks = importTop100Tracks;
// Import tracks from NCT search results
const importSearchTracks = async (query) => {
    try {
        const nctData = await (0, exports.searchSong)(query);
        const tracks = [];
        if (nctData.songs) {
            for (const nctTrack of nctData.songs.slice(0, 10)) { // Limit to 10 results
                const trackData = transformNCTTrack(nctTrack);
                if (trackData.title && trackData.artist) {
                    const existing = await Track_js_1.default.findOne({
                        title: trackData.title,
                        artist: trackData.artist
                    });
                    if (!existing) {
                        const track = new Track_js_1.default(trackData);
                        await track.save();
                        tracks.push(track);
                    }
                }
            }
        }
        return tracks;
    }
    catch (error) {
        console.error('Import search tracks error:', error);
        throw error;
    }
};
exports.importSearchTracks = importSearchTracks;
//# sourceMappingURL=nctService.js.map