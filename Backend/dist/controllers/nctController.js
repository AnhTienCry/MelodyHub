"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.top100 = exports.top20 = exports.lyric = exports.playlist = exports.search = exports.song = exports.topic = exports.home = void 0;
const nctService_js_1 = require("../services/nctService.js");
const home = async (req, res) => {
    try {
        const data = await (0, nctService_js_1.getHome)();
        return res.json(data);
    }
    catch (error) {
        console.error('NCT home error:', error);
        return res.status(500).json({ error: 'Failed to fetch home data' });
    }
};
exports.home = home;
const topic = async (req, res) => {
    try {
        const data = await (0, nctService_js_1.getTopic)();
        return res.json(data);
    }
    catch (error) {
        console.error('NCT topic error:', error);
        return res.status(500).json({ error: 'Failed to fetch topics' });
    }
};
exports.topic = topic;
const song = async (req, res) => {
    try {
        const { key } = req.params;
        if (!key)
            return res.status(400).json({ error: 'Missing song key parameter' });
        const data = await (0, nctService_js_1.getSong)(key);
        return res.json(data);
    }
    catch (error) {
        console.error('NCT song error:', error);
        return res.status(500).json({ error: 'Failed to fetch song' });
    }
};
exports.song = song;
const search = async (req, res) => {
    try {
        const { key } = req.params;
        if (!key)
            return res.status(400).json({ error: 'Missing search key parameter' });
        const data = await (0, nctService_js_1.searchSong)(key);
        return res.json(data);
    }
    catch (error) {
        console.error('NCT search error:', error);
        return res.status(500).json({ error: 'Failed to search songs' });
    }
};
exports.search = search;
const playlist = async (req, res) => {
    try {
        const { key } = req.params;
        if (!key)
            return res.status(400).json({ error: 'Missing playlist key parameter' });
        const data = await (0, nctService_js_1.getPlaylist)(key);
        return res.json(data);
    }
    catch (error) {
        console.error('NCT playlist error:', error);
        return res.status(500).json({ error: 'Failed to fetch playlist' });
    }
};
exports.playlist = playlist;
const lyric = async (req, res) => {
    try {
        const { key } = req.params;
        if (!key)
            return res.status(400).json({ error: 'Missing lyric key parameter' });
        const data = await (0, nctService_js_1.getLyric)(key);
        return res.json(data);
    }
    catch (error) {
        console.error('NCT lyric error:', error);
        return res.status(500).json({ error: 'Failed to fetch lyrics' });
    }
};
exports.lyric = lyric;
const top20 = async (req, res) => {
    try {
        const data = await (0, nctService_js_1.getTop20)();
        return res.json(data);
    }
    catch (error) {
        console.error('NCT top20 error:', error);
        return res.status(500).json({ error: 'Failed to fetch top 20' });
    }
};
exports.top20 = top20;
const top100 = async (req, res) => {
    try {
        const { name } = req.params;
        if (!name)
            return res.status(400).json({ error: 'Missing top100 name parameter' });
        const data = await (0, nctService_js_1.getTop100)(name);
        return res.json(data);
    }
    catch (error) {
        console.error('NCT top100 error:', error);
        return res.status(500).json({ error: 'Failed to fetch top 100' });
    }
};
exports.top100 = top100;
exports.default = {
    home: exports.home,
    topic: exports.topic,
    song: exports.song,
    search: exports.search,
    playlist: exports.playlist,
    lyric: exports.lyric,
    top20: exports.top20,
    top100: exports.top100,
};
//# sourceMappingURL=nctController.js.map