import React from 'react';
import LedMatrixEditor from './components/LedMatrixEditor';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-neutral-900 text-white">
      <h1 className="text-2xl font-bold mb-4">LED Matrix Editor</h1>
      <LedMatrixEditor />
    </div>
  );
}

export default App;


