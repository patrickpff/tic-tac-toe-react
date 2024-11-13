import React, { createRef, useImperativeHandle, useRef, useState } from 'react'
import Square from './Square'
import styles from './Board.module.css'

const Board = React.forwardRef(({...props}, newGameRef) => {
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [finished, setFinished] = useState(false)
    const [message, setMessage] = useState("")
    const [marks, setMarks] = useState(["x","o"])

    let resetGrid = useRef([]);

    resetGrid = props.grid.map((_,i) => resetGrid[i] ?? createRef())

    const nextTurn = () => {
        setCurrentPlayer(currentPlayer == 0 ? 1 : 0)

        checkVictory()
    }

    const checkVictory = () => {
        // Check for victory
        // 0 1 2
        // 3 4 5
        // 6 7 8

        // win: 
        // {0,1,2}, {3,4,5}, {6,7,8}
        // {0,4,8}, {2,4,6}
        // {0,3,6}, {1,4,7}, {2,5,8}

        let rows = [[0,1,2], [3,4,5], [6,7,8]]
        let diagonals = [[0,4,8], [2,4,6]]
        let columns = [[0,3,6], [1,4,7], [2,5,8]]

        checkIndividually(rows)
        checkIndividually(diagonals)
        checkIndividually(columns)

        // Check for a draw
        let getAllNull = props.grid.filter(s => s === null).length;
        if(getAllNull == 0) {
            setMessage("It's a draw! Try again.")
        }

    }

    const checkIndividually = (rows) => {
        rows.map((value, index) => {
            if (
                (props.grid[value[0]] == props.grid[value[1]]  && props.grid[value[1]] == props.grid[value[2]])
                && props.grid[value[0]] != null
                && props.grid[value[1]] != null
                && props.grid[value[2]] != null
            ) {
                setMessage("Player " + marks[props.grid[value[0]]] + " wins!")
                setFinished(true)
            }
        })
    }

    const handleNewGame = () => {
        setMessage("")
        setFinished(false)
        resetGrid.map((_, i) => {
            resetGrid[i].current.handleResetGrid()
        })
    }   

    useImperativeHandle(newGameRef, () => ({
        handleNewGame,
    }))

    return (
        <div className={styles.main}>
            <div >
                <div className={styles.grid}>
                    {props.grid && props.grid.map((position, index) => (
                        <Square 
                            key={index}
                            id={index} 
                            currentPlayer={currentPlayer} 
                            nextTurn={nextTurn} 
                            grid={props.grid} 
                            setGrid={props.setGrid}
                            ref={resetGrid[index]}
                            finished={finished}
                            />
                    ))}
                </div>
            </div>
            
            <div className={styles.message}>
                {message && <h2>{message}</h2>}
            </div>
        </div>
    )
})

export default Board