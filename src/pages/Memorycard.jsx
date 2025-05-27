//Memorycard game

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

const emojiPairs = ["🍎", "🍕", "🚀", "🐶", "🎮", "🍩", "🏀", "🎲"];

const shuffledCards = () => {
    const pairs = [...emojiPairs, ...emojiPairs];
    return pairs
        .sort(() => Math.random() - 0.5)
        .map((emoji, index) => ({
            id: index,
            emoji,
            flipped: false,
            matched: false,
        }));
};

export default function Memory() {
    const [cards, setCards] = useState(shuffledCards());
    const [flippedCards, setFlippedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [hasWon, setHasWon] = useState(false);

    const handleFlip = (cardId) => {
        const newCards = cards.map((card) =>
            card.id === cardId ? { ...card, flipped: true } : card
        );

        const currentFlipped = newCards.filter((card) => card.flipped && !card.matched);
        console.log(currentFlipped);
        

        if (currentFlipped.length <= 2) {
            setCards(newCards);
            setFlippedCards(currentFlipped);
        }
    };

    useEffect(() => {
        // Check if two cards are flipped
        if (flippedCards.length === 2) {
            setMoves((m) => m + 1);

            const [card1, card2] = flippedCards;

            if (card1.emoji === card2.emoji) {
                // Match found
                setCards((prev) =>
                    prev.map((card) =>
                        card.emoji === card1.emoji
                            ? { ...card, matched: true }
                            : card
                    )
                );
                setFlippedCards([]);
            } else {
                // No match, flip back after delay
                setTimeout(() => {
                    setCards((prev) =>
                        prev.map((card) =>
                            !card.matched ? { ...card, flipped: false } : card
                        )
                    );
                    setFlippedCards([]);
                }, 1000);
            }
        }
    }, [flippedCards]);


    useEffect(() => {
        if (cards.length && cards.every((card) => card.matched)) {
            setHasWon(true);
        }
    }, [cards]);

    const handleRestart = () => {
        setCards(shuffledCards());
        setFlippedCards([]);
        setMoves(0);
        setHasWon(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-purple-700 mb-2">🧠 Memory Card Game</h1>
                <p className="text-lg">Moves: {moves}</p>
                <div className="gap-4">
                    <Link to='/'><button className='mb-4       text-shadow-cyan-50 mr-2'>Home</button></Link>
                    <button
                        onClick={handleRestart}
                        className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                    >
                        Restart
                    </button>

                </div>
            </div>

            {hasWon ? (
                <div className="text-center mt-10">
                    <h2 className="text-4xl font-bold text-green-600 mb-4">🎉 You Win!</h2>
                    <p className="text-xl mb-4">You finished the game in {moves} moves!</p>
                    <button
                        onClick={handleRestart}
                        className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                        Play Again
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 gap-4 p-4 max-w-5xl mx-auto">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`w-20 h-24 bg-white border-2 rounded-lg flex items-center justify-center text-3xl font-bold shadow transition-transform duration-300 cursor-pointer ${card.flipped || card.matched
                                    ? "bg-purple-100"
                                    : "bg-purple-500 text-purple-500"
                                }`}
                            onClick={() =>
                                !card.flipped &&
                                !card.matched &&
                                flippedCards.length < 2 &&
                                handleFlip(card.id)
                            }
                        >
                            {card.flipped || card.matched ? card.emoji : "❓"}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
