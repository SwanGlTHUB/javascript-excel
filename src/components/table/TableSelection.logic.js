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
    return [Number.parseInt(row), column]
}

export function getCellSymbolByNum(number) {
    return String.fromCharCode(number)
}

export function getCellID(cell) {
    return cell.getAttribute("data-id")
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
        clearSelectedCell()
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

export function getAllCellsInRectangle(selectedCell, hoveredCell) {
    var [startRow, startColumn] = getCellCoords(selectedCell)
    var [finishRow, finishColumn] = getCellCoords(hoveredCell)
    if (startRow > finishRow) {;
        [startRow, finishRow] = [finishRow, startRow]
    }
    if (startColumn > finishColumn) {;
        [startColumn, finishColumn] = [finishColumn, startColumn]
    }
    var table = []
    for (let rowIndex = startRow; rowIndex <= finishRow; rowIndex++) {
        var row = []
        for (
            let columnIndex = startColumn.charCodeAt(); columnIndex <= finishColumn.charCodeAt(); columnIndex++
        ) {
            const cellID = rowIndex + getCellSymbolByNum(columnIndex)
            row.push(cellID)
        }
        table.push(row)
    }
    return table
}

function setCellStylesOn(cell, position) {
    cell.style.backgroundColor = "rgba(14, 101, 235, 0.1)"
    if (cell === window.selectedCell) {
        return
    }
    if (!position.hasRightNeighbour) {
        cell.style.borderRight = "1px solid blue"
    } else {
        cell.style.borderRight = "1px solid #e2e3e3"
    }
    if (!position.hasLeftNeighbour) {
        cell.style.borderLeft = "1px solid blue"
    } else {
        cell.style.borderLeft = "0px"
    }
    if (!position.hasBottomNeighbour) {
        cell.style.borderBottom = "1px solid blue"
    } else {
        cell.style.borderBottom = "1px solid #e2e3e3"
    }
    if (!position.hasTopNeighbour) {
        cell.style.borderTop = "1px solid blue"
    } else {
        cell.style.borderTop = "0px"
    }
}

function setCellStyleOff(cell) {
    if (cell === window.selectedCell) {
        return
    }
    cell.style.backgroundColor = "white"
    cell.style.border = null
    cell.style.borderTop = null
    cell.style.borderLeft = null
}

export function sellectCellGroup(cells) {
    const rowLength = cells.length
    const columnLength = cells[0].length
    for (let row = 0; row < rowLength; row++) {
        for (let column = 0; column < columnLength; column++) {
            const cellID = cells[row][column]
            const cell = getCellByID(cellID)
            const position = {
                hasLeftNeighbour: column !== 0,
                hasRightNeighbour: column !== columnLength - 1,
                hasBottomNeighbour: row !== rowLength - 1,
                hasTopNeighbour: row !== 0,
            }
            setCellStylesOn(cell, position)
        }
    }
    const windowProperties = {
        selectedCells: cells,
    }
    windowSetProperties(windowProperties)
}

export function clearSelectedCell() {
    if (!elementExistInWindow("selectedCell")) {
        return
    }
    const selectedCell = window.selectedCell
    selectedCell.style.backgroundColor = "white"
    selectedCell.style.border = null
}

export function clearSelectedCells() {
    if (!elementExistInWindow("selectedCells")) {
        return
    }
    const selectedCells = window.selectedCells
    const rowLength = selectedCells.length
    const columnLength = selectedCells[0].length
    for (let row = 0; row < rowLength; row++) {
        for (let column = 0; column < columnLength; column++) {
            const cellID = selectedCells[row][column]
            const cell = getCellByID(cellID)
            setCellStyleOff(cell)
        }
    }
}

export function ArrowRightProcessor() {
    const selectedCell = window.selectedCell
    const cellID = selectedCell.getAttribute("data-id")
    const [row, column] = getCellCoords(cellID)
    const newID = row + nextLetter(column)
    const newCell = getCellByID(newID)
    selectCell(newCell)
    return newCell
}

export function ArrowLeftProcessor() {
    const selectedCell = window.selectedCell
    const cellID = selectedCell.getAttribute("data-id")
    const [row, column] = getCellCoords(cellID)
    const newID = row + previousLetter(column)
    const newCell = getCellByID(newID)
    selectCell(newCell)
    return newCell
}

export function ArrowUpProcessor() {
    const selectedCell = window.selectedCell
    const cellID = selectedCell.getAttribute("data-id")
    const [row, column] = getCellCoords(cellID)
    const newID = previousRow(row) + column
    const newCell = getCellByID(newID)
    selectCell(newCell)
    return newCell
}

export function ArrowDownProcessor() {
    const selectedCell = window.selectedCell
    const cellID = selectedCell.getAttribute("data-id")
    const [row, column] = getCellCoords(cellID)
    const newID = nextRow(row) + column
    const newCell = getCellByID(newID)
    selectCell(newCell)
    return newCell
}