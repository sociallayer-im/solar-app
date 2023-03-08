export default function copy (text: string) {
    const oInput = document.createElement('input')
    oInput.value = text
    document.body.appendChild(oInput)
    oInput.select()
    document.execCommand('Copy')
}
