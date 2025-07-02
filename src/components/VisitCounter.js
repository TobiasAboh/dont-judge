'use client'

import { useState, useEffect } from 'react';

const VisitCounter = () => {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        const res = await fetch('/api/visits');
        const data = await res.json();
        setVisitCount(data.count);
      } catch (error) {
        console.error('Error fetching visit count:', error);
      }
    };

    fetchVisitCount();
  }, []);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <p className="text-lg">Total Visits: {visitCount}</p>
    </div>
  );
};

export default VisitCounter;