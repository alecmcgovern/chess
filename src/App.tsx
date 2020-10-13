import React from 'react';
import { useEffect, useRef } from 'react';

import { initScene } from './three';

import './App.css';

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    initScene(containerRef.current!);
  }, [])

  return (
    <div className="App">
      <div id="container" ref={containerRef}></div>
    </div>
  );
}

export default App;
