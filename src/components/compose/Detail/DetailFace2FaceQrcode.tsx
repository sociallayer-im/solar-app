import {useNavigate} from 'react-router-dom'
import {useStyletron} from 'baseui'
import {useState, useContext, useEffect} from 'react'
import LangContext from '../../provider/LangProvider/LangContext'
import DetailWrapper from './atoms/DetailWrapper/DetailWrapper'
import DetailHeader from './atoms/DetailHeader'
import PresendQrcode from '../PresendQrcode/PresendQrcode'

interface DetailFace2FaceQrcodeProps {
    handleClose: () => void
    presendId: number
}

function DetailFace2FaceQrcode(props: DetailFace2FaceQrcodeProps) {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const [a, seta] = useState('')
    const { lang } = useContext(LangContext)

    useEffect(() => {

    }, [])

    return (
        <DetailWrapper>
            <DetailHeader title={ lang['BadgeDialog_Btn_Face2face'] } onClose={()=> { props.handleClose() }}></DetailHeader>
            <PresendQrcode presendId={ props.presendId }></PresendQrcode>
        </DetailWrapper>
    )
}

export default DetailFace2FaceQrcode
