import express from 'express';
import * as spotifyController from '../controllers/spotifyController.js';
const router = express.Router();
router.get('/search', spotifyController.search);
// Support being mounted at both /api/spotify and /api/songs
// When mounted at /api/songs we want GET /api/songs -> listSongs and GET /api/songs/:id -> getSong
router.get('/', spotifyController.listSongs);
router.get('/:id', spotifyController.getSong);
// Also keep explicit /songs paths for the /api/spotify mount
router.get('/songs/search', spotifyController.listSongs);
router.get('/songs', spotifyController.listSongs);
router.get('/songs/:id', spotifyController.getSong);
router.get('/artist/:id', spotifyController.artist);
router.get('/track/:id', spotifyController.track);
router.get('/album/:id', spotifyController.album);
router.get('/playlist/:id', spotifyController.playlist);
router.get('/playlist/:id/tracks', spotifyController.playlistTracks);
router.get('/new-releases', spotifyController.newReleases);
router.get('/categories', spotifyController.categories);
router.get('/categories/:id/playlists', spotifyController.categoryPlaylists);
router.get('/artist/:id/top-tracks', spotifyController.artistTopTracks);
router.get('/artist/:id/albums', spotifyController.artistAlbums);
router.get('/audio-features/:id', spotifyController.audioFeatures);
router.get('/recommendations', spotifyController.recommendations);
export default router;
//# sourceMappingURL=spotify.js.map