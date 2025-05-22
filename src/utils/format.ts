export const parseLabelsString = (input: string)=>  {
    return input
        .split(';')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((text) => ({ text }))
}
