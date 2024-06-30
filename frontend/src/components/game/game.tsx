import React, { useState, useEffect } from 'react';

const icons = ["😂", "😎", "🤩", "😡", "🤑", "😴", "😍", "🤡"];
const shuffledIcons = [...icons, ...icons].sort(() => Math.random() - 0.5);

type CardType = {
  icon: string;
  flipped: boolean;
  matched: boolean;
};

const Card: React.FC<{
  card: CardType;
  index: number;
  onClick: (index: number) => void;
}> = ({ card, index, onClick }) => {
  return (
    <div
      className={`h-20 w-20 flex justify-center items-center  border rounded-lg text-3xl ${
        card.flipped || card.matched ? 'bg-black text-white' : 'bg-gray-700'
      }`}
      onClick={() => !card.flipped && !card.matched && onClick(index)}
    >
      {card.flipped || card.matched ? card.icon : "❓"}
    </div>
  );
};

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>(shuffledIcons.map(icon => ({ icon, flipped: false, matched: false })));
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (flippedIndexes.length === 2) {
      setIsChecking(true);
      const [firstIndex, secondIndex] = flippedIndexes;
      const match = cards[firstIndex].icon === cards[secondIndex].icon;
      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map((card, index) =>
            index === firstIndex || index === secondIndex
              ? { ...card, flipped: match, matched: match ? true : card.matched }
              : card
          )
        );
        setFlippedIndexes([]);
        setIsChecking(false);
      }, 1000);
    }
  }, [flippedIndexes, cards]);

  const handleCardClick = (index: number) => {
    if (isChecking || cards[index].flipped || cards[index].matched) return;
    setCards(prevCards =>
      prevCards.map((card, i) => (i === index ? { ...card, flipped: true } : card))
    );
    setFlippedIndexes(prev => [...prev, index]);
  };

  const resetGame = () => {
    const newShuffledIcons = [...icons, ...icons].sort(() => Math.random() - 0.5);
    setCards(newShuffledIcons.map(icon => ({ icon, flipped: false, matched: false })));
    setFlippedIndexes([]);
    setIsChecking(false);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
      <button
        onClick={resetGame}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Reset Game
      </button>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card key={index} card={card} index={index} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
