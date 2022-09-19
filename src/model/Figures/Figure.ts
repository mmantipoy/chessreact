import { Color } from "../Color";
import logo from '../../assets/chess/png/chess-bishop-solid-white.png'
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

export class Figure {

    color: Color;
    logo: typeof logo | null;
    name: FigureNamespace;
    cell: Cell
    id: number

    constructor (color: Color, cell: Cell){

        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNamespace.FIGURE
        this.id = Math.random();

    }

    
}