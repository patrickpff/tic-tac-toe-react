import React, { useRef, useState } from 'react'
import './App.css'
import Board from './components/Board'

function App() {
  const newGameRef = useRef();
  const messageRef = useRef();
  const [grid, setGrid] = useState([null,null,null,null,null,null,null,null,null])

  const handleNewGame = (e) => {
    e.preventDefault()

    setGrid([null,null,null,null,null,null,null,null,null])
    newGameRef.current?.handleNewGame()
  }

  return (
    <>
      <div className='content'>
        <div className="game">
            <h1>Welcome to Tic-Tac-Toe!</h1>
            <h2>A game for two</h2>
            <Board 
              ref={newGameRef} 
              grid={grid} 
              setGrid={setGrid} />

            <button onClick={handleNewGame} className="new-game">New Game</button>
          </div>
      </div>
    </>
  )
}

export default App
