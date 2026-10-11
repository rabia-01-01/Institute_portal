import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export default function DataSavedIndicator() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Listen for storage changes
    const handleStorage = () => {
      setShow(true);
      setTimeout(() => setShow(false), 2000);
    };

    // Show indicator on initial load
    setShow(true);
    const timer = setTimeout(() => setShow(false), 2000);

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearTimeout(timer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in z-50">
      <CheckCircle className="w-5 h-5" />
      <span className="text-sm font-medium">Data Saved</span>
    </div>
  );
}
