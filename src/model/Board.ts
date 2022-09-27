import { Cell } from "./Cell";
import { Color } from "./Color";
import { Bishop } from "./Figures/Bishop";
import { Figure, FigureNamespace } from "./Figures/Figure";
import { King } from "./Figures/King";
import { Knight } from "./Figures/Knight";
import { Pawn } from "./Figures/Pawn";
import { Queen } from "./Figures/Queen.";
import { Rook } from "./Figures/Rook";

export class Board {

    cells: Cell[][] = []
    blackKing: King | null = null
    whiteKing: King | null = null

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
        newboard.blackKing = this.blackKing
        newboard.whiteKing = this.whiteKing
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

    public checkKings(){

        // console.log(this.blackKing?.cell.x ); 
        if ( this.blackKing ){
        let x = this.blackKing?.cell.x
        
        let y = this.blackKing?.cell.y
        
        for ( let i = 0; i < this.cells.length; i++){
            
            if ( y && this.getCell(y, i).figure && this.getCell(y, i).figure?.name === FigureNamespace.QUEEN  ){

                this.blackKing.check = true
                console.log('object');
                
            } else if ( this.blackKing.check === true && this.getCell(y, i).figure){
                this.blackKing.check = false
                console.log('ffff');
            }
        }
        }
    }

    public checkForCheck(){

        // for (let i = 0; i < this.cells.length; i++) {
        //     const row = this.cells[i];

        //     for (let w = 0; w < row.length; w++) {
        //         const cell = row[w];

        //         if ( cell.figure?.name === FigureNamespace.KING ){

        //             console.log('кароль ', cell.x, cell.y);



        //             for (let t = 0; t < this.cells.length; t++) {
        //                 const row1 = this.cells[t];
            
        //                 for (let y = 0; y < row1.length; y++) {
        //                     const cell1 = row1[y];
            
        //                     if ( cell1?.figure?.figureCanCheck(cell) ){

        //                         console.log('шахесть');
        //                     }
                            
        //                 }
                        
        //             }
        //         }
                
        //     }
            
        // }

        // console.log(this.blackKing);

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

        new Knight ( Color.BLACK , this.getCell(0 , 1) )
        new Knight ( Color.BLACK , this.getCell(0 , 6) )
        new Knight ( Color.WHITE , this.getCell(7 , 1) )
        new Knight ( Color.WHITE , this.getCell(7 , 6) )

        new Bishop ( Color.BLACK , this.getCell(0 , 2) )
        new Bishop ( Color.BLACK , this.getCell(0 , 5) )
        new Bishop ( Color.WHITE , this.getCell(7 , 2) )
        new Bishop ( Color.WHITE , this.getCell(7 , 5) )

        new Queen ( Color.BLACK , this.getCell(0 , 3) )
        this.blackKing =  new King ( Color.BLACK , this.getCell(0 , 4) )
        
       
        new Queen ( Color.WHITE , this.getCell(7 , 3) )
        this.whiteKing =  new King ( Color.WHITE , this.getCell(7 , 4) )

    }
}