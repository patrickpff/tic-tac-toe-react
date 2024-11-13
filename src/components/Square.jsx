import React, { useImperativeHandle, useState } from 'react'
import styles from './Square.module.css'

const Square = React.forwardRef(({...props}, resetGrid) => {

    const [marks, setMarks] = useState(["x","o"])
    const [mark, setMark] = useState("")
    let tmpGrid = []

    const handeSubmit = (e) => {
        e.preventDefault()
        if(props.grid[props.id] != null) return;

        setMark(marks[props.currentPlayer])
        tmpGrid = props.grid
        tmpGrid[props.id] = props.currentPlayer
        props.setGrid(tmpGrid)
        props.nextTurn()
    }
    
    const handleResetGrid = () => {
        setMark("")
    }

    useImperativeHandle(resetGrid, () => ({
        handleResetGrid
    }))

    return (
        <button className={styles.square} onClick={handeSubmit} disabled={props.finished}>{mark}</button>
    )
})

export default Square