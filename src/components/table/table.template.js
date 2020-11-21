import { CODES } from "../variables"

function toCell(index) {
    return `
    <div class="cell" data-id=${index}></div>
  `
}

function toColumn(col) {
    return `
    <div class="column">
      <div class='column-info'>${col}</div>
      <div class='triggerX'></div>
    </div>
  `
}

function createRow(index, content, rowID) {
    return `
    <div class="row" row-id=${rowID}>
      <div class="row-info">
        <div class=row-info-value>${index ? index : ""}</div>
        ${index ? `<div class=triggerY></div>` : ""}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function getColumnIndex(column) {
    const columnNum = column.childNodes[1].innerHTML.charCodeAt() - CODES.A
    return columnNum
}

export function resizeAllCellsInColumn(columnNum, newWidth) {
    const rows = document.querySelectorAll(".row-data")
    rows.forEach((rowData) => {
        const resizedChild = rowData.childNodes[columnNum * 2 + 1]
        resizedChild.style.width = newWidth + "px"
    })
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill("")
        .map(toChar)
        .map(toColumn)
        .join("")

    rows.push(createRow(null, cols, 0))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill("")
            .map((_, index) => {
                const column = String.fromCharCode(CODES.A + index)
                const row = i + 1
                return toCell(row + column)
            })
            .join("")
        rows.push(createRow(i + 1, cells, rows.length))
    }

    return rows.join("")
}