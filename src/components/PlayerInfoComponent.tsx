import React, { useState } from 'react';
import { doubleTimeLength } from '../helpers/makeTimeDoubleLength';
import { Color } from '../model/Color';
import { Figure, FigureNamespace } from '../model/Figures/Figure';
import { ImageEaten } from './ImageInEatenMeny';

interface PlayerInfoProps{

    currentPlayer: Color;
    timer: number;
    eatenFig: Figure[];

    infoType: 'blackInfo' | 'whiteInfo'
}

export function PlayerInfoComp({ currentPlayer, timer, eatenFig, infoType} : PlayerInfoProps){  

    const min = doubleTimeLength(Math.floor(timer / 60))
    const sec = doubleTimeLength(timer - parseInt(min) * 60)
    

    return (
        <>  
            
            <div className={infoType}>
                
                <div className='eatenInfo__timer_text'>
                        <span > {min} </span>
                        <span > : </span>
                        <span > {sec} </span>

                        {currentPlayer === Color.BLACK && infoType === 'blackInfo'  && <span >
                            --- Ход черных
                        </span>}
                        {currentPlayer === Color.WHITE && infoType === 'whiteInfo' && <span >
                            --- Ход белых
                        </span>}
                </div>
                
                <div className='eatenInfo__eatenFig'>
                    {eatenFig.map( (item) => <ImageEaten src={item.logo} /> )}
                    
                </div>
            </div>
        </>
    )
}