import { DomListener } from "../../core/DomListener"
import {
    ArrowDownProcessor,
    ArrowLeftProcessor,
    ArrowRightProcessor,
    ArrowUpProcessor,
    clearSelectedCell,
    clearSelectedCells,
    getAllCellsInRectangle,
    getCellID,
    selectCell,
    sellectCellGroup,
} from "./TableSelection.logic"
export class TableSelection extends DomListener {
    static className = "excel__table"
    static $formula = ""

    constructor($root) {
        const listeners = ["mousedown", "keydown"]
        super($root, listeners)
    }

    onMousedown(event) {
        switch (event.target.className) {
            case "cell":
                clearSelectedCells()
                selectCell(event.target)
                const table = document.querySelector(".excel__table")
                table.onmouseover = (event) => {
                    switch (event.target.className) {
                        case "cell":
                            const selectedCell = window.selectedCell
                            const selectedCellID = getCellID(selectedCell)
                            const hoveredCell = event.target
                            const hoveredCellID = getCellID(hoveredCell)
                            const subTable = getAllCellsInRectangle(
                                selectedCellID,
                                hoveredCellID
                            )
                            clearSelectedCells()
                            sellectCellGroup(subTable)
                    }
                }
                table.onmouseup = function(event) {
                    this.onmouseover = null
                }
            default:
                return
        }
    }

    onKeydown(event) {
        const keys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"]
        switch (event.key) {
            case "ArrowRight":
                ArrowRightProcessor()
                break
            case "ArrowLeft":
                ArrowLeftProcessor()
                break
            case "ArrowUp":
                ArrowUpProcessor()
                break
            case "ArrowDown":
                ArrowDownProcessor()
                break
            default:
                break
        }
    }

    init() {
        this.initDOMListeners()
    }

    toHTML() {
        return createTable(20)
    }
}