
import React, { useEffect, useState } from 'react';
import '../App.css';
import { Board } from '../model/Board';
import { Cell } from '../model/Cell';
import { CellComp } from './CellConponent';

interface BoardProps{

    board: Board;
    setBoard: (board: Board) => void
}

export function BoardComp({ board, setBoard}: BoardProps){  

    const [selectedCell , setselectedCell] = useState<Cell | null>(null)

    useEffect ( () => {

        showGoodCells()
        
      }, [selectedCell])

    function cellCelect(cell: Cell){

        if ( selectedCell && selectedCell !== cell && selectedCell.figure?.figureCanMove(cell)){
            selectedCell.moveFigure(cell)
            setselectedCell(null)
            reranderBoard()
        } else {
            setselectedCell(cell)
        }
        
    }

    function showGoodCells(){
        board.showGoodCells(selectedCell)
        reranderBoard()
    }

    function reranderBoard(){

        const newBoard = board.getBoardCopy()

        setBoard(newBoard)
    }
return (
    <>
        <div className='board'>

            {board.cells.map(( row, index) => 
            <React.Fragment key={index}>

                {row.map( cell => <CellComp key={'CEll'+ cell.x + cell.y} cell={cell}
                isSelected = {cell.x === selectedCell?.x && cell.y === selectedCell?.y} 
                click_={()=>cellCelect(cell)}
                />

                )}
            </React.Fragment>)}

        </div>
    </>
    )
}