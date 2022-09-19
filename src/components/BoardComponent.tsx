
import React from 'react';
import '../App.css';
import { Board } from '../model/Board';
import { Cell } from '../model/Cell';
import { CellComp } from './CellConponent';

interface BoardProps{

    board: Board;
    setBoard: (board: Board) => void
}

export function BoardComp({ board, setBoard}: BoardProps){  

return (
    <>
        <div className='board'>

            {board.cells.map(( row, index) => 
            <React.Fragment key={index}>

                {row.map( cell => <CellComp key={'CEll'+ cell.x + cell.y} cell={cell}/>

                )}
            </React.Fragment>)}

        </div>
    </>
    )
}