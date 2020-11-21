import { DomListener } from "../../core/DomListener"
import { getTextHeight, getTextWidth } from "../../core/someFunctions"
import {
    elementExistInWindow,
    windowSetProperties,
} from "../../core/windowFunctions"
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
                const textHeight = getTextHeight(cell.innerHTML)
                const cellID = cell.getAttribute("data-id")
                const lastCellTextWidth = window.lastCellTextWidth
                cellResizingBackup(cellID, lastCellTextWidth)
                cellResizing(cellID, textWidth, textHeight)
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
                if (!event.shiftKey) {
                    return
                }
                const cell = event.target
                const textWidth = getTextWidth(cell.innerHTML)
                const cellID = cell.getAttribute("data-id")
                const textHeight = getTextHeight(cell.innerHTML)
                const lastCellTextWidth = window.lastCellTextWidth
                cellResizing(cellID, textWidth, textHeight)
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