"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const database_js_1 = __importDefault(require("../config/database.js"));
const nctService_js_1 = require("../services/nctService.js");
const runImport = async () => {
    try {
        await (0, database_js_1.default)();
        console.log('Connected to database');
        console.log('Importing Top 20 tracks...');
        const top20Tracks = await (0, nctService_js_1.importTop20Tracks)();
        console.log(`Imported ${top20Tracks.length} tracks from Top 20`);
        console.log('Importing Top 100 Nhac Tre...');
        const top100Tracks = await (0, nctService_js_1.importTop100Tracks)('nhactre');
        console.log(`Imported ${top100Tracks.length} tracks from Top 100 Nhac Tre`);
        console.log('Importing search results for "love"...');
        const searchTracks = await (0, nctService_js_1.importSearchTracks)('love');
        console.log(`Imported ${searchTracks.length} tracks from search`);
        console.log('Import completed successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('Import failed:', error);
        process.exit(1);
    }
};
runImport();
//# sourceMappingURL=importNCT.js.map