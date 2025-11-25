"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tracksController_1 = require("../../controllers/admin/tracksController");
const auth_1 = require("../../middleware/auth");
const nctService_js_1 = require("../../services/nctService.js");
const router = express_1.default.Router();
router.post('/', auth_1.authenticate, auth_1.requireAdmin, tracksController_1.upload.single('fileMp3'), tracksController_1.createTrack);
router.put('/:id', auth_1.authenticate, auth_1.requireAdmin, tracksController_1.upload.single('fileMp3'), tracksController_1.updateTrack);
router.delete('/:id', auth_1.authenticate, auth_1.requireAdmin, tracksController_1.deleteTrack);
// Import routes
router.post('/import/top20', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const tracks = await (0, nctService_js_1.importTop20Tracks)();
        res.json({ message: `Imported ${tracks.length} tracks from Top 20`, tracks });
    }
    catch (error) {
        console.error('Import top20 error:', error);
        res.status(500).json({ error: 'Failed to import Top 20 tracks' });
    }
});
router.post('/import/top100/:name', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const { name } = req.params;
        if (!name)
            return res.status(400).json({ error: 'Name parameter required' });
        const tracks = await (0, nctService_js_1.importTop100Tracks)(name);
        res.json({ message: `Imported ${tracks.length} tracks from Top 100 ${name}`, tracks });
    }
    catch (error) {
        console.error('Import top100 error:', error);
        res.status(500).json({ error: 'Failed to import Top 100 tracks' });
    }
});
router.post('/import/search', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const { query } = req.body;
        if (!query)
            return res.status(400).json({ error: 'Query parameter required' });
        const tracks = await (0, nctService_js_1.importSearchTracks)(query);
        res.json({ message: `Imported ${tracks.length} tracks from search "${query}"`, tracks });
    }
    catch (error) {
        console.error('Import search error:', error);
        res.status(500).json({ error: 'Failed to import search tracks' });
    }
});
exports.default = router;
//# sourceMappingURL=tracks.js.map