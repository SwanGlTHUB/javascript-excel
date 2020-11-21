import { nextInRow } from "../../core/someFunctions"
import { CELL_PADDING } from "../variables"
import { getCellByID, getCellCoords, getCellID } from "./TableSelection.logic"
export function cellResizing(cellID, CellTextWidth, cellTextHeight) {
    const [rowID, _] = getCellCoords(cellID)
    const row = document.querySelector(`[row-id="${rowID}"]`)
    row.style.height =
        cellTextHeight == 0 ? 24 + "px" : 9 + cellTextHeight + "px"
    while (CellTextWidth) {
        const cell = getCellByID(cellID)
        if (CellTextWidth < cell.offsetWidth) {
            break
        }
        CellTextWidth -= cell.offsetWidth
        cellID = nextInRow(cellID)
        if (cellID === null) {
            break
        }
        const nextCell = getCellByID(cellID)
        nextCell.className = "cell selected"
        nextCell.style.borderLeft = 0
        cell.style.borderRight = 0
    }
}

export function cellResizingBackup(cellID, CellTextWidth, cellTextHeight) {
    var prevLastCell = null
    var lastCell = null
    const [rowID, _] = getCellCoords(cellID)
    const row = document.querySelector(`[row-id="${rowID}"]`)
    row.style.height =
        cellTextHeight == 0 ? 24 + "px" : 9 + cellTextHeight + "px"
    while (CellTextWidth) {
        const cell = getCellByID(cellID)
        if (CellTextWidth < cell.offsetWidth) {
            break
        }
        CellTextWidth -= cell.offsetWidth
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
        lastCell.style = null
        const nextLastCellID = nextInRow(lastCell.getAttribute("data-id"))
        const nextLastCell = getCellByID(nextLastCellID)
        if (nextLastCell) {
            nextLastCell.style = null
        }
    }
    if (prevLastCell) {
        prevLastCell.style.borderRight = null
    }
}