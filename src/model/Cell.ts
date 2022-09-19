import { Board } from "./Board";
import { Color } from "./Color";
import { Figure } from "./Figures/Figure";

export class Cell{

    readonly x: number;
    readonly y: number;

    readonly color: Color;

    figure: Figure | null;
    board: Board;
    
    readonly available: boolean;

    readonly id: string;

    constructor (board: Board, x: number, y:number, color: Color, figure: Figure | null){

        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = 'Cell'+x+y
    }
}