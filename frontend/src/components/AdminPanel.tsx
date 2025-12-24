import { useState } from 'react';
import axios from 'axios';
import { Lock, LogOut, CheckCircle, AlertCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminPanel() {
  const [key, setKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // default state
  const [config, setConfig] = useState({ 
    rate_per_unit: 0, 
    vat_percentage: 0, 
    service_charge: 0 
  });
  
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const fetchConfig = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/admin/config`, { 
        headers: { 'x-admin-key': key } 
      });
      setConfig(data);
      setIsAuthenticated(true);
      setMessage('');
      setIsError(false);
    } catch (err) {
      setIsError(true);
      setMessage('access denied: Invalid admin key');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/admin/config`, config, { 
        headers: { 'x-admin-key': key } 
      });
      setIsError(false);
      setMessage('System Configuration Updated Successfully!');
    } catch (err) {
      setIsError(true);
      setMessage('Update Failed: check connection or key.');
    }
  };

  // added logout 
  const handleLogout = () => {
    setKey(''); 
    setIsAuthenticated(false); 
    setConfig({ rate_per_unit: 0, vat_percentage: 0, service_charge: 0 }); 
    setMessage('Logged out safely?.');
    setIsError(false);
  };

  // after login
  if (!isAuthenticated) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto mt-10">
        <div className="flex justify-center mb-4 text-blue-600">
            <Lock className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Portal</h2>
        
        <input 
          type="password" 
          placeholder="Enter Admin Security Key" 
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchConfig()}
        />
        
        <button 
          onClick={fetchConfig} 
          className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition shadow-md"
        >
          Access Dashboard
        </button>
        
        {message && (
          <div className={`mt-4 flex items-center gap-2 text-sm ${isError ? 'text-red-600' : 'text-green-600'}`}>
             {isError ? <AlertCircle className="w-4 h-4"/> : <CheckCircle className="w-4 h-4"/>}
             {message}
          </div>
        )}
      </div>
    );
  }

  // dashboard
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800">Configuration Panel</h2>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 font-medium bg-red-50 px-3 py-1 rounded transition"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Rate Per Unit ($)</label>
            <input 
                type="number" 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                value={config.rate_per_unit}
                onChange={(e) => setConfig({...config, rate_per_unit: Number(e.target.value)})}
            />
            </div>
            <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">VAT Percentage (%)</label>
            <input 
                type="number" 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                value={config.vat_percentage}
                onChange={(e) => setConfig({...config, vat_percentage: Number(e.target.value)})}
            />
            </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Fixed Service Charge ($)</label>
          <input 
            type="number" 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={config.service_charge}
            onChange={(e) => setConfig({...config, service_charge: Number(e.target.value)})}
          />
        </div>

        <button 
            onClick={handleUpdate} 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow"
        >
            Save Changes
        </button>

        {message && (
          <div className={`text-center p-2 rounded ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}