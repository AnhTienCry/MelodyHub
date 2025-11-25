import { Card, Button } from '../../../components';
import { useState, useEffect } from 'react';
import { fetchSongs, type Song } from '../../../lib/data';
import { createAdminTrack, updateAdminTrack, deleteAdminTrack } from '../../../services';

type TrackForm = {
  title: string;
  artist: string;
  album?: string;
  duration?: string;
  cover?: string;
  color?: string;
  audioUrl?: string;
  fileMp3?: File;
};

export default function AdminDashboard() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TrackForm>({
    title: '',
    artist: '',
    album: '',
    duration: '',
    cover: '',
    color: '',
    audioUrl: '',
  });

  const load = async () => {
    setLoading(true);
    const data = await fetchSongs();
    setSongs(data);
    setLoading(false);
  };

  useEffect(() => {
    // Defer the initial load to avoid calling setState synchronously inside the effect
    const timer = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const openNew = () => {
    setEditingId(null);
    setForm({
      title: '',
      artist: '',
      album: '',
      duration: '',
      cover: '',
      color: '',
      audioUrl: '',
      fileMp3: undefined,
    });
    setIsFormOpen(true);
  };

  const openEdit = (s: Song) => {
    setEditingId(s.id ?? null);
    const extended = s as Song & { audioUrl?: string };
    setForm({
      title: extended.title ?? '',
      artist: extended.artistId?.name ?? '',
      album: extended.albumId?.name ?? '',
      duration: extended.duration ?? '',
      cover: extended.cover ?? '',
      color: extended.color ?? '',
      audioUrl: extended.audioUrl ?? '',
      fileMp3: undefined, // File can't be pre-filled for editing
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('artist', form.artist);
      if (form.album) formData.append('album', form.album);
      if (form.duration) formData.append('duration', form.duration);
      if (form.cover) formData.append('cover', form.cover);
      if (form.color) formData.append('color', form.color);
      if (form.audioUrl) formData.append('audioUrl', form.audioUrl);
      if (form.fileMp3) formData.append('fileMp3', form.fileMp3);

      if (editingId) {
        await updateAdminTrack(editingId, formData);
      } else {
        await createAdminTrack(formData);
      }
      setIsFormOpen(false);
      await load();
    } catch (err) {
      console.error('Admin song save error', err);
      alert('Operation failed. Check console for details.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this track?')) return;
    try {
      await deleteAdminTrack(id);
      await load();
    } catch (err) {
      console.error('Delete error', err);
      alert('Delete failed');
    }
  };

  const handleImportTop20 = async () => {
    if (!confirm('Import Top 20 songs from NCT API? This may take a few minutes.')) return;
    try {
      const response = await fetch('/api/admin/tracks/import/top20', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        alert(`Imported ${result.tracks?.length || 0} tracks successfully!`);
        await load();
      } else {
        alert(`Import failed: ${result.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Import error', err);
      alert('Import failed. Check console for details.');
    }
  };

  const stats = [
    { title: 'Total Songs', value: songs.length.toString(), change: '+0%' },
    { title: 'Total Users', value: '0', change: '+0%' }, // TODO: Fetch from users API
    { title: 'Active Sessions', value: '0', change: '+0%' }, // TODO: Fetch from sessions API
    { title: 'Revenue', value: '$0', change: '+0%' } // TODO: Fetch from revenue API
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <h3 className="text-gray-400 text-sm">{stat.title}</h3>
            <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
            <p className="text-primary text-sm mt-1">{stat.change} from last month</p>
          </Card>
        ))}
      </div>

      {/* Song Management Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Song Management</h2>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleImportTop20}>Import Top 20</Button>
            <Button variant="primary" onClick={openNew}>Add Song</Button>
          </div>
        </div>

        <Card>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-6 text-white/60">Loading...</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Title</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Artist</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Album</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Duration</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
              <tbody>
                {songs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-white/60">
                      No songs available. Import from NCT API or add manually.
                    </td>
                  </tr>
                ) : (
                  songs.map((song) => (
                    <tr key={song.id} className="border-b border-gray-800 hover:bg-dark-light">
                      <td className="py-3 px-4 text-white">{song.title}</td>
                      <td className="py-3 px-4 text-gray-400">{song.artistId?.name}</td>
                      <td className="py-3 px-4 text-gray-400">{song.albumId?.name}</td>
                      <td className="py-3 px-4 text-gray-400">{song.duration}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="secondary" className="text-sm" onClick={() => openEdit(song)}>Edit</Button>
                          <Button variant="outline" className="text-sm text-red-500 hover:bg-red-500 hover:text-white" onClick={() => handleDelete(song.id ?? '')}>Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              </table>
            )}
          </div>
        </Card>

        {/* Simple modal form */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#0b0b10] p-6 rounded-lg w-full max-w-xl">
              <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Song' : 'Upload Song'}</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm text-white/70">Title</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded bg-white/5 text-white" required />
                </div>
                <div>
                  <label className="block text-sm text-white/70">Artist</label>
                  <input value={form.artist} onChange={(e) => setForm({ ...form, artist: e.target.value })} className="w-full px-3 py-2 rounded bg-white/5 text-white" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-white/70">Album</label>
                    <input value={form.album} onChange={(e) => setForm({ ...form, album: e.target.value })} className="w-full px-3 py-2 rounded bg-white/5 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70">Duration</label>
                    <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-3 py-2 rounded bg-white/5 text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/70">Cover URL</label>
                  <input value={form.cover} onChange={(e) => setForm({ ...form, cover: e.target.value })} className="w-full px-3 py-2 rounded bg-white/5 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-white/70">MP3 File</label>
                  <input type="file" accept="audio/mpeg" onChange={(e) => setForm({ ...form, fileMp3: e.target.files?.[0] })} className="w-full px-3 py-2 rounded bg-white/5 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80" />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 rounded bg-white/5">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-primary text-white">{editingId ? 'Save' : 'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
