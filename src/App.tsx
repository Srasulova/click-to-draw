import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const App: React.FC = () => {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [cards, setCards] = useState<string[]>([]);
  const [remaining, setRemaining] = useState<number>(0);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        setDeckId(response.data.deck_id);
        setRemaining(response.data.remaining);
      } catch (error) {
        console.error("Error fetching the deck:", error);
      }
    };
    fetchDeck();
  }, []);

  const drawCard = async () => {
    if (remaining === 0) {
      alert("Error: no cards remaining!");
      return;
    }
    try {
      const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      setCards([...cards, response.data.cards[0].image]);
      setRemaining(response.data.remaining);
    } catch (error) {
      console.error("Error drawing a card:", error);
    }
  };

  const shuffleDeck = async () => {
    if (!deckId) return;
    setIsShuffling(true);
    try {
      await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
      setCards([]);
      setRemaining(52); // Reset to a full deck
    } catch (error) {
      console.error("Error shuffling the deck:", error);
    } finally {
      setIsShuffling(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Click to Draw</h1>
      <button onClick={drawCard} disabled={remaining === 0}>
        Draw Card
      </button>
      <button onClick={shuffleDeck} disabled={isShuffling}>
        {isShuffling ? "Shuffling..." : "Shuffle Deck"}
      </button>
      <div>
        {cards.map((card, index) => (
          <Card key={index} image={card} />
        ))}
      </div>
      <p>Remaining Cards: {remaining}</p>
    </div>
  );
};

export default App;
