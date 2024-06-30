import React, { useState, useEffect } from 'react';

const icons = ["😂", "😎", "🤩", "😡", "🤑", "😴", "😍", "🤡"];
const cardsArray = [...icons, ...icons].sort(() => Math.random() - 0.5);

const Memory: React.FC = () => {
  const [cards, setCards] = useState(cardsArray.map((icon) => ({ icon, flipped: false, matched: false })));
  const [firstCard, setFirstCard] = useState<number | null>(null);
  const [secondCard, setSecondCard] = useState<number | null>(null);

  useEffect(() => {
    if (firstCard !== null && secondCard !== null) {
      const match = cards[firstCard].icon === cards[secondCard].icon;
      if (match) {
        setCards(prevCards =>
          prevCards.map((card, index) =>
            index === firstCard || index === secondCard ? { ...card, matched: true } : card
          )
        );
      }
      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map((card, index) =>
            index === firstCard || index === secondCard ? { ...card, flipped: false } : card
          )
        );
        setFirstCard(null);
        setSecondCard(null);
      }, 700);
    }
  }, [firstCard, secondCard, cards]);

  const handleCardClick = (index: number) => {
    if (firstCard === null) {
      setFirstCard(index);
      setCards(prevCards =>
        prevCards.map((card, i) => (i === index ? { ...card, flipped: true } : card))
      );
    } else if (secondCard === null && index !== firstCard) {
      setSecondCard(index);
      setCards(prevCards =>
        prevCards.map((card, i) => (i === index ? { ...card, flipped: true } : card))
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`h-20 w-20 flex justify-center items-center cursor-pointer border rounded-lg text-3xl ${
              card.flipped || card.matched ? 'bg-black text-white' : 'bg-gray-700'
            }`}
            onClick={() => !card.flipped && !card.matched && handleCardClick(index)}
          >
            {card.flipped || card.matched ? card.icon : "❓"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memory;
