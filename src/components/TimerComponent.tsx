import React from 'react';
import { Color } from '../model/Color';

interface TimerProps{

    restart: () => void;
    currentPlayer: Color;
}

export function TimerComp({restart, currentPlayer} : TimerProps){  
    return (
        <>    
            <div className='curplayerturn'> 
                
                <div >

                    <button onClick={restart}>
                        Restart
                    </button>
                </div>
                
            </div>
            
            

        </>
    )
}
