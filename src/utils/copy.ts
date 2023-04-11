export default function copy (text: string) {
    const oInput: any = document.getElementById('CopyInput')
    oInput!.value = text
    oInput!.style.position = 'fixed'
    oInput!.style.opacity = '0'
    document.body.appendChild(oInput)
    oInput.select()
    document.execCommand('Copy')
}
