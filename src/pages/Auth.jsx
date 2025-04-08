import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) alert(error.message);
    else {
        const { data, error } = await supabase
          .from('users')
          .select('full_name')
          .eq('id', user.id)
          .maybeSingle();
      
        if (!data?.full_name) {
          navigate('/onboarding');
        } else {
          navigate('/today');
        }
      }
      
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) alert(error.message);
  };

  const handleForgotPassword = async () => {
    if (!email) return alert('Please enter your email first.');
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) alert(error.message);
    else alert('Password reset link sent.');
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 relative transition duration-500 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 text-white'
    }`}>
      <div className="absolute inset-0 opacity-60 blur-3xl z-0" />

      <div className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl text-center">
        <motion.img
          src="/assets/altitude-logo.png"
          alt="Altitude Logo"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-16 h-16 mx-auto mb-6"
        />

        <h2 className="text-2xl font-bold mb-4">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h2>

        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl text-black placeholder-gray-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl text-black placeholder-gray-500 focus:outline-none"
          />

          <div className="flex justify-between items-center text-sm text-white/80 px-1">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            {!isSignUp && (
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-indigo-200 hover:underline"
              >
                Forgot Password?
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            {loading ? (isSignUp ? 'Creating...' : 'Signing in...') : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="my-6 text-gray-200">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="mt-6 text-sm text-white/80">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            className="underline text-white hover:text-indigo-200"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xs text-indigo-100 underline hover:text-white"
          >
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
