import { Card, Button } from '../../../components';
import { useState } from 'react';

export default function AdminSongs() {
  const [songs] = useState([
    { id: 1, title: 'Summer Vibes', artist: 'DJ Cool', album: 'Beach Party', duration: '3:45', plays: '12.5K' },
    { id: 2, title: 'Night Drive', artist: 'The Waves', album: 'Journey', duration: '4:20', plays: '8.3K' },
    { id: 3, title: 'Morning Coffee', artist: 'Jazz Trio', album: 'Cafe Sessions', duration: '5:15', plays: '15.2K' },
    { id: 4, title: 'Rock Anthem', artist: 'Thunder Band', album: 'Live Concert', duration: '6:30', plays: '20.1K' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Song Management</h1>
        <Button variant="primary">Upload Song</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Title</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Artist</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Album</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Duration</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Plays</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song.id} className="border-b border-gray-800 hover:bg-dark-light">
                  <td className="py-3 px-4 text-white font-medium">{song.title}</td>
                  <td className="py-3 px-4 text-gray-400">{song.artist}</td>
                  <td className="py-3 px-4 text-gray-400">{song.album}</td>
                  <td className="py-3 px-4 text-gray-400">{song.duration}</td>
                  <td className="py-3 px-4 text-primary">{song.plays}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button variant="secondary" className="text-sm">Edit</Button>
                      <Button variant="outline" className="text-sm text-red-500 hover:bg-red-500 hover:text-white">Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
