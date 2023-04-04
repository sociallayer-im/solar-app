import { useState, useContext, useEffect } from 'react'
import solas, {Badge, Presend, PresendWithBadgelets, Profile} from '../../../service/solas'
import langContext from '../../provider/LangProvider/LangContext'
import './PresendQrcode.less'
import QRcode from '../../base/QRcode'
import UserContext from '../../provider/UserProvider/UserContext'

interface PresendQrcodeProp {
    presendId: number
}

function PresendQrcode(props: PresendQrcodeProp) {
    const { lang } = useContext(langContext)
    const { user } = useContext(UserContext)
    const [sender, setSender] = useState<Profile | null>(null)
    const [badge, setBadge] = useState<Badge | null>(null)
    const [presend, setPresend] = useState<PresendWithBadgelets | null>(null)
    const [link, setLink] = useState('')

    const formatTime = (dateString: string) => {
        const dateObject = new Date(dateString)
        const year = dateObject.getFullYear()
        const mon = dateObject.getMonth() + 1
        const date = dateObject.getDate()
        return `${year}.${mon}.${date}`
    }

    useEffect(() => {
        const getDetail = async function() {
            const presend = await solas.queryPresendDetail({ id: props.presendId, auth_token: user.authToken || '' })
            setPresend(presend)

            if (presend.code) {
                setLink(`${window.location.protocol}//${window.location.host}/presend/${presend.id}_${presend.code}`)
            } else {
                setLink(`${window.location.protocol}//${window.location.host}/presend/${presend.id}`)
            }

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
                <div className='inner'>
                    <div className='card-header'>
                        <img src={ badge.image_url } alt=""/>
                        <div className='sender-info'>
                            <div className='badge-name'>{ lang['Presend_Qrcode_Badge'] } { badge.name }</div>
                            <div className='des'>{ lang['Presend_Qrcode_Des']([sender.username]) }</div>
                        </div>
                    </div>

                    <div className='card-title'>{ lang['Presend_Qrcode_Scan'] }</div>
                    <div className='code'>
                        <QRcode size={[160, 160]} text={ link }></QRcode>
                    </div>
                    <div className='limit'>
                        <i className='icon-profile'></i>
                        <span>{ lang['Presend_Qrcode_Limit']([presend.badgelets.length + presend.counter]) }</span>
                    </div>
                    <div className='time'>
                        <i className='icon-clock'></i>
                        <span>{ lang['Presend_Qrcode_Time']([formatTime(presend.expires_at)]) }</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default PresendQrcode
