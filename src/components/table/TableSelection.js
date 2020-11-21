import { DomListener } from "../../core/DomListener"
import { getTextHeight, getTextWidth } from "../../core/someFunctions"
import {
    elementExistInWindow,
    windowSetProperties,
} from "../../core/windowFunctions"
import { CellResizing } from "./CellResizing"
import { cellResizing, cellResizingBackup } from "./CellResizingLogic"
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
    static className = ""
    static $formula = ""

    constructor($root) {
        const listeners = ["mousedown", "keydown"]
        super($root, listeners)
    }

    onMousedown(event) {
        switch (event.target.className) {
            case "cell":
                if (!event.shiftKey) {
                    return
                }
                event.target.setAttribute("contenteditable", true)
                if (elementExistInWindow("selectedCell")) {
                    if (event.target != window.selectedCell) {
                        const previousCell = window.selectedCell
                        previousCell.setAttribute("contenteditable", false)
                        const previousCellID = window.selectedCell.getAttribute(
                            "data-id"
                        )
                        cellResizingBackup(
                            previousCellID,
                            window.lastCellTextWidth,
                            0
                        )
                    }
                }
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
        const shiftKeyIsPressed = event.shiftKey
        if (!shiftKeyIsPressed) {
            return
        }
        if (!keys.find((el) => el == event.key)) {
            return
        }
        if (elementExistInWindow("selectedCell")) {
            const previousCellID = window.selectedCell.getAttribute("data-id")
            window.selectedCell.setAttribute("contenteditable", false)
            cellResizingBackup(previousCellID, window.lastCellTextWidth, 0)
        }
        clearSelectedCells()
        var newCell
        switch (event.key) {
            case "ArrowRight":
                newCell = ArrowRightProcessor()
                break
            case "ArrowLeft":
                newCell = ArrowLeftProcessor()
                break
            case "ArrowUp":
                newCell = ArrowUpProcessor()
                break
            case "ArrowDown":
                newCell = ArrowDownProcessor()
                break
            default:
                break
        }

        newCell.setAttribute("contenteditable", true)
        newCell.focus()
        const textWidth = getTextWidth(newCell.innerHTML)
        const textHeight = getTextHeight(newCell.innerHTML)
        const cellID = newCell.getAttribute("data-id")
        const lastCellTextWidth = window.lastCellTextWidth
        cellResizing(cellID, textWidth, textHeight)
        const windowProperties = {
            lastCellTextWidth: textWidth,
        }
        windowSetProperties(windowProperties)
    }

    init() {
        this.initDOMListeners()
    }
}