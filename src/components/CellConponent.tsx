import React from 'react';
import { Cell } from '../model/Cell';


interface CellProps{

    cell: Cell;
}

export function CellComp({cell}: CellProps){  
    
    return (
        <>
            <div className={['cell',  cell.color].join(' ')}>

                

            </div>
        </>
    )
}