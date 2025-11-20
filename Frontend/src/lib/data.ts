export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration?: string;
  cover?: string;
  color?: string;
}
// Fetch tracks from backend API. Frontend should call this instead of using local mock data.
export async function fetchTracks(): Promise<Track[]> {
  try {
    const res = await fetch('/api/client/tracks');
    if (!res.ok) return [];
    return (await res.json()) as Track[];
  } catch (err) {
    console.error('Failed to fetch tracks', err);
    return [];
  }
}
export async function fetchTrackById(id: string): Promise<Track | null> {
  try {
    const res = await fetch(`/api/client/tracks/${id}`);
    if (!res.ok) return null;
    return (await res.json()) as Track;
  } catch (err) {
    console.error('Failed to fetch track', err);
    return null;
  }
}

