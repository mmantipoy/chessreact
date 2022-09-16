
import React, { useState } from "react"; 
import { ChessLine } from './ChessLine'
import '../style/ChessMain.css'

export function ChessMain(){

    const [size, setSize] = useState(8)

    const makaArray = (x:number) => {
        let arr = []
        for ( let i = 0; i < x; i++ ){
            arr.push(i)
            
        }
        return arr

    }
    return (

        <>  
            <div className="ChessMain"> 
            
                { makaArray(size).map( line => <ChessLine id={line} size={size} makeArray={makaArray}/>) }
            </div>
        </>
    )
}