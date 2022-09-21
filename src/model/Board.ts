import { Cell } from "./Cell";
import { Color } from "./Color";
import { Bishop } from "./Figures/Bishop";
import { King } from "./Figures/King";
import { Knight } from "./Figures/Knight";
import { Pawn } from "./Figures/Pawn";
import { Queen } from "./Figures/Queen.";
import { Rook } from "./Figures/Rook";

export class Board {

    cells: Cell[][] = []


    public createBoard() {

        for ( let i = 0; i < 8; i++){

            let row: Cell[] = []

            for ( let w = 0; w < 8; w++){

                if ( (i + w) % 2 !== 0)
                    row.push(new Cell( this, w,i,Color.BLACK, null ))
                else row.push(new Cell( this, w,i,Color.WHITE, null ))


            }

            this.cells.push(row);
        }
    }

    public getBoardCopy(): Board{

        const newboard = new Board;
        newboard.cells = this.cells
        return newboard
    }

    public showGoodCells(selectedCell: Cell | null){

        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];

            for (let w = 0; w < row.length; w++) {
                const cell = row[w];

                cell.available = !!selectedCell?.figure?.figureCanMove(cell)
                
            }
            
        }
    }

    public getCell(y: number, x: number) {
        
        return this.cells[y][x];
    } 

    public addFigure(){

        
        for ( let i = 0; i < 8; i++){

            new Pawn (Color.BLACK , this.getCell(1 , i))
            new Pawn (Color.WHITE , this.getCell(6 , i))

        }

        new Rook ( Color.BLACK , this.getCell(0 , 0) )
        new Rook ( Color.BLACK , this.getCell(0 , 7) )
        new Rook ( Color.WHITE , this.getCell(7 , 0) )
        new Rook ( Color.WHITE , this.getCell(7 , 7) )

        new Bishop ( Color.BLACK , this.getCell(0 , 1) )
        new Bishop ( Color.BLACK , this.getCell(0 , 6) )
        new Bishop ( Color.WHITE , this.getCell(7 , 1) )
        new Bishop ( Color.WHITE , this.getCell(7 , 6) )

        new Knight ( Color.BLACK , this.getCell(0 , 2) )
        new Knight ( Color.BLACK , this.getCell(0 , 5) )
        new Knight ( Color.WHITE , this.getCell(7 , 2) )
        new Knight ( Color.WHITE , this.getCell(7 , 5) )

        new King ( Color.BLACK , this.getCell(0 , 3) )
        new Queen ( Color.BLACK , this.getCell(0 , 4) )
        new King ( Color.WHITE , this.getCell(7 , 3) )
        new Queen ( Color.WHITE , this.getCell(7 , 4) )
        
    }
}