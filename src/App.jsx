// App.jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Guessnum from './pages/Guessnum' // ✅ make sure this file 
import Memory from './pages/Memorycard'
import Game2048 from './pages/Game2048'
import TicTacToe from './pages/Tic'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/guessnum" element={<Guessnum />} />
      <Route path="/memory" element={<Memory />} />
      <Route path="/2048" element={<Game2048 />} />
      <Route path="/tictactoe" element={<TicTacToe />} />
    </Routes>
  )
}
