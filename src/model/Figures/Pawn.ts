import { Cell } from "../Cell";
import { Color } from "../Color";
import { Figure, FigureNamespace } from "./Figure";
import blackBG from '../../assets/chess/png/chess-pawn-solid-black.png'
import whiteBG from '../../assets/chess/png/chess-pawn-solid-white.png'

export class Pawn extends Figure {

    

    constructor(color: Color, cell: Cell) {
        
        super(color, cell)

        this.logo = this.color === Color.BLACK ? blackBG : whiteBG;

        this.name = FigureNamespace.PAWN
    }

    figureCanMove(cell: Cell): boolean{
        if ( !super.figureCanMove(cell)){
            return false
        }

        if ( this.cell.checkPawnForMove(cell) ) { return true }
        
        
        return false;

    }
}