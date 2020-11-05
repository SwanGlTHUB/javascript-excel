import { $ } from "../../core/dom"
import {
    nextLetter,
    nextRow,
    previousLetter,
    previousRow,
} from "../../core/someFunctions"
import {
    elementExistInWindow,
    windowSetProperties,
} from "../../core/windowFunctions"
import { setValueToFormulaInput } from "../formula/Formula.logic"

function inputListenerCallback(event) {
    const cellValue = event.target.innerHTML
    setValueToFormulaInput(cellValue)
}

function addInputListenerToCell(cell) {
    const cellValue = cell.$el.innerHTML
    setValueToFormulaInput(cellValue)
    windowSetProperties({ selectedCellDOM: cell })
    cell.on("input", inputListenerCallback) //Add Listener to cell
}

function removeInputListenerFromCell(cell) {
    cell.off("input", inputListenerCallback) //remove Listener from cell
}

export function getCellByID(ID) {
    return document.querySelector(`[data-id="${ID}"]`)
}

export function getCellCoords(cellID) {
    const row = cellID.slice(0, -1)
    const column = cellID.slice(-1)
    return [row, column]
}

export function setSelectedCellValue(value) {
    const selectedCell = window.selectedCell
    selectedCell.innerHTML = value
}

export function selectCell(cell) {
    const selectedCellAlreadyExist = elementExistInWindow("selectedCell")
    const $cell = $(cell)

    if (selectedCellAlreadyExist) {
        const selectedCell = window.selectedCell
        selectedCell.classList.remove("selected")
        removeInputListenerFromCell($cell)
    }

    $cell.addClass("selected")
    $cell.$el.focus()
    const windowProperties = {
        selectedCell: cell,
    }
    windowSetProperties(windowProperties)
    addInputListenerToCell($cell)
}

export function ArrowRightProcessor() {
    const selectedCell = window.selectedCell
    const cellID = selectedCell.getAttribute("data-id")
    const [row, column] = getCellCoords(cellID)
    const newID = row + nextLetter(column)
    const newCell = getCellByID(newID)
    selectCell(newCell)
}

export function ArrowLeftProcessor() {
    const selectedCell = window.selectedCell
    const cellID = selectedCell.getAttribute("data-id")
    const [row, column] = getCellCoords(cellID)
    const newID = row + previousLetter(column)
    const newCell = getCellByID(newID)
    selectCell(newCell)
}

export function ArrowUpProcessor() {
    const selectedCell = window.selectedCell
    const cellID = selectedCell.getAttribute("data-id")
    const [row, column] = getCellCoords(cellID)
    const newID = previousRow(row) + column
    const newCell = getCellByID(newID)
    selectCell(newCell)
}

export function ArrowDownProcessor() {
    const selectedCell = window.selectedCell
    const cellID = selectedCell.getAttribute("data-id")
    const [row, column] = getCellCoords(cellID)
    const newID = nextRow(row) + column
    const newCell = getCellByID(newID)
    selectCell(newCell)
}