import './DialogProfileQRcode.less'
import { Profile } from '../../../../service/solas'
import './DialogProfileQRcode.less'
import {useContext, useEffect, useRef, useState} from 'react'
import LangContext from '../../../provider/LangProvider/LangContext'
import QRcode from '../../QRcode'
import usePicture from '../../../../hooks/pictrue'
// import html2canvas from 'html2canvas'
import DialogsContext from '../../../provider/DialogProvider/DialogsContext'
import {useLocation} from "react-router-dom";

export interface DialogProfileQRcodeProps {
    profile: Profile
    handleClose: () => void
}

function DialogProfileQRcode (props: DialogProfileQRcodeProps) {
    const { lang, langType } = useContext(LangContext)
    const { showLoading } = useContext(DialogsContext)
    const domain = import.meta.env.VITE_SOLAS_HOME
    const { defaultAvatar } = usePicture()
    const shareUrl = `${domain}/profile/${props.profile.username}`
    const card = useRef(null)
    const [saving, setSaving] = useState(false)
    const [bgLoading, setBgLoading] = useState(true)
    const bgURL = `/images/qrcode_bg/qrcode_bg_${langType}.png`
    const { pathname } = useLocation()

    useEffect(() => {
        setBgLoading(true)
        const unload = showLoading()
        const bg = new Image()
        bg.src = bgURL
        bg.onload = () => {
            setBgLoading(false)
            unload()
        }
    }, [])

    useEffect(() => {
        console.log('pathname', pathname)
        if (!pathname.includes(props.profile.username!)) {
            props.handleClose()
        }
    }, [pathname])

    // const saveCard = () => {
    //     if (!card.current) return
    //     if (saving) return
    //
    //     setSaving(true)
    //     html2canvas(card.current, {
    //         useCORS: true, // 【重要】开启跨域配置
    //         scale: 2,
    //         allowTaint: true,
    //         width: 316,
    //         height: 486,
    //         backgroundColor: null
    //     }).then((canvas: HTMLCanvasElement) => {
    //         canvas.style.background = 'transparent'
    //         const imgData = canvas.toDataURL('image/png')
    //         const link = document.createElement('a')
    //         link.download = `${props.profile.username}.png`
    //         link.href = imgData
    //         link.click()
    //     })
    //         .catch(function (e: any) {
    //             console.error('oops, something went wrong!', e)
    //         })
    //         .finally(() => {
    //             setSaving(false)
    //         })
    // }

    return (<>
            { !bgLoading && <div className='dialog-profile-qrcode'>
                <div className='card' ref={ card }>
                    <img className='bg' src={ bgURL } alt=""/>
                    <div className='qrcode'>
                        <QRcode size={[104, 104]} text={ shareUrl }></QRcode>
                    </div>
                    <img className='avatar' src={ props.profile.image_url || defaultAvatar( props.profile.id ) } alt=""/>
                    <div className='domain'>{ props.profile.domain }</div>
                </div>
                <div style={{display: 'none'}} className='download-btn' onClick={() => {
                        // saveCard()
                       }}>
                    <i className='icon icon-download'></i>
                    <span>{ lang['Profile_User_Qrcode_download'] }</span>
                </div>
            </div>}
        </>)
}

export default DialogProfileQRcode
