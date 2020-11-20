import { DomListener } from "../../core/DomListener"
import { getTextWidth } from "../../core/someFunctions"
import { windowSetProperties } from "../../core/windowFunctions"
import { cellResizing, cellResizingBackup } from "./CellResizingLogic"
export class CellResizing extends DomListener {
    static className = ""
    static $formula = ""

    constructor($root) {
        const listeners = ["input", "mousedown"]
        super($root, listeners)
    }

    onInput(event) {
        switch (event.target.className) {
            case "cell selected":
                const cell = event.target
                const textWidth = getTextWidth(cell.innerHTML)
                const cellID = cell.getAttribute("data-id")
                const lastCellTextWidth = window.lastCellTextWidth
                cellResizingBackup(cellID, lastCellTextWidth)
                cellResizing(cellID, textWidth)
                const windowProperties = {
                    lastCellTextWidth: textWidth,
                }
                windowSetProperties(windowProperties)
                break
            default:
                break
        }
    }
    onMousedown(event) {
        switch (event.target.className) {
            case "cell selected":
                const cell = event.target
                const textWidth = getTextWidth(cell.innerHTML)
                const cellID = cell.getAttribute("data-id")
                const lastCellTextWidth = window.lastCellTextWidth
                cellResizing(cellID, textWidth)
                const windowProperties = {
                    lastCellTextWidth: textWidth,
                }
                windowSetProperties(windowProperties)
                break
            default:
                break
        }
    }
    init() {
        this.initDOMListeners()
    }
}