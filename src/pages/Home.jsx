// pages/Home.jsx
import { Link } from 'react-router-dom'

function Home() {
  const games = [
    { name: "Guess the number", route: "/guessnum" },
    { name: "Tic Tac Toe", route: "/tictactoe" },
    { name: "Memory Card Game", route: "/memory" },
    {
      name :"2048 Puzzle Game",
      route: "/2048"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center flex-col justify-center">
      <h1 className="text-4xl font-bold text-purple-800 mb-10">🎮 Mini Game Hub</h1>
      <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded-xl shadow-lg w-full max-w-6xl">
        {games.map((game, i) => (
          <Link to={game.route} key={i}>
            <div className="border p-6 text-center bg-purple-100 rounded cursor-pointer hover:bg-purple-200 transition">
              <h2 className="text-xl font-bold mb-2">{game.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
