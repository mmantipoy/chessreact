import React from 'react';

interface ImageProps {

    src: string | null;
}

export function ImageEaten({src}: ImageProps){  
    
    return (
        <>  
            {src  && <div className='eatenImage__image'>

                <img src={src} alt=''/>
            </div>}
             
        </>
    )
}