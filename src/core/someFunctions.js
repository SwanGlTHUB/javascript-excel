import { getCellCoords } from "../components/table/TableSelection.logic"
import { ROWS_COUNT } from "../components/variables"

export function nextLetter(letter) {
    return letter === "Z" ? "A" : String.fromCharCode(letter.charCodeAt() + 1)
}

export function previousLetter(letter) {
    return letter === "A" ? "Z" : String.fromCharCode(letter.charCodeAt() - 1)
}

export function nextRow(row) {
    row = Number.parseInt(row)
    return row === ROWS_COUNT ? 1 : row + 1
}

export function previousRow(row) {
    row = Number.parseInt(row)
    return row === 1 ? ROWS_COUNT : row - 1
}
export function nextInRow(cellID) {
    const [row, column] = getCellCoords(cellID)
    if (column === "Z") {
        return null
    }
    return row + nextLetter(column)
}

export function getTextWidth(text) {
    const fakeDivWrapper = document.createElement("div")
    const fakeDiv = document.createElement("div")
    fakeDivWrapper.style.display = "flex"
    fakeDiv.innerHTML = text
    fakeDiv.className = "cell selected"
    fakeDivWrapper.appendChild(fakeDiv)
    const excelEl = document.querySelector(".excel")
    excelEl.appendChild(fakeDivWrapper)
    const width = fakeDiv.offsetWidth
    excelEl.removeChild(fakeDivWrapper)
    return width
}

export function getTextHeight(text) {
    const fakeDivWrapper = document.createElement("div")
    const fakeDiv = document.createElement("div")
    fakeDivWrapper.style.display = "flex"
    fakeDiv.innerHTML = text
    fakeDiv.className = "cell selected"
    fakeDivWrapper.appendChild(fakeDiv)
    const excelEl = document.querySelector(".excel")
    excelEl.appendChild(fakeDivWrapper)
    const height = fakeDiv.offsetHeight
    excelEl.removeChild(fakeDivWrapper)
    return height
}

export function setElementStyle(element, style, className) {
    if (className) {
        element.className = className
    }
    element.style = { ...element.style, ...style }
}
