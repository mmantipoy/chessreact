import { Cell } from "../Cell";
import { Color } from "../Color";
import { Figure, FigureNamespace, FigureToCode, FigureWeight } from "./Figure";
import blackBG from '../../assets/chess/png/chess-king-solid-black.png'
import whiteBG from '../../assets/chess/png/chess-king-solid-white.png'

export class King extends Figure {

    check: boolean = false
    
    constructor(color: Color, cell: Cell) {
        
        super(color, cell)

        this.logo = this.color === Color.BLACK ? blackBG : whiteBG;

        this.name = FigureNamespace.KING
        this.weight = FigureWeight.KING
        this.code = FigureToCode.KING
    }

    figureCanMove(cell: Cell): boolean{

        if ( this.cell.checkKingFor00(cell) ) { return true }
        if ( this.cell.checkCellFor00(cell) ) { return true }
        
        if ( this.cell.checkKingFor000(cell) ) { return true }
        if ( this.cell.checkCellFor000(cell) ) { return true }
        
        if ( !super.figureCanMove(cell)){
            return false
        }

        if ( this.cell.checkKingForMove(cell) ) { return true }
        
        
        return false;

    }
}