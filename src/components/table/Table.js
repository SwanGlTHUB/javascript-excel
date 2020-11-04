import { ExcelComponent } from "@core/ExcelComponent"
import { createTable } from "@/components/table/table.template"
import { $ } from "../../core/dom"
import {
    resizeTypeX,
    resizeTypeY,
    triggerXProcessor,
    triggerYProcessor,
} from "./triggerLogic"

export class Table extends ExcelComponent {
    static className = "excel__table"

    constructor($root) {
        super($root, {
            name: "Formula",
            listeners: ["mousedown", "mouseup"],
        })
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
        return createTable(20)
    }
}