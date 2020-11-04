const CODES = {
    A: 65,
    Z: 90,
}

function toCell() {
    return `
    <div class="cell" contenteditable></div>
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

function createRow(index, content) {
    return `
    <div class="row">
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

    rows.push(createRow(null, cols))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount).fill("").map(toCell).join("")

        rows.push(createRow(i + 1, cells))
    }

    return rows.join("")
}