import {
    getTextHeight,
    getTextWidth,
    nextInRow,
} from "../../core/someFunctions"
import { windowSetProperties } from "../../core/windowFunctions"
import { CELL_HEIGHT, CELL_PADDING } from "../variables"
import { getCellByID, getCellCoords } from "./TableSelection.logic"

function returnCellStyleToInitialState(cell) {
    cell.style = null
}

function setRowHeight(row, height) {
    row.style.height =
        height == 0 ? CELL_HEIGHT + "px" : CELL_PADDING + height + "px"
}

export function cellResizing(cellID) {
    const cell = getCellByID(cellID)
    var cellTextWidth = getTextWidth(cell.innerHTML)
    var cellTextHeight = getTextHeight(cell.innerHTML)
    const CELL_TEXT_WIDTH = cellTextWidth
    const CELL_TEXT_HEIGHT = cellTextHeight
    const [cellRowID, _] = getCellCoords(cellID)
    const cellRow = document.querySelector(`[row-id="${cellRowID}"]`)
    setRowHeight(cellRow, cellTextHeight)

    while (cellTextWidth) {
        const cell = getCellByID(cellID)
        if (cellTextWidth < cell.offsetWidth) {
            break
        }
        cellTextWidth -= cell.offsetWidth
        cellID = nextInRow(cellID)
        if (cellID === null) {
            break
        }
        const nextCell = getCellByID(cellID)
        nextCell.className = "cell selected"
        nextCell.style.borderLeft = 0
        cell.style.borderRight = 0
    }
    windowSetProperties({
        lastCellTextWidth: CELL_TEXT_WIDTH,
        lastCellTextHeight: CELL_TEXT_HEIGHT,
    })
}

export function cellResizingBackup(cellID) {
    var cellTextWidth = window.lastCellTextWidth
    var prevLastCell = null
    var lastCell = null
    const [cellRowID, _] = getCellCoords(cellID)
    const cellRow = document.querySelector(`[row-id="${cellRowID}"]`)
    setRowHeight(cellRow, 0)
    while (cellTextWidth) {
        const cell = getCellByID(cellID)
        if (cellTextWidth < cell.offsetWidth) {
            break
        }
        cellTextWidth -= cell.offsetWidth
        cellID = nextInRow(cellID)
        if (cellID === null) {
            break
        }
        const nextCell = getCellByID(cellID)
        nextCell.style = null
        nextCell.className = "cell"
        prevLastCell = cell
        lastCell = nextCell
    }
    if (lastCell) {
        returnCellStyleToInitialState(lastCell)
        const nextLastCellID = nextInRow(lastCell.getAttribute("data-id"))
        const nextLastCell = getCellByID(nextLastCellID)
        if (nextLastCell) {
            returnCellStyleToInitialState(nextLastCell)
        }
    }
    if (prevLastCell) {
        returnCellStyleToInitialState(prevLastCell)
    }
}
