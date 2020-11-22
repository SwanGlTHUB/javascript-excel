import { DomListener } from "../../core/DomListener"
import { getTextHeight, getTextWidth } from "../../core/someFunctions"
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
                const cellID = cell.getAttribute("data-id")
                cellResizingBackup(cellID)
                cellResizing(cellID)
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
                const cellID = cell.getAttribute("data-id")
                cellResizingBackup(cellID)
                cellResizing(cellID)
                break
            default:
                break
        }
    }
    init() {
        this.initDOMListeners()
    }
}
