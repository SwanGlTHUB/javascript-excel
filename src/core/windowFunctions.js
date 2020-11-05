export function windowSetProperties(properties) {
    Object.keys(properties).forEach((key) => {
        window[key] = properties[key]
    })
}

export function elementExistInWindow(element) {
    return element in window
}