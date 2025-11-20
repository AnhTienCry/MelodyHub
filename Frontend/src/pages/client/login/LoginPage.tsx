import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Music2 } from 'lucide-react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call backend login endpoint
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json()).message || 'Login failed')
        return res.json()
      })
      .then((data) => {
        // Expecting { token, user }
        const { token, user } = data
        localStorage.setItem('token', token)
        localStorage.setItem('userRole', user?.role ?? 'client')
        if (user?.role === 'admin') navigate('/admin')
        else navigate('/client')
      })
      .catch((err) => {
        console.error('Login error', err)
        alert('Login failed: ' + (err.message || err))
      })
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#030014] relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/30 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-md px-4">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to MelodyHub</span>
        </Link>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg text-white shadow-2xl">
          <div className="p-6 space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Music2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-white/40">
              Enter your credentials to access your sonic space
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent outline-none transition"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-white">
                  Password
                </label>
                <Link to="#" className="text-xs text-purple-400 hover:text-purple-300">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full px-8 py-3 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-lg border-0 shadow-lg shadow-purple-500/20 transition-all"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="p-6 pt-0 text-center text-sm text-white/40">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
