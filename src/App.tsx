import { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import  { BoardComp }  from './components/BoardComponent';
import { Board } from './model/Board';


function App() {

  const [board, setBoard] = useState(new Board())

  useEffect ( () => {

    restart()
    
  }, [])
  
  function restart(){

    const newBoard = new Board();
    newBoard.createBoard();
    newBoard.addFigure();
    setBoard(newBoard)
    console.log(board);
  }

  return (


    <div className="App">
    
      <BoardComp board={board} setBoard={setBoard} />

    </div>
  );
}

export default App;




