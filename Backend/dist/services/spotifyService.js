import axios from 'axios';
import qs from 'qs';
let cache = {};
export async function getAppToken() {
    if (cache.token && Date.now() < (cache.expiry || 0))
        return cache.token;
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    if (!clientId || !clientSecret)
        throw new Error('Missing Spotify client credentials in env');
    const resp = await axios.post('https://accounts.spotify.com/api/token', qs.stringify({ grant_type: 'client_credentials' }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        },
    });
    cache.token = resp.data.access_token;
    cache.expiry = Date.now() + (resp.data.expires_in - 10) * 1000;
    return cache.token;
}
export async function search(q, type = 'track', limit = 10, offset = 0) {
    const token = await getAppToken();
    const r = await axios.get('https://api.spotify.com/v1/search', {
        headers: { Authorization: `Bearer ${token}` },
        params: { q, type, limit, offset },
    });
    return r.data;
}
export async function getArtist(id) {
    const token = await getAppToken();
    const r = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return r.data;
}
export async function getTrack(id) {
    const token = await getAppToken();
    const r = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return r.data;
}
export async function getAlbum(id) {
    const token = await getAppToken();
    const r = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return r.data;
}
export async function getPlaylist(id) {
    const token = await getAppToken();
    const r = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return r.data;
}
export async function getPlaylistTracks(id, limit = 50, offset = 0) {
    const token = await getAppToken();
    const r = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit, offset },
    });
    return r.data;
}
export async function getNewReleases(limit = 20) {
    const token = await getAppToken();
    const r = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit },
    });
    return r.data;
}
export async function getCategories(limit = 20) {
    const token = await getAppToken();
    const r = await axios.get('https://api.spotify.com/v1/browse/categories', {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit },
    });
    return r.data;
}
export async function getCategoryPlaylists(categoryId, limit = 20) {
    const token = await getAppToken();
    const r = await axios.get(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit },
    });
    return r.data;
}
export async function getArtistTopTracks(artistId, country = 'US') {
    const token = await getAppToken();
    const r = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { country },
    });
    return r.data;
}
export async function getArtistAlbums(artistId, limit = 20) {
    const token = await getAppToken();
    const r = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit },
    });
    return r.data;
}
export async function getAudioFeatures(id) {
    const token = await getAppToken();
    const r = await axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return r.data;
}
export async function getRecommendations(seed_tracks, seed_artists, seed_genres, limit = 20) {
    const token = await getAppToken();
    const params = { limit };
    if (seed_tracks && seed_tracks.length)
        params.seed_tracks = seed_tracks.join(',');
    if (seed_artists && seed_artists.length)
        params.seed_artists = seed_artists.join(',');
    if (seed_genres && seed_genres.length)
        params.seed_genres = seed_genres.join(',');
    const r = await axios.get('https://api.spotify.com/v1/recommendations', {
        headers: { Authorization: `Bearer ${token}` },
        params,
    });
    return r.data;
}
export default {
    getAppToken,
    search,
    getArtist,
};
//# sourceMappingURL=spotifyService.js.map