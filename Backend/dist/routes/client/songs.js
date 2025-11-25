"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const songsController_js_1 = require("../../controllers/client/songsController.js");
const router = express_1.default.Router();
// Query params supported: `q` and `limit` -> when provided or when DB empty, controller will fetch from Spotify and upsert
router.get('/search', songsController_js_1.listSongs);
router.get('/', songsController_js_1.listSongs);
router.get('/:id', songsController_js_1.getSong);
exports.default = router;
//# sourceMappingURL=songs.js.map