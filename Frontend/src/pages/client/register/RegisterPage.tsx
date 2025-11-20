import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, UserPlus } from 'lucide-react';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call backend register endpoint
    fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json()).message || 'Register failed')
        return res.json()
      })
      .then((data) => {
        // If backend returns token and user, store and redirect
        const { token, user } = data
        if (token) localStorage.setItem('token', token)
        if (user?.role) localStorage.setItem('userRole', user.role)
        if (user?.role === 'admin') navigate('/admin')
        else navigate('/client')
      })
      .catch((err) => {
        console.error('Register error', err)
        alert('Register failed: ' + (err.message || err))
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
                <UserPlus className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Join MelodyHub</h2>
            <p className="text-white/40">
              Create your account and start your musical journey
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-white">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent outline-none transition"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-white">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-white">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full px-8 py-3 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-lg border-0 shadow-lg shadow-purple-500/20 transition-all"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="p-6 pt-0 text-center text-sm text-white/40">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
