import { getDiffieHellman } from 'crypto';
import React from 'react';
import { Cell } from '../model/Cell';


interface CellProps{

    cell: Cell;
    isSelected: boolean;
    click_: (cell: Cell) => void;
}

export function CellComp({cell, isSelected, click_}: CellProps){  
    
    return (
        <>
            <div className={['cell',  isSelected ? 'blue' : cell.color
                            , cell.available && cell.figure ? 'acceptedFigure' : ''
            ].join(' ')} onClick={()=>click_(cell)}>

            { !cell.figure && cell.available && <div className='selected' />}
            {cell.figure?.logo && <img src={cell.figure.logo} alt=''/>}
            
            </div>
        </>
    )
}