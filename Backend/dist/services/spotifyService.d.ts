export declare function getAppToken(): Promise<string>;
export declare function search(q: string, type?: string, limit?: number, offset?: number): Promise<any>;
export declare function getArtist(id: string): Promise<any>;
export declare function getTrack(id: string): Promise<any>;
export declare function getAlbum(id: string): Promise<any>;
export declare function getPlaylist(id: string): Promise<any>;
export declare function getPlaylistTracks(id: string, limit?: number, offset?: number): Promise<any>;
export declare function getNewReleases(limit?: number): Promise<any>;
export declare function getCategories(limit?: number): Promise<any>;
export declare function getCategoryPlaylists(categoryId: string, limit?: number): Promise<any>;
export declare function getArtistTopTracks(artistId: string, country?: string): Promise<any>;
export declare function getArtistAlbums(artistId: string, limit?: number): Promise<any>;
export declare function getAudioFeatures(id: string): Promise<any>;
export declare function getRecommendations(seed_tracks?: string[], seed_artists?: string[], seed_genres?: string[], limit?: number): Promise<any>;
declare const _default: {
    getAppToken: typeof getAppToken;
    search: typeof search;
    getArtist: typeof getArtist;
};
export default _default;
//# sourceMappingURL=spotifyService.d.ts.map