import { $ } from "../../core/dom"
import { DomListener } from "../../core/DomListener"
import { Formula } from "../formula/Formula"
import {
    ArrowDownProcessor,
    ArrowLeftProcessor,
    ArrowRightProcessor,
    ArrowUpProcessor,
    selectCell,
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
                selectCell(event.target)
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