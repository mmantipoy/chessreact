
import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { doubleTimeLength } from '../helpers/makeTimeDoubleLength';
import { Board } from '../model/Board';
import { Cell } from '../model/Cell';
import { Color } from '../model/Color';
import { Figure, FigureNamespace } from '../model/Figures/Figure';
import { PlayerInfoComp } from './PlayerInfoComponent';
import { CellComp } from './CellConponent';


interface BoardProps{

    board: Board;
    setBoard: (board: Board) => void;
    setcurrentPlayer: (player: Color) => void;
    
    // setwhiteTime: any;
    // setblackTime: any;
    currentPlayer: Color;
    blackTime: number;
    whiteTime: number
    
    eatenWhiteFig: Figure[];
    eatenBlackFig: Figure[];
    addeatenWhiteFig: (figure: Figure) => void;
    addeatenBlackFig: (figure: Figure) => void;

    firstMoveInGame: boolean;
    chfirstMoveInGame: (st: boolean) => void;

    startTimer: () => void;
}

export function BoardComp({ board, setBoard, currentPlayer, setcurrentPlayer, 
    blackTime, whiteTime,
    eatenWhiteFig, eatenBlackFig, addeatenWhiteFig, addeatenBlackFig,
    firstMoveInGame, chfirstMoveInGame, startTimer
    }: BoardProps){  

    const [selectedCell , setselectedCell] = useState<Cell | null>(null)

    // const [eatenBlackFig, seteatenBlackFig] = useState<Figure[]>([])
    // const [eatenWhiteFig, seteatenWhiteFig] = useState<Figure[]>([])

    useEffect ( () => {

        showGoodCells()
        
      }, [selectedCell])

    //   useEffect ( () => {

    //     xdd()
        
    //   }, [currentPlayer])
    
    
    function xdd(){
        
        board.checkKings()
    
    }

    function cellCelect(cell: Cell){

        
        if ( selectedCell && selectedCell !== cell && selectedCell.figure?.figureCanMove(cell)){
            
            if( firstMoveInGame ){

                chfirstMoveInGame( !firstMoveInGame )
                
            }
            
            if ( cell.figure && cell.figure.color !== selectedCell.figure.color){

                if ( cell.figure.color === Color.BLACK){
                    
                    addeatenWhiteFig(cell.figure)
                } else {

                    addeatenBlackFig(cell.figure)
                }
                
            }
            selectedCell.moveFigure(cell)
            
            
            setselectedCell(null)
            reranderBoard() 
            let pl = currentPlayer === Color.BLACK ? Color.WHITE : Color.BLACK
            setcurrentPlayer(pl)
            

        } else {
            if( cell.figure?.color !== currentPlayer && cell.figure)
            return false
            setselectedCell(cell)
        }
        
    }

    function showGoodCells(){
        board.showGoodCells(selectedCell)
        
        reranderBoard()
    }

    function reranderBoard(){

        const newBoard = board.getBoardCopy()
        newBoard.checkForCheck()
        setBoard(newBoard)
    }


return (
    <>  
        <div className='ert'>

            <PlayerInfoComp currentPlayer={currentPlayer} timer={blackTime} eatenFig={eatenBlackFig} 
            oponentEatenFig={eatenWhiteFig} 
            infoType='blackInfo' />
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
            <PlayerInfoComp currentPlayer={currentPlayer} timer={whiteTime} eatenFig={eatenWhiteFig}
            oponentEatenFig={eatenBlackFig}  
            infoType='whiteInfo' />

        </div>
    </>
    )
}