import React, {useState, useEffect, useContext} from 'react';
import App from './App';
import GameContext from './GameSetup'

const Card = () => {

  const numCards = useContext(GameContext);
  const number = numCards;

  const[ pokemon, selectPokemon] = useState({
    name: '',
    picture:''
  })

  const [allPokemon, setAllPokemon] = useState([]);

  var index = 0;

  useEffect(()=>{
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=36`)
    .then(response => response.json())
    .then(data => setAllPokemon(data.results.map(item => {
      index++;
      const newPoke = {
        name: item.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`
      }
      return newPoke;
    })), [])
  })

  var backCards = [];

  const createCards = () => {
    console.log("num", number);
    console.log("all", allPokemon);
    var cardArray = allPokemon.map( item =>
      <div id='pokeCard'>
      <img src={item.image} alt='poke'></img>
      <h2>item.name</h2>
      </div>
    )

    for(let i =0; i<numCards; i++){
      backCards.push(
        <><img onClick={() => this.revealCard(i)} id='backCard' src='/Users/averyevans/Documents/GitHub/matching-cards/matching_cards/src/backcard.jpeg' alt='card'></img></>
      )
    }
  }

  const revealCard = (index) => {

  }

  return (
    <>
    {createCards()}
    <span>{backCards.map(item => item)}</span>
    </>
  )
}

export default Card;