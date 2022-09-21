import { Cell } from "../Cell";
import { Color } from "../Color";
import { Figure, FigureNamespace } from "./Figure";
import blackBG from '../../assets/chess/png/chess-rook-solid-black.png'
import whiteBG from '../../assets/chess/png/chess-rook-solid-white.png'

export class Rook extends Figure {


    constructor(color: Color, cell: Cell) {
        
        super(color, cell)

        this.logo = this.color === Color.BLACK ? blackBG : whiteBG;

        this.name = FigureNamespace.ROOK
    }

    figureCanMove(cell: Cell): boolean{
        if ( !this.cell.checkVerticalForMove(cell)){
            return false
        }
        if( !super.figureCanMove(cell)){
            return false
        }
        return true;

    }
}