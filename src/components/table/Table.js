import { ExcelComponent } from "@core/ExcelComponent"
import { createTable } from "@/components/table/table.template"
import { $ } from "../../core/dom"
import {
    resizeTypeX,
    resizeTypeY,
    triggerXProcessor,
    triggerYProcessor,
} from "./triggerLogic"
import { TableSelection } from "./TableSelection"
import { ROWS_COUNT } from "../variables"
import { CellResizing } from "./CellResizing"

export class Table extends ExcelComponent {
    static className = "excel__table"

    constructor($root) {
        Table.initTableSelection($root)
        Table.initCellResizing($root)
        super($root, {
            name: "Table",
            listeners: ["mousedown", "mouseup"],
        })
    }

    static initTableSelection($root) {
        const tableSelection = new TableSelection($root)
        tableSelection.init()
    }

    static initCellResizing($root) {
        const cellResizing = new CellResizing($root)
        cellResizing.init()
    }

    onMousemove(event) {
        switch (window["resizeType"]) {
            case "X":
                resizeTypeX(event)
                break
            case "Y":
                resizeTypeY(event)
                break
        }
    }

    onMouseup(event) {
        const allApp = $("#app")
        allApp.off("mousemove", this.onMousemove)
    }

    onMousedown(event) {
        switch (event.target.className) {
            case "triggerX":
                triggerXProcessor.call(this, event)
                break
            case "triggerY":
                triggerYProcessor.call(this, event)
                break
            default:
                return
        }
    }

    toHTML() {
        return createTable(ROWS_COUNT)
    }
}