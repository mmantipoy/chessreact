
import React, { DragEventHandler, useState } from 'react';
import '../style/ChessCell.css'
// import { ReactComponent as ChessIcon } from '../assets/chess/chess-queen-solid.svg'
// import { ReactComponent as ChessIcon2 } from '../assets/chess/chess-rook-solid.svg'
import queen from '../assets/chess/chess-queen-solid.png';
import rook from '../assets/chess/chess-rook-solid.png';

export interface ChessCellProps{

    id: number,
    n: number
}


type cellColor = 'odd' | 'even'
// type content = '' | queen | '../assets/chess/chess-rook-solid.png'

export function ChessCell ({id, n}: ChessCellProps) {

    const [color, setColor] = useState<cellColor>(n % 2 === 0 ? 'odd' : 'even')
    const [lineColor , setLineColor] = useState<cellColor>(id % 2 === 0 ? 'odd' : 'even')
    
    const [content, setContent] = useState<string>(n % 2 === 0 ? queen : rook);

    const dragStartHandler = (
        event: React.DragEvent<HTMLDivElement>,
        data: string,
        id: string
    ) => {
        
        event.dataTransfer.setData("text", data);
        
    };

    const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        setContent(data);
        
    };

    const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        
    };
    
    return (

        <>  

            { lineColor === 'odd' && color === 'odd' && <div
                onDragEnd={allowDrop} onDrop={dropHandler}
                className='Chess__Cell Chess__Cell_odd display_inline' id={'CEll'+id+n} key={'CEll'+id+n} >
       
                <img onDragStart={(event) => dragStartHandler(event, content, 'CEll'+id+n)} 
                draggable={true} src={content} alt='' width={20}/>
            </div> }

            {lineColor === 'odd' && color === 'even' && <div 
                onDragOver={allowDrop} onDrop={dropHandler}
                className='Chess__Cell Chess__Cell_even display_inline' key={'CEll'+id+n} >
       
                <img onDragStart={(event) => dragStartHandler(event, content)} 
                draggable={true} src={content} alt='' width={20}/>
            </div> }

            { lineColor === 'even' && color === 'odd' && <div 
                onDragOver={allowDrop} onDrop={dropHandler}
                className='Chess__Cell Chess__Cell_even display_inline' key={'CEll'+id+n} >
       
                <img onDragStart={(event) => dragStartHandler(event, content)} 
                draggable={true} src={content} alt='' width={20}/>
            </div> }

            { lineColor === 'even' && color === 'even' && <div 
                onDragOver={allowDrop} onDrop={dropHandler}
                className='Chess__Cell Chess__Cell_odd display_inline' key={'CEll'+id+n} >
       
                <img onDragStart={(event) => dragStartHandler(event, content)} 
                draggable={true} src={content} alt='' width={20}/>
            </div> }
            
            
        
        </>
    )
}