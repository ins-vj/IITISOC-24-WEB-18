import React, { useEffect, useRef, useState } from 'react';
import './Card.css'; 

const AnimatedCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 } 
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div ref={cardRef} className={`card ${isVisible ? 'enter-from-left' : ''}`}>
      <h2>Animated Card</h2>
      <p>This card enters from the left when scrolled into view.</p>
    </div>
  );
};

export default AnimatedCard;
