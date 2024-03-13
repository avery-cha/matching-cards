import React, {useState, createContext, useContext, useEffect} from 'react';
import './App.css';
import GameSetup from './GameSetup';


function App() {



  return (
    <div className="App">
      <h1>Matching Game!</h1>
      {GameSetup()}
    </div>
  );
}

export default App;
