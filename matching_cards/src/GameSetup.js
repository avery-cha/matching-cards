import React, {useState, createContext, useEffect, useContext} from 'react';
import App from './App';
import Card from './Card'

export const GameContext = createContext({
  numCards: 0
});

const GameSetup = () => {

  const [numCards, setNumCards] = useState(0);

  return (
    <>
    {numCards === 0?
      <div id='game-setup'>
          <h2>Choose your style of game:</h2>
          <button onClick={() => {setNumCards(4)}}>4 cards</button>
          <button onClick={() => {setNumCards(16)}}>16 cards</button>
          <button onClick={() => {setNumCards(36)}}>36 cards</button>
          {console.log(numCards)}
        </div>
            : <div id='gameplay'>
                <h2>Lets Play!</h2>
              <GameContext.Provider value = {numCards}>
                <Card />
              </GameContext.Provider>
              </div>}
    </>
  )
}

export default GameSetup;