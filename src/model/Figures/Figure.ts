import logo from "../../assets/chess/png/chess-bishop-solid-white.png";

import { Color } from "../Color";

import { Cell } from "../Cell";

export enum FigureNamespace {

    FIGURE= 'Figure',
    KING= 'King',
    KNIGHT= 'Knight',
    PAWN= 'Pawn',
    QUEEN= 'Queen',
    ROOK= 'Rook',
    BISHOP= 'Bishop',

}

export enum FigureWeight {

    FIGURE= 0,
    KING= 1000,
    KNIGHT= 3,
    PAWN= 1,
    QUEEN= 9,
    ROOK= 5,
    BISHOP= 3,

}

export enum FigureToCode {

    FIGURE= '',
    KING= 'K',
    KNIGHT= 'N',
    PAWN= '',
    QUEEN= 'Q',
    ROOK= 'R',
    BISHOP= 'B',

}

export class Figure {

    color: Color;
    logo: typeof logo | null;
    name: FigureNamespace;
    cell: Cell;
    isFistStep: boolean;
    weight: FigureWeight;
    code: FigureToCode;
    // id: number

    constructor (color: Color, cell: Cell){

        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNamespace.FIGURE
        this.isFistStep = true;
        // this.id = Math.random();
        this.weight = FigureWeight.FIGURE;
        this.code = FigureToCode.FIGURE

    }

    
    figureCanMove(cell: Cell): boolean{

        if( cell.figure?.color === this.color ){
            return false 
        } 
        if ( cell.figure?.name === FigureNamespace.KING)
        {
            return false
        }
        return true;

    }

    figureCanCheck(cell: Cell): boolean{

        if( cell.figure?.color === this.color ){
            return false 
        } 
        
        return true;

    }

    moveFigure(cell: Cell){

    }

    
}