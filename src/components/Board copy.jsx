import React, { useImperativeHandle, useState } from 'react'
import Square from './Square'
import styles from './Board.module.css'

const Board = (props) => {
    const [currentPlayer, setCurrentPlayer] = useState(0)

    const nextTurn = () => {
        setCurrentPlayer(currentPlayer == 0 ? 1 : 0)

        checkVictory()
    }

    const checkVictory = () => {
        // TODO
    }

    const handleNewGame = () => {
        const [currentPlayer, setCurrentPlayer] = useState(0)
    }

    useImperativeHandle(newGameRef, () => ({
        handleNewGame
    }))

    return (
        <div className={styles.grid}>
            {props.grid && props.grid.map((position, index) => (
                <Square 
                    key={index}
                    id={index} 
                    currentPlayer={currentPlayer} 
                    nextTurn={nextTurn} 
                    grid={props.grid} 
                    setGrid={props.setGrid}
                    />
            ))}
        </div>
    )
}

export default Board