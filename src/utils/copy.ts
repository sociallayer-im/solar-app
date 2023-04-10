export default function copy (text: string) {
    const oInput = document.createElement('input')
    oInput.value = text
    oInput.style.position = 'absolute'
    oInput.style.opacity = '0'
    document.body.appendChild(oInput)
    oInput.select()
    document.execCommand('Copy')
    oInput.remove()
}
