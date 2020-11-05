import { Formula } from "./Formula"

const {
    elementExistInWindow,
    windowSetProperties,
} = require("../../core/windowFunctions")

function addFormulaInputToWindowIfNotExist() {
    if (!elementExistInWindow("formulaInput")) {
        const windowProperties = {
            formulaInput: Formula.getFormulaInputDOM().$el,
        }
        windowSetProperties(windowProperties)
    }
}

export function setValueToFormulaInput(value) {
    addFormulaInputToWindowIfNotExist()
    const formulaInput = window.formulaInput
    formulaInput.innerHTML = value
}