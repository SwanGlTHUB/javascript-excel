import { nextInRow } from "../../core/someFunctions"
import { getCellByID, getCellID } from "./TableSelection.logic"
export function cellResizing(cellID, CellTextWidth) {
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

export function cellResizingBackup(cellID, CellTextWidth) {
    var prevLastCell = null
    var lastCell = null
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