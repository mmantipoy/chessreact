import { Cell } from "../Cell";
import { Color } from "../Color";
import { Figure, FigureNamespace } from "./Figure";
import blackBG from '../../assets/chess/png/chess-queen-solid-black.png'
import whiteBG from '../../assets/chess/png/chess-queen-solid-white.png'

export class Queen extends Figure {


    constructor(color: Color, cell: Cell) {
        
        super(color, cell)

        this.logo = this.color === Color.BLACK ? blackBG : whiteBG;

        this.name = FigureNamespace.QUEEN
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