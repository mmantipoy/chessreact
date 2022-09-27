import { Cell } from "../Cell";
import { Color } from "../Color";
import { Figure, FigureNamespace, FigureWeight } from "./Figure";
import blackBG from '../../assets/chess/png/chess-knight-solid-black.png'
import whiteBG from '../../assets/chess/png/chess-knight-solid-white.png'

export class Knight extends Figure {

    

    constructor(color: Color, cell: Cell) {
        
        super(color, cell)

        this.logo = this.color === Color.BLACK ? blackBG : whiteBG;

        this.name = FigureNamespace.KNIGHT
        this.weight = FigureWeight.KNIGHT
    }

    figureCanMove(cell: Cell): boolean{
        if ( !super.figureCanMove(cell)){
            return false
        }

        if ( this.cell.checkKnightForMove(cell) ) { return true }

        
        return false;

    }

    figureCanCheck(cell: Cell): boolean {
        if ( !super.figureCanCheck(cell)){
            return false
        }

        if ( this.cell.checkKnightForMove(cell) ) { return true }
        
        return false;
    }
}