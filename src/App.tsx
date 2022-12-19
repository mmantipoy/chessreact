import { useState, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import  { BoardComp }  from './components/BoardComponent';
import { Board } from './model/Board';
import { TimerComp } from './components/TimerComponent';
import { Color } from './model/Color';
import { Figure, FigureNamespace, FigureToCode } from './model/Figures/Figure';
import { MoveComp } from './components/MoveHistoryComponent';
import { Cell } from './model/Cell';

export class Move {

  
  endCell: [number,number];
  figure: FigureToCode;
  eatenFigure: FigureToCode | null;
  startCell: [number,number];
  currentBoard: Board;
  currentPlayer: Color;
  blackTime: number;
  whiteTime: number;
  eatenBlackFig: Figure[];
  eatenWhiteFig: Figure[];
  firstMoveInGame: boolean;




  constructor (endCell: Cell, figure: Figure, startCell: Cell,currentBoard: Board
    ,currentPlayer: Color,    blackTime: number,
    whiteTime: number,    eatenBlackFig: Figure[],
    eatenWhiteFig: Figure[],    firstMoveInGame: boolean, eatenFigure: Figure | null = null){

    this.endCell = [endCell.y , endCell.x]
    this.figure = figure.code
    if (eatenFigure)
    this.eatenFigure = eatenFigure.code
    else this.eatenFigure = null
    this.startCell = [startCell.y , startCell.x]
    this.currentBoard = currentBoard
    this.blackTime = blackTime
    this.whiteTime = whiteTime
    this.eatenBlackFig = eatenBlackFig
    this.eatenWhiteFig = eatenWhiteFig
    this.firstMoveInGame = firstMoveInGame
    this.currentPlayer = currentPlayer

  }

  getFigure(){

    return this.figure
  }

}

function App() {

  const [board, setBoard] = useState(new Board());

  const [currentPlayer, setcurrentPlayer] = useState<Color>(Color.WHITE);

  const [blackTime , setblackTime] = useState( 30 * 60 )
  const [whiteTime , setwhiteTime] = useState( 30 * 60 )

  const [eatenBlackFig, seteatenBlackFig] = useState<Figure[]>([])
  const [eatenWhiteFig, seteatenWhiteFig] = useState<Figure[]>([])
  
  const [firstMoveInGame, setfirstMoveInGame] = useState<boolean>(true)

  const [blackPlayerMoves , setblackPlayerMoves] = useState<Move[]>([])
  const [whitePlayerMoves , setwhitePlayerMoves] = useState<Move[]>([])
  
  const timer = useRef< null | ReturnType< typeof setInterval>> ( null )

  useEffect ( () => {

    restart()
    
  }, [])

  useEffect ( () => {

    startTimer()
    
}, [currentPlayer])
  
  function restart(){
    
    const newBoard = new Board();
    newBoard.createBoard();
    newBoard.addFigure();
    

    setcurrentPlayer(Color.WHITE)
    setblackTime(30 * 60)
    setwhiteTime(30 * 60)
    seteatenBlackFig([])
    seteatenWhiteFig([])
    setblackPlayerMoves([])
    setwhitePlayerMoves([])
    setfirstMoveInGame(true);
    if ( timer.current ){
      clearInterval(timer.current)
    }

    setBoard(newBoard)
    console.log(board);
  }

  function returnMove(move: Move) {
    board.hruc()
    const newBoard = move.currentBoard;    
    
    setcurrentPlayer(move.currentPlayer)
    setblackTime(move.blackTime)
    setwhiteTime(move.whiteTime)
    seteatenBlackFig(move.eatenBlackFig)
    seteatenWhiteFig(move.eatenWhiteFig)
    setblackPlayerMoves(blackPlayerMoves.slice(0, -1))
    setwhitePlayerMoves(whitePlayerMoves.slice(0, -1))
    setfirstMoveInGame(move.firstMoveInGame);
    if ( timer.current ){
      clearInterval(timer.current)
    }

    setBoard(newBoard)
    console.log(move.currentBoard, 'dhdh');
  }

  function addwhitePlayerMoves(cell: Cell, figure: Figure, selectedCell: Cell, currentBoard: Board, eatenFigure: Figure | null = null){
    // Удалить достку из пропсов
    let copy = Object.assign([], whitePlayerMoves);

    let move = new Move(cell, figure, selectedCell, board, currentPlayer, blackTime, whiteTime,eatenBlackFig,eatenWhiteFig,firstMoveInGame, eatenFigure)
    copy.push(move)
    setwhitePlayerMoves(copy)

    console.log(eatenWhiteFig, 'ghj');
  }

  function addblackPlayerMoves(cell: Cell, figure: Figure, selectedCell: Cell,currentBoard: Board, eatenFigure: Figure | null = null){

    let copy = Object.assign([], blackPlayerMoves);

    let move = new Move(cell, figure, selectedCell, board,currentPlayer, blackTime, whiteTime,eatenBlackFig,eatenWhiteFig,firstMoveInGame, eatenFigure)
    copy.push(move)
    setblackPlayerMoves(copy)

    console.log(eatenBlackFig, 'fgsh');

  }
  function addeatenBlackFig(figure: Figure){

    let copy = Object.assign([], eatenBlackFig);
    copy.push(figure)
    copy.sort()
    seteatenBlackFig( copy)

    

  }
  function addeatenWhiteFig(figure: Figure){

    let copy = Object.assign([], eatenWhiteFig);
    copy.push(figure)
    copy.sort()
    seteatenWhiteFig( copy)

  }

  function chfirstMoveInGame(fm: boolean){

    setfirstMoveInGame( fm )
  }

    function startTimer(){
      if ( firstMoveInGame) {

        return false
      }
      if ( timer.current ){
          clearInterval(timer.current)
      }

      const callback = currentPlayer === Color.BLACK ? decrementBlackTime : decrementWhiteTime
      timer.current = setInterval(callback , 1000 )
  }

  function decrementBlackTime(){
    setblackTime( prev => prev - 1 )
  }
  function decrementWhiteTime(){
    setwhiteTime( prev => prev - 1 )
  }

  return (


    <div className="App">
      
      <TimerComp restart={restart} currentPlayer={currentPlayer}/>

      <BoardComp board={board} setBoard={setBoard} 
        currentPlayer={currentPlayer} setcurrentPlayer={setcurrentPlayer}
        blackTime={blackTime} whiteTime={whiteTime} 
        addeatenBlackFig={addeatenBlackFig} addeatenWhiteFig={addeatenWhiteFig} eatenBlackFig={eatenBlackFig}
        eatenWhiteFig={eatenWhiteFig} firstMoveInGame={firstMoveInGame} chfirstMoveInGame={chfirstMoveInGame}
         startTimer={startTimer} addwhitePlayerMoves={addwhitePlayerMoves} addblackPlayerMoves={addblackPlayerMoves}
        />

        <MoveComp whitePlayerMoves={whitePlayerMoves} blackPlayerMoves={blackPlayerMoves} returnMove={returnMove}/>
        

    </div>
  );
}

export default App;




