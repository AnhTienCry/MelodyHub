import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { fetchTracks, type Track } from '../../../lib/data';
import { Link } from 'react-router-dom';

function SearchPage() {
  const [query, setQuery] = useState('');

  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchTracks().then((t) => {
      if (mounted) setTracks(t);
    });
    return () => { mounted = false };
  }, []);

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black flex flex-col">
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none z-10" />

      <div className="relative z-20 flex-1 flex flex-col max-w-5xl mx-auto w-full p-8 md:p-12 pt-24">
        {/* Search Input */}
        <div className="relative mb-16">
            <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, ease: 'circOut' }}
            className="absolute bottom-0 left-0 h-px bg-white/20"
          />
          <input
            type="text"
            placeholder="Search for vibes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-4xl md:text-7xl font-bold text-white placeholder:text-white/10 focus:outline-none py-8 tracking-tight"
            autoFocus
          />
          <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 w-8 h-8 md:w-12 md:h-12" />
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
          {query && filteredTracks.length === 0 ? (
            <div className="text-white/30 text-xl">No vibes found matching "{query}"</div>
          ) : (
            <div className="grid gap-4">
              {(query ? filteredTracks : tracks).map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to="/client/player"
                    className="group flex items-center justify-between p-6 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative w-16 h-16 overflow-hidden rounded-lg">
                        <img
                          src={track.cover}
                          alt={track.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white/80 group-hover:text-white transition-colors">
                          {track.title}
                        </h3>
                        <p className="text-white/40 group-hover:text-white/60 transition-colors">{track.artist}</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="text-white" size={20} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default SearchPage;
