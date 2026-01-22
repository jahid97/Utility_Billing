import { useState } from 'react';
import UserCalculator from './components/UserCalculator';
import AdminPanel from './components/AdminPanel';
import { LayoutDashboard, Calculator } from 'lucide-react';

function App() {
  const [view, setView] = useState<'user' | 'admin'>('user');

  return (
    // Main Container
    <div className="min-h-screen bg-gray-100 pt-12 px-4 font-sans flex flex-col items-center">
      
      {/* Navigation Bar */}
      
      <nav className="w-full max-w-3xl bg-white p-4 rounded-xl shadow-lg mb-8 grid grid-cols-3 items-center">
        
        
        <div></div>

        {/*The Title */}
        <h1 className="text-2xl font-extrabold text-center tracking-tight text-gray-800">
          Utility Bill Calculator
        </h1>

        {/* The Buttons */}
        <div className="flex justify-end gap-8">
          <button 
            onClick={() => setView('user')} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              view === 'user' 
                ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Calculator className="w-4 h-4" />
            Calculator
          </button>
          
          <button 
            onClick={() => setView('admin')} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              view === 'admin' 
                ? 'bg-gray-900 text-white shadow-md transform scale-105' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Admin
          </button>
        </div>
      </nav>
      
      {/* Main Content Area */}
      <main className="w-full max-w-3xl animate-fade-in-up">
        {view === 'user' ? <UserCalculator /> : <AdminPanel />}
      </main>

      {/* Simple Footer*/}
      <footer className="mt-12 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Utility billing system
      </footer>
    </div>
  );
}

export default App;