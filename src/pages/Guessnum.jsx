import { useState } from 'react'
// import './App.css'
import { Link } from 'react-router-dom'

function Guessnum() {

  const [number, setNumber] = useState(0);
  const [randomNum] = useState(Math.floor(Math.random() * 100) + 1);
  const [ifHigh, setIfHigh] = useState(false);
  const [ifLow, setIfLow] = useState(false);
  const [win, setWin] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault()

    if(number > randomNum){
      setIfHigh(true)
      setIfLow(false)
    }
    else if(number < randomNum){
      setIfHigh(false)
      setIfLow(true)
    }
    else{
      setIfHigh(false)
      setIfLow(false)
      setWin(true)
    }

  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center">
      <Link to ='/'><button className='mb-4       text-shadow-cyan-50'>Home</button></Link>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">
          Guess the <span className="text-red-500">Number</span>
        </h1>
        <p className="text-gray-600 mb-6">Number is in between 1 to 100</p>
        <input
          type="text"
          placeholder="Enter your guess..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
          onChange={(e) => setNumber(e.target.value)}
        />

        <p>{ifHigh && 'Too High'} {ifLow && 'Too Low'}</p>
        <p className='text-green-500'>{win && 'You Win'}</p>

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition duration-200">
          Submit Guess
        </button>
      </div>
    </div>

  )
}

export default Guessnum
