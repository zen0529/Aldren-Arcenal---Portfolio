import React, { useState, useEffect } from "react";

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC = () => {
  const emojis = ["🚀", "🌟", "🛸", "👽", "🌌", "💫", "🪐", "🌠"];
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  // Initialize game
  useEffect(() => {
    initializeGame();
    const saved = localStorage.getItem("memoryGameBest");
    if (saved) setBestScore(parseInt(saved));
  }, []);

  const initializeGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        value: emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (id: number) => {
    if (
      flipped.includes(id) ||
      matched.includes(id) ||
      flipped.length === 2 ||
      gameWon
    )
      return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);

      if (cards[newFlipped[0]].value === cards[newFlipped[1]].value) {
        const newMatched = [...matched, newFlipped[0], newFlipped[1]];
        setMatched(newMatched);
        setFlipped([]);

        if (newMatched.length === cards.length) {
          setGameWon(true);
          if (!bestScore || moves + 1 < bestScore) {
            setBestScore(moves + 1);
            localStorage.setItem("memoryGameBest", String(moves + 1));
          }
        }
      } else {
        setTimeout(() => setFlipped([]), 600);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-purple-400 mb-2">MEMORY GAME</h2>
        <p className="text-purple-300 text-center">
          Match pairs of cards to win!
        </p>
      </div>

      <div className="mb-6 flex gap-8 text-center">
        <div className="bg-purple-500/20 px-6 py-3 rounded-lg border border-purple-400">
          <p className="text-purple-300 text-sm uppercase tracking-wider">Moves</p>
          <p className="text-3xl font-bold text-purple-300">{moves}</p>
        </div>
        {bestScore !== null && (
          <div className="bg-purple-500/20 px-6 py-3 rounded-lg border border-purple-400">
            <p className="text-purple-300 text-sm uppercase tracking-wider">Best Score</p>
            <p className="text-3xl font-bold text-yellow-400">{bestScore}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8 max-w-md">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`
              w-20 h-20 text-4xl font-bold rounded-lg transition-all duration-300
              transform hover:scale-105 active:scale-95
              ${
                flipped.includes(card.id) || matched.includes(card.id)
                  ? "bg-purple-500 text-white shadow-lg"
                  : "bg-gradient-to-br from-purple-600 to-purple-800 text-purple-600 hover:from-purple-500 hover:to-purple-700 shadow-lg"
              }
              ${matched.includes(card.id) ? "ring-2 ring-yellow-400" : ""}
              border-2 border-purple-400
            `}
          >
            {flipped.includes(card.id) || matched.includes(card.id)
              ? card.value
              : "?"}
          </button>
        ))}
      </div>

      {gameWon && (
        <div className="text-center mb-6 animate-pulse">
          <p className="text-4xl font-bold text-yellow-400 mb-2">🎉 YOU WON! 🎉</p>
          <p className="text-purple-300">Completed in {moves} moves</p>
        </div>
      )}

      <button
        onClick={initializeGame}
        className={`px-8 py-3 rounded-lg font-bold transition-all ${
          gameWon
            ? "bg-yellow-500 hover:bg-yellow-400 text-black"
            : "bg-purple-500 hover:bg-purple-400 text-white"
        }`}
      >
        {gameWon ? "Play Again" : "New Game"}
      </button>
    </div>
  );
};

export default MemoryGame;
