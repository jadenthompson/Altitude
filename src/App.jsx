import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-zinc-900 dark:to-black text-zinc-900 dark:text-white transition-all duration-500">
      <div className="max-w-screen-md mx-auto px-6 py-20 text-center">
        <div className="flex justify-center mb-8">
          <img
            src="/vite.svg"
            alt="Altitude Logo"
            className="w-16 h-16 drop-shadow-lg"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
          Welcome to <span className="text-violet-600">Altitude</span>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
          Your tour logistics. Simplified. Built with Vite, React & Tailwind.
        </p>

        <div className="mt-10">
          <button className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-2 rounded-xl shadow transition">
            Launch App
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
