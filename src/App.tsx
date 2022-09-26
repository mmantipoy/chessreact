import { useState, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import  { BoardComp }  from './components/BoardComponent';
import { Board } from './model/Board';
import { TimerComp } from './components/TimerComponent';
import { Color } from './model/Color';
import { Figure, FigureNamespace } from './model/Figures/Figure';
import { copyFile } from 'fs';


function App() {

  const [board, setBoard] = useState(new Board());

  const [currentPlayer, setcurrentPlayer] = useState<Color>(Color.WHITE);

  const [blackTime , setblackTime] = useState( 30 * 60 )
  const [whiteTime , setwhiteTime] = useState( 30 * 60 )

  const [eatenBlackFig, seteatenBlackFig] = useState<Figure[]>([])
  const [eatenWhiteFig, seteatenWhiteFig] = useState<Figure[]>([])
  
  const [firstMoveInGame, setfirstMoveInGame] = useState<boolean>(true)
  
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
    setfirstMoveInGame(true);
    if ( timer.current ){
      clearInterval(timer.current)
    }

    setBoard(newBoard)
    console.log(board);
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
         startTimer={startTimer}
        />

    </div>
  );
}

export default App;




