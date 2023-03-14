import {useNavigate} from 'react-router-dom'
import {useStyletron} from 'baseui'
import { useState, useContext, useEffect } from 'react'
import QRCode from 'qrcode'

interface QRcodeProps {
    text: string
    size: number[]
    style?: any,
    className?: string
}

function QRcode(props: QRcodeProps) {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const [dataUrl, setDataUrl] = useState('')

    useEffect(() => {
        QRCode.toDataURL(
            props.text,
            {
                width: props.size[0],
                margin: 0,
                color: {
                    light: 'red',
                    dark: '#000'
                }
            },
            (error: any, url: string) => {
                if (error) console.error('[app-qrcode]:' + JSON.stringify(error))
                setDataUrl(url)
            })
    }, [])

    return (
        <>
        { dataUrl && <img className={props.className || ''} src={dataUrl} style={{ width: `${props.size[0]}px`, height: `${props.size[1]}px`, ...props.style }}   alt='' /> }
        </>
    )
}

export default QRcode
