export function windowSetProperties(properties) {
    Object.keys(properties).forEach((key) => {
        window[key] = properties[key]
    })
}