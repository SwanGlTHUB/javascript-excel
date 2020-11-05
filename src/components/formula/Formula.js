import { ExcelComponent } from "@core/ExcelComponent"
import { $ } from "../../core/dom"
import { elementExistInWindow } from "../../core/windowFunctions"
import { setSelectedCellValue } from "../table/TableSelection.logic"

export class Formula extends ExcelComponent {
    static className = "excel__formula"

    static getFormulaInputDOM() {
        return $("[data-input-type=formulaInput]")
    }

    constructor($root) {
        super($root, {
            name: "Formula",
            listeners: ["input", "click"],
        })
    }

    toHTML() {
        return `
      <div class="info">fx</div>
      <div class="input" data-input-type=formulaInput contenteditable spellcheck="false"></div>
    `
    }

    onInput(event) {
        const formulaInput = event.target.innerHTML
        if (elementExistInWindow("selectedCell")) {
            setSelectedCellValue(formulaInput)
        }
    }

    onClick() {
        console.log("mk")
    }
}