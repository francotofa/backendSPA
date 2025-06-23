import React from 'react';
import Header from './components/Header/Header';
import Origen from './components/Origen/Origen';
import Services from './components/Services/Services';
import MissionVision from './components/MissionVision/MissionVision';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Origen />
      <Services />
       <MissionVision />
      {/* Agregaremos más componentes aquí */}
    </div>
  );
}

export default App;