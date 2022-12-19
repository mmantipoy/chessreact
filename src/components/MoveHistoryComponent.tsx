import React, { useEffect, useState } from 'react';
import { Move } from '../App';
import { numToVert } from '../helpers/numberToVerticalOnBoard';
import { numToHor } from '../helpers/numberToHorizontalOnBoard';
import { FigureToCode } from '../model/Figures/Figure';
import { Color } from '../model/Color';

export interface MoveProps {

    whitePlayerMoves: Move[]
    blackPlayerMoves: Move[]
    returnMove: (move: Move) => void
}



export function MoveComp({whitePlayerMoves, blackPlayerMoves, returnMove}: MoveProps){  
    
    const [counter, setCounter] = useState<number>(0)

    useEffect( () => {

        setCounter((prev: number) => prev + 1)
        console.log('object');
    }, [whitePlayerMoves]
    )

    function returnLastMove(){
        returnMove( whitePlayerMoves[whitePlayerMoves.length - 1] )
    }

    function renderMoves(color: Color, obj: Move, index: number) {
            
            if (color === Color.WHITE){

                if ( index < whitePlayerMoves.length - 5 ){

                    return false
                } else {

                    return (
                        <div className={['display-block','moveHistory__counter_move', index % 2 === 0  ? 'white' : 'black' ,
                            ].join(' ')}>
        
                            {obj.eatenFigure !== null && obj.figure === FigureToCode.PAWN && numToHor(obj.startCell[1]) + ':' + numToHor(obj.endCell[0]) + numToVert(obj.endCell[1])}
                            {obj.eatenFigure !== null && obj.figure !== FigureToCode.PAWN && obj.figure + ':'+ numToHor(obj.endCell[0]) + numToVert(obj.endCell[1]) }
                            {obj.eatenFigure === null && obj.figure + numToHor(obj.endCell[0]) + numToVert(obj.endCell[1])}
        
                        </div>
                    )
                }
            } else if (color === Color.BLACK){
                if ( index < whitePlayerMoves.length - 5 ){

                    return false
                } else {

                    return (
                        <div className={['display-block','moveHistory__counter_move', index % 2 === 0  ? 'black' : 'white' ,
                            ].join(' ')}>
        
                            {obj.eatenFigure !== null && obj.figure === FigureToCode.PAWN && numToHor(obj.startCell[1]) + ':' + numToHor(obj.endCell[0]) + numToVert(obj.endCell[1])}
                            {obj.eatenFigure !== null && obj.figure !== FigureToCode.PAWN && obj.figure + ':'+ numToHor(obj.endCell[0]) + numToVert(obj.endCell[1]) }
                            {obj.eatenFigure === null && obj.figure + numToHor(obj.endCell[0]) + numToVert(obj.endCell[1])}
        
                        </div>
                    )
                }
            }
            

    }

    function renderMovesCount (index: number) {
        if ( index < whitePlayerMoves.length - 5 ){

            return false
        } else {
        return (
            <div className={['display-block','moveHistory__counter_move', index % 2 === 0  ? 'white' : 'black'
                ].join(' ')}>

                {index + 1}
            </div>
        )}
    }
    return (
        <>  <div className='moveHistory white'>
            <div className='moveHistory__history '>
                
                {counter !== 0 && 
                    
                    <div className='moveHistory__counter'>
                        {whitePlayerMoves.map( (obj, index) => 
                            renderMovesCount(index) )}
                    </div> }

                <div className='moveHistory__white'>
                    {whitePlayerMoves.map( (obj, index) => 
                    renderMoves(Color.WHITE, obj, index) )}
                </div>
                
                <div className='moveHistory__black'>
                    {blackPlayerMoves.map( (obj, index) => 
                    renderMoves(Color.BLACK, obj, index) ) }
                </div>

            </div>

            <div className='moveHistory__buttons'>
                    <button onClick={returnLastMove}>
                        Вернуть ход
                    </button>

            </div>
            </div>


    </>
    )
}


