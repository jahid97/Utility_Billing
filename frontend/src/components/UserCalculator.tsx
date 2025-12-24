import { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Calculator, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

export default function UserCalculator() {
  const [units, setUnits] = useState<number | ''>('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    if (!units || Number(units) < 0) return setError('Please enter valid positive units.');
    setLoading(true);
    setError('');
    
    try {
      const { data } = await axios.post(`${API_URL}/calculate`, { units: Number(units) });
      setResult(data);
    } catch (err) {
      setError('Failed to calculate bill. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.text("Utility Bill Statement", 14, 20);
    
    autoTable(doc, {
      startY: 30,
      head: [['Description', 'Amount']],
      body: [
        ['Units Consumed', result.units_consumed],
        ['Energy Charge', result.energy_charge],
        ['Service Charge', result.service_charge],
        ['VAT Amount', result.vat_amount],
        ['Total Payable', result.total_payable],
      ],
    });
    
    doc.save(`bill_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Calculator className="w-6 h-6" /> Calculate Bill
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Units Consumed (kWh)</label>
          <input 
            type="number" 
            value={units} 
            onChange={(e) => setUnits(Number(e.target.value))}
            className="mt-1 block w-full p-2 border rounded-md"
            placeholder="e.g. 150"
          />
        </div>
        <button 
          onClick={handleCalculate}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Calculating...' : 'Calculate Bill'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {result && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-3">Bill Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Energy Charge:</span> <span>{result.energy_charge}</span></div>
            <div className="flex justify-between"><span>Service Charge:</span> <span>{result.service_charge}</span></div>
            <div className="flex justify-between"><span>VAT:</span> <span>{result.vat_amount}</span></div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <span>Total Payable:</span> <span>${result.total_payable}</span>
            </div>
          </div>
          <button onClick={downloadPDF} className="mt-4 flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded hover:bg-gray-50">
            <Download className="w-4 h-4" /> Download PDF!
          </button>
        </div>
      )}
    </div>
  );
}