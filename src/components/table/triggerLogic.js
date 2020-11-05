import { $ } from "../../core/dom"
import { windowSetProperties } from "../../core/windowFunctions"
import { MIN_COLUMN_WIDTH, MIN_ROW_HEIGHT } from "../variables"
import { getColumnIndex, resizeAllCellsInColumn } from "./table.template"

export function triggerXProcessor(event) {
    var app = $("#app")
    var columnElement = event.target.parentNode
    var windowProperties = {
        startX: null,
        selectedColumn: columnElement,
        startColumnWidth: columnElement.offsetWidth,
        resizeType: "X",
    }
    windowSetProperties(windowProperties)
    app.on("mousemove", this.onMousemove)
}

export function triggerYProcessor(event) {
    var app = $("#app")
    var columnElement = event.target.parentNode
    var windowProperties = {
        startY: null,
        selectedRow: columnElement,
        startColumnHeight: columnElement.offsetHeight,
        resizeType: "Y",
    }
    windowSetProperties(windowProperties)
    app.on("mousemove", this.onMousemove)
}

export function resizeTypeX(event) {
    if (window.startX === null) {
        window.startX = event.clientX
    }

    const column = window.selectedColumn
    const delta = event.clientX - window.startX
    const startColumnWidth = window.startColumnWidth
    const newCellsWidth = Math.max(MIN_COLUMN_WIDTH, startColumnWidth + delta)
    const columnIndex = getColumnIndex(column)
    resizeAllCellsInColumn(columnIndex, newCellsWidth)
}

export function resizeTypeY(event) {
    if (window.startY === null) {
        window.startY = event.clientY
    }

    const row = window.selectedRow.parentNode
    const delta = event.clientY - window.startY
    const startColumnHeight = window.startColumnHeight
    const newColumnHeight = Math.max(MIN_ROW_HEIGHT, startColumnHeight + delta)
    row.style.height = newColumnHeight + "px"
}