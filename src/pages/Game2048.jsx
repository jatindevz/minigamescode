import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

const emptyGrid = () =>
  Array(4)
    .fill(null)
    .map(() => Array(4).fill(0));

const getRandomEmptyCell = (grid) => {
  const empty = [];
  grid.forEach((row, i) =>
    row.forEach((val, j) => {
      if (val === 0) empty.push([i, j]);
    })
  );
  return empty.length ? empty[Math.floor(Math.random() * empty.length)] : null;
};

const addRandomTile = (grid) => {
  const [i, j] = getRandomEmptyCell(grid) || [];
  if (i !== undefined) grid[i][j] = Math.random() < 0.9 ? 2 : 4;
  return grid;
};

const slideAndMerge = (row) => {
  let score = 0;
  let newRow = row.filter((val) => val !== 0);

  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      score += newRow[i];
      newRow[i + 1] = 0;
    }
  }

  newRow = newRow.filter((val) => val !== 0);
  while (newRow.length < 4) newRow.push(0);

  return [newRow, score];
};

export default function Game2048() {
  const [grid, setGrid] = useState(addRandomTile(addRandomTile(emptyGrid())));
  const [score, setScore] = useState(0);

  const handleMove = (direction) => {
    let newGrid = [...grid];
    let moved = false;
    let addedScore = 0;

    const rotateLeft = (matrix) =>
      matrix[0].map((_, colIndex) =>
        matrix.map((row) => row[colIndex]).reverse()
      );

    const rotateRight = (matrix) =>
      matrix[0].map((_, colIndex) =>
        matrix.map((row) => row[row.length - 1 - colIndex])
      );

    const reverseRows = (matrix) => matrix.map((row) => [...row].reverse());

    let workingGrid = [...grid];

    if (direction === "up") {
      workingGrid = rotateLeft(workingGrid);
    } else if (direction === "down") {
      workingGrid = rotateRight(workingGrid);
    } else if (direction === "right") {
      workingGrid = reverseRows(workingGrid);
    }

    workingGrid = workingGrid.map((row) => {
      const [newRow, score] = slideAndMerge(row);
      addedScore += score;
      if (row.toString() !== newRow.toString()) moved = true;
      return newRow;
    });

    if (direction === "up") {
      workingGrid = rotateRight(workingGrid);
    } else if (direction === "down") {
      workingGrid = rotateLeft(workingGrid);
    } else if (direction === "right") {
      workingGrid = reverseRows(workingGrid);
    }

    if (moved) {
      setScore((prev) => prev + addedScore);
      setGrid(addRandomTile(workingGrid));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") handleMove("down");
    else if (e.key === "ArrowDown") handleMove("up");
    else if (e.key === "ArrowLeft") handleMove("left");
    else if (e.key === "ArrowRight") handleMove("right");
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const tileColor = (val) => {
    const map = {
      0: "bg-gray-200",
      2: "bg-yellow-100 text-yellow-800",
      4: "bg-yellow-200 text-yellow-900",
      8: "bg-orange-300 text-white",
      16: "bg-orange-400 text-white",
      32: "bg-orange-500 text-white",
      64: "bg-red-500 text-white",
      128: "bg-yellow-300 text-white",
      256: "bg-yellow-400 text-white",
      512: "bg-yellow-500 text-white",
      1024: "bg-green-400 text-white",
      2048: "bg-green-600 text-white",
    };
    return map[val] || "bg-black text-white";
  };

  const restartGame = () => {
    setGrid(addRandomTile(addRandomTile(emptyGrid())));
    setScore(0);
  };

  return (
    <div>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-purple-200 p-4">
        <h1 className="text-4xl font-bold text-purple-800 mb-4">2048 Puzzle</h1>
        <div className="flex justify-between w-full max-w-sm mb-4">
          <div className="text-lg font-semibold">Score: {score}</div>
          <button
            onClick={restartGame}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
          >
            New Game
          </button>
        </div>

        {/* <div className="flex justify-center mb-4">
          <button
            onClick={() => handleMove("left")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded mr-2"
          >
            Left
          </button>
          <button
            onClick={() => handleMove("right")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded mr-2"
          >
            Right
          </button>
          <button
            onClick={() => handleMove("up")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded mr-2"
          >
            Up
          </button>
          <button
            onClick={() => handleMove("down")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
          >
            Down
          </button>
        </div> */}
        <p className="text-sm text-gray-600">Use the arrow keys to move the tiles</p>

        <div className="grid grid-cols-4 gap-2 bg-gray-300 p-2 rounded shadow-lg w-[320px] sm:w-[400px]">
          {grid.flat().map((cell, i) => (
            <div
              key={i}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded flex items-center justify-center text-2xl font-bold ${tileColor(
                cell
              )}`}
            >
              {cell || ""}
            </div>
          ))}
        </div>

        <Link to='/'><button className='mt-4 text-shadow-cyan-50'>Home</button></Link>
      </div>
    </div>
  );
}
