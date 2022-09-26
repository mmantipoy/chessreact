import React, { useState } from 'react';
import { doubleTimeLength } from '../helpers/makeTimeDoubleLength';
import { Color } from '../model/Color';
import { Figure, FigureNamespace } from '../model/Figures/Figure';
import { ImageEaten } from './ImageInEatenMeny';

interface PlayerInfoProps{

    currentPlayer: Color;
    timer: number;
    eatenFig: Figure[];
    oponentEatenFig: Figure[];

    infoType: 'blackInfo' | 'whiteInfo'
}

export function PlayerInfoComp({ currentPlayer, timer, eatenFig, infoType, oponentEatenFig} : PlayerInfoProps){  

    const min = doubleTimeLength(Math.floor(timer / 60))
    const sec = doubleTimeLength(timer - parseInt(min) * 60)
    
    const countAdd = () => {

        let c1: number = 0;
        let c2: number = 0;

        eatenFig.map( (item) => c1 = c1 + item.weight)
        oponentEatenFig.map( (item) => c2 = c2 + item.weight)

        return (
            <>
                { c1 > c2 &&  <> 
                <span className='eatenInfo__eatenFig_advantage'>
                    {'+' + (c1 - c2)}
                </span>
                </>}
            </>
        )

    }

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
                    
                    {countAdd()}
                </div>
            </div>
        </>
    )
}