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