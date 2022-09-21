import { Board } from "./Board";
import { Color } from "./Color";
import { Figure } from "./Figures/Figure";

export class Cell{

    readonly x: number;
    readonly y: number;

    readonly color: Color;

    figure: Figure | null;
    board: Board;
    
    available: boolean;

    // readonly id: string;

    constructor (board: Board, x: number, y:number, color: Color, figure: Figure | null){

        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        // this.id = 'Cell'+x+y
    }

    isEmpty(){
        return this.figure === null
    }
    
    checkVerticalForMove(cell: Cell): boolean{

        if ( this.x !== cell.x){
            return false    
        }
        
        const [min, max] = cell.y < this.y ? [cell.y,this.y] : [this.y,cell.y]
        
        for (let i = min+1; i < max; i++) {
            
            if ( !this.board.getCell(i , this.x).isEmpty() ) {
                return false
            }
        }
        return true

    }

    setFigure(target: Figure){

        this.figure = target;
        this.figure.cell = this
    }

    moveFigure (target: Cell ){
        console.log('ddd');
        if (this.figure && this.figure?.figureCanMove(target)) {
            this.figure.moveFigure(target)
            
            target.setFigure(this.figure);
            this.figure = null
        }
    }
}