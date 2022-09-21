import { Cell } from "../Cell";
import { Color } from "../Color";
import { Figure, FigureNamespace } from "./Figure";
import blackBG from '../../assets/chess/png/chess-king-solid-black.png'
import whiteBG from '../../assets/chess/png/chess-king-solid-white.png'

export class King extends Figure {


    constructor(color: Color, cell: Cell) {
        
        super(color, cell)

        this.logo = this.color === Color.BLACK ? blackBG : whiteBG;

        this.name = FigureNamespace.KING
    }

    figureCanMove(cell: Cell): boolean{

        if( !super.figureCanMove(cell)){
            return false
        }
        return true;

    }
}