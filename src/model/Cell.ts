import { CANCELLED } from "dns";
import { Board } from "./Board";
import { Color } from "./Color";
import { Figure, FigureNamespace } from "./Figures/Figure";

export class Cell{

    readonly x: number;
    readonly y: number;

    readonly color: Color;
    
    figure: Figure | null;
    board: Board;
    
    available: boolean;

    // readonly id: string;

    constructor (board: Board, x: number, y:number, color: Color, figure: Figure | null){

        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        // this.id = 'Cell'+x+y
    }

    isEmpty(){
        return this.figure === null
    }
    
    checkVerticalForMove(cell: Cell): boolean{

        if ( this.x !== cell.x){
            return false    
        }
        
        const [min, max] = cell.y < this.y ? [cell.y,this.y] : [this.y,cell.y]
        
        for (let i = min+1; i < max; i++) {
            
            if ( !this.board.getCell(i , this.x).isEmpty() ) {
                return false
            }
        }
        return true

    }

    checkHorizontalForMove(cell: Cell): boolean{

        if ( this.y !== cell.y){
            return false    
        }
        
        const [min, max] = cell.x < this.x ? [cell.x,this.x] : [this.x,cell.x]
        
        for (let i = min+1; i < max; i++) {
            
            if ( !this.board.getCell(this.y , i).isEmpty() ) {
                return false
            }
        }
        return true

    }

    checkDiagonalForMove(cell: Cell): boolean{

        const absoluteX = Math.abs( this.x - cell.x );
        const absoluteY = Math.abs( this.y - cell.y );

        if ( absoluteY !== absoluteX){
            return false    
        }
        
        const dx = this.x < cell.x ? 1 : -1;
        const dy = this.y < cell.y ? 1 : -1;
        
        for (let i = 1; i < absoluteY; i++) {
            
            if ( !this.board.getCell(this.y + dy*i, this.x + dx*i).isEmpty() ) {
                return false
            }
            // console.log(this.y + dy*i, this.x + dx*i);
        }
        return true

    }

    checkKnightForMove(cell: Cell): boolean{

        const absoluteX = Math.abs( this.x - cell.x );
        const absoluteY = Math.abs( this.y - cell.y );
        
        if ( (absoluteX === 2 && absoluteY === 1 ) || (absoluteX === 1 && absoluteY === 2 )) {
            
            return true    
        }

        return false

    }

    checkPawnForMove(cell: Cell): boolean{

        const direction = this.figure?.color === Color.BLACK ? 1 : -1
        
        if (((this.y + direction) === cell.y) && (this.x === cell.x) ){
            if ( !this.board.getCell(cell.y, cell.x).isEmpty() ){
                return false
            }
            return true
        }
        
        if ( ((this.y + direction) === cell.y) && (((this.x + 1) === cell.x) || ((this.x - 1) === cell.x)) ){
            if ( !this.board.getCell(cell.y, cell.x).isEmpty() ){
                return true
            }
            
        }

        if ( this.figure?.isFistStep ){
            
            if ( !this.board.getCell(this.y + direction, cell.x).isEmpty() ){
                return false
            }

            if ( ((this.y + 2*direction) === cell.y) && (this.x === cell.x) ){
            
                return true
            }
        }

        return false
        
    }

    checkKingForMove(cell: Cell){

        const absoluteX = Math.abs( this.x - cell.x );
        const absoluteY = Math.abs( this.y - cell.y );
        
        if ( ((absoluteX === 1 || absoluteX === 0)  &&  (absoluteY === 1 || absoluteY === 0))) {
            
            return true    
        }

        return false

    }

    checkKingFor00(cell: Cell){
       

        if ( this.figure?.isFistStep && cell.figure?.name === FigureNamespace.ROOK 
            && cell.figure.isFistStep === true && this.x + 3 === cell.x && this.y === cell.y){

            if ( this.board.getCell(this.y, this.x + 1).isEmpty() &&
                    this.board.getCell(this.y, this.x + 2).isEmpty()){

                
                return true
            }

        }

        return false

    }
    
    checkCellFor00(cell: Cell){

        if (cell.x === 6 && this.y === cell.y && this.board.getCell(cell.y, 7).figure &&
            this.figure?.isFistStep && this.board.getCell(cell.y, 7).figure?.name === FigureNamespace.ROOK 
            && this.board.getCell(cell.y, 7).figure?.isFistStep === true
        ){

            if ( cell.isEmpty() &&
                this.board.getCell(cell.y, cell.x - 1).isEmpty()){

                    return true
                }
        }

        return false
    }

    checkKingFor000(cell: Cell){

        if ( this.figure?.isFistStep && cell.figure?.name === FigureNamespace.ROOK 
            && cell.figure.isFistStep === true && this.x - 4 === cell.x && this.y === cell.y){

            if ( this.board.getCell(this.y, this.x - 1).isEmpty() &&
                    this.board.getCell(this.y, this.x - 2).isEmpty() &&
                        this.board.getCell(this.y, this.x - 3).isEmpty()){

                
                return true
            }

        }

        return false

    }

    checkCellFor000(cell: Cell){

        if (cell.x === 2 && this.y === cell.y && this.board.getCell(cell.y, 0).figure &&
            this.figure?.isFistStep && this.board.getCell(cell.y, 0).figure?.name === FigureNamespace.ROOK 
            && this.board.getCell(cell.y, 0).figure?.isFistStep === true
        ){

            if ( cell.isEmpty() &&
                this.board.getCell(cell.y, cell.x + 1).isEmpty() &&
                this.board.getCell(cell.y, cell.x - 1).isEmpty()){

                    return true
                }
        }

        return false
    }

    setFigure(target: Figure){

        this.figure = target;
        this.figure.cell = this
    }

    setFigure00(start: Figure ){

        if ( this.figure) {
        this.board.getCell(start.cell.y , start.cell.x + 1).setFigure(this.figure)
        this.board.getCell(start.cell.y , start.cell.x + 2).setFigure(start)
        }

    }

    setFigure000(start: Figure ){

        if ( this.figure) {
        this.board.getCell(start.cell.y , start.cell.x - 1).setFigure(this.figure)
        this.board.getCell(start.cell.y , start.cell.x - 2).setFigure(start)
        }

    }

    moveFigure (target: Cell ){
        
        if (this.figure && this.figure?.figureCanMove(target)) {

            if (this.figure.name === FigureNamespace.KING  &&  this.figure.cell.checkKingFor00(target) ){

                // this.figure.moveFigure(target)
                // console.log('object');
                target.setFigure00(this.figure);
                this.figure = null
                target.figure = null


            } else if (this.figure.name === FigureNamespace.KING  &&  this.figure.cell.checkCellFor00(target) ){

                // this.figure.moveFigure(target)
                // console.log('object');
                this.board.getCell(target.y, target.x + 1).setFigure00(this.figure)
                
                this.figure = null
                this.board.getCell(target.y, target.x + 1).figure = null


            }
            else if (this.figure.name === FigureNamespace.KING &&  this.figure.cell.checkKingFor000(target) ){

                target.setFigure000(this.figure);
                this.figure = null
                target.figure = null

            } else if (this.figure.name === FigureNamespace.KING &&  this.figure.cell.checkCellFor000(target) ){

                this.board.getCell(target.y, target.x - 2).setFigure000(this.figure);
                this.figure = null
                this.board.getCell(target.y, target.x - 2).figure = null

            }
            else {
                
                // this.figure.moveFigure(target)

                target.setFigure(this.figure);
                if( target.figure) target.figure.isFistStep = false;
                this.figure = null
            }

        }
    }
}