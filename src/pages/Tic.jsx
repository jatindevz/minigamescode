import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const winner = calculateWinner(board)

  // Computer makes a move after player
  useEffect(() => {
    if (!isPlayerTurn && !winner && board.includes(null)) {
      const timeout = setTimeout(() => {
        const emptyIndexes = board
          .map((val, idx) => (val === null ? idx : null))
          .filter(val => val !== null)
        const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)]

        if (randomIndex !== undefined) {
          const newBoard = [...board]
          newBoard[randomIndex] = 'O'
          setBoard(newBoard)
          setIsPlayerTurn(true)
        }
      }, 500) // small delay for realism

      return () => clearTimeout(timeout)
    }
  }, [isPlayerTurn, board, winner])

  const handleClick = (i) => {
    if (!isPlayerTurn || board[i] || winner) return

    const newBoard = [...board]
    newBoard[i] = 'X'
    setBoard(newBoard)
    setIsPlayerTurn(false)
  }

  const handleRestart = () => {
    setBoard(Array(9).fill(null))
    setIsPlayerTurn(true)
  }

  const renderSquare = (i) => (
    <button
      onClick={() => handleClick(i)}
      className="w-24 h-24 text-4xl font-bold border border-gray-300 flex items-center justify-center hover:bg-purple-100 transition"
    >
      {board[i]}
    </button>
  )

  const status = winner
    ? `Winner: ${winner}`
    : board.every(Boolean)
      ? "It's a draw!"
      : `Next: ${isPlayerTurn ? 'You (X)' : 'Computer (O)'}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-purple-800">Tic Tac Toe: You vs Computer</h1>
      <div className="grid grid-cols-3 gap-2">
        {Array(9).fill(null).map((_, i) => renderSquare(i))}
      </div>
      <p className="text-xl mt-4 font-semibold">{status}</p>
      <div className=''>
        <button
          onClick={handleRestart}
          className="mt-4 px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        >
          Restart Game
        </button>
        <Link to='/'><button className='ml-2 text-shadow-cyan-50'>Home</button></Link>
      </div>

    </div>
  )
}

// Helper: check if someone won
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default TicTacToe
