import React, { useState } from 'react';
import Event from './Event';
import Sponsor from './Sponsor';

const Home = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Welcome to the System</h1>
      <div className="space-x-4">
        <button 
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => setSelectedComponent('event')}
        >
          Go to Event
        </button>
        <button 
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={() => setSelectedComponent('sponsor')}
        >
          Go to Sponsor
        </button>
      </div>
      <div className="mt-6">
        {selectedComponent === 'event' && <Event />}
        {selectedComponent === 'sponsor' && <Sponsor />}
      </div>
    </div>
  );
};

export default Home;
