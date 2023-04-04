import {useNavigate} from 'react-router-dom'
import {useStyletron} from 'baseui'
import {useState, useContext, useEffect} from 'react'
import {Presend} from "../../../service/solas";

interface PresendQrcodeProp {
    presend: Presend
}

function PresendQrcode(props: PresendQrcodeProp) {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const [a, seta] = useState('')

    useEffect(() => {

    }, [])

    return (<div>New Component</div>)
}

export default PresendQrcode
