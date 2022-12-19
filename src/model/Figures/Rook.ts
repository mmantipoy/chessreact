import { Cell } from "../Cell";
import { Color } from "../Color";
import { Figure, FigureNamespace, FigureToCode, FigureWeight } from "./Figure";
import blackBG from '../../assets/chess/png/chess-rook-solid-black.png'
import whiteBG from '../../assets/chess/png/chess-rook-solid-white.png'

export class Rook extends Figure {


    constructor(color: Color, cell: Cell) {
        
        super(color, cell)

        this.logo = this.color === Color.BLACK ? blackBG : whiteBG;

        this.name = FigureNamespace.ROOK
        this.weight = FigureWeight.ROOK
        this.code = FigureToCode.ROOK
    }

    figureCanMove(cell: Cell): boolean{
        if ( !super.figureCanMove(cell)){
            return false
        }

        if ( this.cell.checkVerticalForMove(cell) ) { return true }
            
        if ( this.cell.checkHorizontalForMove(cell) ) { return true }
        
        return false;

    }

    figureCanCheck(cell: Cell): boolean {
        if ( !super.figureCanCheck(cell)){
            return false
        }

        if ( this.cell.checkVerticalForMove(cell) ) { return true }
            
        if ( this.cell.checkHorizontalForMove(cell) ) { return true }
        
        return false;
    }
}