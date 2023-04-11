import { useState, useContext, useEffect } from 'react'
import solas, {Badge, Presend, PresendWithBadgelets, Profile} from '../../../service/solas'
import langContext from '../../provider/LangProvider/LangContext'
import './PresendQrcode.less'
import QRcode from '../../base/QRcode'
import UserContext from '../../provider/UserProvider/UserContext'
import AppButton, { BTN_KIND } from '../../base/AppButton/AppButton'
import useTime from '../../../hooks/formatTime'

interface PresendQrcodeProp {
    presend: Presend
}

function PresendQrcode(props: PresendQrcodeProp) {
    const { presend } = props
    const { lang } = useContext(langContext)
    const { user } = useContext(UserContext)
    const [sender, setSender] = useState<Profile | null>(null)
    const [badge, setBadge] = useState<Badge | null>(null)
    const [link, setLink] = useState('')
    const [expired, setExpired] = useState(false)
    const [presendWithBadgelets, setPresendWithBadgelets] = useState<PresendWithBadgelets | null>(null)
    const formatTime = useTime()

    useEffect(() => {
        const getDetail = async function() {
            const presend = await solas.queryPresendDetail({id: props.presend.id, auth_token: user.authToken || ''})
            setPresendWithBadgelets(presend)

            if (presend.code) {
                setLink(`${window.location.protocol}//${window.location.host}/presend/${presend.id}_${presend.code}`)
            } else {
                setLink(`${window.location.protocol}//${window.location.host}/presend/${presend.id}`)
            }

            const now = Date.parse(new Date().toString())
            const expirationDate = Date.parse(new Date(presend.expires_at).toString())
            setExpired(now > expirationDate)

            const profile = await solas.getProfile({ id: presend.sender_id })
            setSender(profile)

            const badge = await solas.queryBadgeDetail({ id: presend.badge_id })
            setBadge(badge)
        }
        getDetail()
    }, [])

    return (
        <div className='presend-qrcode-card'>
            { !!sender && !!badge && !!presend &&
                <>
                    <div className='inner'>
                        <div className='card-header'>
                            <img src={ badge.image_url } alt=""/>
                            <div className='sender-info'>
                                <div className='badge-name'>{ lang['Presend_Qrcode_Badge'] } { badge.name }</div>
                                <div className='des'>{ lang['Presend_Qrcode_Des']([sender.username]) }</div>
                            </div>
                        </div>
                        <div className='card-title'> { lang['Presend_Qrcode_Scan'] } </div>
                        <div className='card-recommended'>
                            <span>{ lang['Presend_Qrcode_Recommended'] }</span>
                            <img src="/images/wallet_icon/metamask.png" alt=""/>
                            <img src="/images/wallet_icon/imtoken.png" alt=""/>
                        </div>
                        <div className='code'>
                            <QRcode size={[160, 160]} text={ link }></QRcode>
                        </div>
                        { !!presendWithBadgelets &&
                            <div className='limit'>
                                <i className='icon-profile'></i>
                                <span>{ lang['Presend_Qrcode_Limit']([presendWithBadgelets.badgelets.length + presend.counter]) }</span>
                            </div>
                        }
                        <div className='time'>
                            <i className='icon-clock'></i>
                            <span>{ lang['Presend_Qrcode_Time']([formatTime(presend.expires_at)]) }</span>
                        </div>
                    </div>
                    { expired  && <div className='expired-mask'>
                        <div className='expired-text'>
                            <i className='icon-clock'></i>
                            <span>{ lang['Presend_Qrcode_Expired'] }</span>
                        </div>
                        <AppButton special inline kind={ BTN_KIND.primary }>{ lang['Presend_Qrcode_Regen']}</AppButton>
                    </div> }
                </>
            }
        </div>
    )
}

export default PresendQrcode
