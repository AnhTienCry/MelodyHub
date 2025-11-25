import * as nctapi from 'nctapi';
import { ITrack } from '../models/Track.js';
export declare const getHome: () => Promise<nctapi.NCTResponse<any>>;
export declare const getTopic: () => Promise<nctapi.NCTResponse<any>>;
export declare const getSong: (key: string) => Promise<any>;
export declare const searchSong: (key: string) => Promise<any>;
export declare const getPlaylist: (key: string) => Promise<any>;
export declare const getLyric: (key: string) => Promise<any>;
export declare const getTop20: () => Promise<any>;
export declare const getTop100: (name: string) => Promise<any>;
export declare const importTop20Tracks: () => Promise<ITrack[]>;
export declare const importTop100Tracks: (name: string) => Promise<ITrack[]>;
export declare const importSearchTracks: (query: string) => Promise<ITrack[]>;
//# sourceMappingURL=nctService.d.ts.map