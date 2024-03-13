import React, {useState, useEffect, useContext} from 'react';
import App from './App';
import NumberContext from './NumberContext';
import GameSetup from './GameSetup';

const Card = () => {

  const numCards = useContext(NumberContext);
  const [allPokemon, setAllPokemon] = useState([]);
  const [card1, setCard1] = useState(0);
  const [card2, setCard2] = useState(0);
  const [selectedIndex1, setSelectedIndex1] = useState(0);
  const [selectedIndex2, setSelectedIndex2] = useState(0);
  const [match, setMatch] = useState(true);
  var gamePokemon = [];
  const [gameStart, setGameStart] = useState(true);

  var index = 0-(numCards/2);

  useEffect(()=>{
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numCards/2}`)
    .then(response => response.json())
    .then(data => {
      setAllPokemon(data.results.map(item => {
        index++;
        const newPoke = {
          id: index,
          name: item.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`,
          back: require('/Users/averyevans/Documents/GitHub/matching-cards/matching_cards/src/backcard.jpg')
        }
        return newPoke;
      })
      )})
  },[])

  var backCards = [];
  gamePokemon = allPokemon.concat(allPokemon);

  const createCards = () => {
    shuffleCards(gamePokemon);
    console.log("gamepokemonmapped", gamePokemon);
    for(let i =0; i<numCards; i++){
      backCards.push(
        <><img id={`back${i}`} onClick={() => revealCard(i)} className='backCard' src={require('/Users/averyevans/Documents/GitHub/matching-cards/matching_cards/src/backcard.jpg')} alt='card'></img></>
      )
    }
    backCards = backCards.filter(item => item!== undefined)
    return backCards;
  }


  //used Fisher-Yates algorithm to shuffle the cards
  const shuffleCards = (deckCards) => {
    for(let i= deckCards.length -1; i> 0; i--){
      const j = Math.floor(Math.random() * (i+1));
      [deckCards[i], deckCards[j]] = [deckCards[j], deckCards[i]]
    }
    return deckCards;
  }

  const revealCard = (index) => {
    console.log("allPoke", allPokemon);
    console.log("gamepole", gamePokemon);
    var slot = document.getElementById(`back${index}`);
    slot.src = gamePokemon[index].image;

    console.log("slot", slot);

    if(card1 === 0){
      setCard1(gamePokemon[index]);
      setSelectedIndex1(index);
    }
    else if(card2 === 0){
      setCard2(gamePokemon[index]);
      setSelectedIndex2(index);
    }
    else{
      handleCards();
    }

    console.log('card1', card1);
    console.log('card2', card2);


    return gamePokemon;
  }

  const handleCards = () => {
    console.log("cards", card1)
    console.log("cards2", card2);
    const id1 = (selectedIndex1);
    const id2 = (selectedIndex2)

    console.log('ids', id1, id2);

    const slot1 = document.getElementById(`back${id1}`);
    const slot2 = document.getElementById(`back${id2}`);

    console.log("slot1$2", slot1, slot2);

    if(card1.name === card2.name){

      setCard1(0);
      setCard2(0);
      setSelectedIndex1(0);
      setSelectedIndex2(0);
      setMatch(true);
      return(
        <h1>It's a match!</h1>
      )
    }
    else{
      slot1.src = allPokemon[0].back;
      slot2.src = allPokemon[0].back;
      setCard1(0);
      setCard2(0);
      setSelectedIndex1(0);
      setSelectedIndex2(0);
      setMatch(false);
    }
  }

  return (
    <>
    <div className='Container'>
      {gameStart? createCards() : setGameStart(false)}
      {match? <h1>You found one!</h1> : <h1>keep going!</h1>}
    </div>
    </>
  )

  }
export default Card;