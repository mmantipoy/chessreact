import { Cell } from "./Cell";
import { Color } from "./Color";

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
}