import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchTracks, type Track } from '../../../lib/data';
import { Link } from 'react-router-dom';
import { Play, Heart, MoreHorizontal } from 'lucide-react';

function Home() {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchTracks().then((t) => {
      if (mounted) setTracks(t);
    });
    return () => { mounted = false };
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* Background Noise */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none z-10" />

      {/* Ambient Light */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/30 blur-[120px] rounded-full pointer-events-none" />


      <div className="relative z-20 pt-24 pb-12">
        {/* Hero Section */}
        <section className="px-6 md:px-12 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 pt-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/50 mb-4">
              Discover
            </h1>
            <p className="text-white/50 text-xl max-w-md">
              Sonic landscapes curated for your soul. Dive into the void.
            </p>
          </motion.div>

          {/* Featured / Floating Gallery */}
          <div className="relative w-full overflow-x-auto no-scrollbar pb-8 -mx-6 px-6 md:-mx-12 md:px-12">
            <div className="flex gap-6 min-w-max">
              {tracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="group relative w-[280px] md:w-[320px] aspect-3/4 shrink-0"
                >
                  <Link to="/client/player" className="block w-full h-full">
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/90 z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-full h-full object-cover rounded-2xl grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-[1.02]"
                    />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20 hover:bg-white/20 hover:scale-110 transform">
                        <Play size={20} className="fill-white text-white ml-1" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1 leading-tight">{track.title}</h3>
                      <p className="text-white/60 font-medium">{track.artist}</p>
                    </div>

                    {/* Hover Glow */}
                    <div
                      className={`absolute -inset-4 bg-linear-to-br ${track.color} opacity-0 group-hover:opacity-30 blur-2xl -z-10 transition-opacity duration-500`}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
            <Link to="#" className="text-sm text-white/40 hover:text-white transition-colors">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.slice(0, 6).map((track, i) => (
              <div
                key={`trending-${i}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={16} className="fill-white text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">{track.title}</h4>
                  <p className="text-white/40 text-sm truncate">{track.artist}</p>
                </div>
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-white/40 hover:text-white">
                    <Heart size={18} />
                  </button>
                  <button className="text-white/40 hover:text-white">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                <span className="text-white/20 text-sm font-mono">{track.duration}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-12 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Your Mix</h2>
            <Link to="#" className="text-sm text-white/40 hover:text-white transition-colors">
              View All
            </Link>
          </div>

          <div className="relative w-full overflow-x-auto no-scrollbar -mx-6 px-6 md:-mx-12 md:px-12">
            <div className="flex gap-6 min-w-max pb-4">
              {[...tracks].reverse().map((track, i) => (
                <div key={`mix-${i}`} className="w-[200px] group cursor-pointer">
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-purple-600/40">
                      <Play size={18} className="fill-white text-white ml-1" />
                    </button>
                  </div>
                  <h4 className="text-white font-medium truncate">{track.album}</h4>
                  <p className="text-white/40 text-sm truncate">Based on your listening</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      
    </main>
  );
}

export default Home;
