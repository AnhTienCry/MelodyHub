"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tracksController_js_1 = require("../../controllers/client/tracksController.js");
const router = express_1.default.Router();
// GET all tracks (client read-only)
router.get('/', tracksController_js_1.listTracks);
// GET track by id
router.get('/:id', tracksController_js_1.getTrack);
exports.default = router;
//# sourceMappingURL=tracks.js.map