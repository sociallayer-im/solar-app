import { useNavigate,  useSearchParams } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import solas, {Badgelet, Presend, PresendWithBadgelets} from '../../service/solas'
import Layout from '../../components/Layout/Layout'
import LangContext from '../../components/provider/LangProvider/LangContext'
import './IssueSuccess.less'
import AppButton, { BTN_KIND } from '../../components/base/AppButton'
import UserContext from '../../components/provider/UserProvider/UserContext'
import copy from '../../utils/copy'
import PresendSussess from './PresendSuccess'

function IssueSuccess () {
    const navigate = useNavigate()
    const [searchParams, _] = useSearchParams()
    const [badgelet, setBadgelet] = useState<Badgelet | null>(null)
    const [presend, setpresend] = useState<PresendWithBadgelets | null>(null)
    const [desText, setDesText] = useState('')
    const { lang } =  useContext(LangContext)
    const { user } =  useContext(UserContext)

    const presendId = searchParams.get('presend')
    const badgeletId = searchParams.get('badgelet')
    const acceptAmount = searchParams.get('amount')

    useEffect(() => {
        async function fetchInfo () {
            if (badgeletId) {
                const badgeletDetail = await solas.queryBadgeletDetail({ id: Number(badgeletId) })
                setBadgelet(badgeletDetail)
                if (Number(acceptAmount) > 1) {
                    setDesText(lang['IssueFinish_IssuedToMany']([badgeletDetail.receiver.domain, Number(acceptAmount) - 1]))
                } else {
                    setDesText(lang['IssueFinish_IssuedToOne']([badgeletDetail.receiver.domain]))
                }
            }
            if (presendId) {
                const presendDetail = await solas.queryPresendDetail({ id: Number(presendId), auth_token: user.authToken || '' })
                setpresend(presendDetail)
            }
        }
        fetchInfo()
    }, [user.domain])

    const whatsAppShare = () => {
        const text = lang['WhatsApp_Share']([
            user.domain,
            badgelet?.badge.title,
            `${window.location.protocol}//${window.location.host}/badgelet/${badgelet?.id}`
        ])
        const decodeText = encodeURIComponent(text)
        window.open(`https://wa.me/?text=${decodeText}`)
    }

    const systemShare = () => {
        if (navigator.share) {
            const shareUrl = `${window.location.protocol}//${window.location.host}/badgelet/${badgelet?.id}`
            const text = lang['WhatsApp_Share']([
                user.domain,
                badgelet?.badge.title,
                shareUrl
            ])
            navigator.share({
                title: 'Social Layer',
                url: shareUrl,
                text: text
            })
        }
    }

    const handleCopy = () => {
        const shareUrl = `${window.location.protocol}//${window.location.host}/badgelet/${badgelet?.id}`
        const link = lang['IssueFinish_share']
            .replace('#1',  user.domain!)
            .replace('#2', badgelet?.badge.title || '')
            .replace('#3', shareUrl)

        copy(link)
    }

    return (
        <Layout>
                <div className='issue-success'>

                    { !!badgelet && <div>
                        <div className='bg-box'></div>
                        <div className='inner'>
                            <div className='title'>{ lang['PresendFinish_Title'] }</div>
                            <img className='cover' src={badgelet.badge.image_url} />
                            <div className='badgelet-name'>{badgelet.badge.title}</div>
                            <div className='des' dangerouslySetInnerHTML={{__html: desText}} />
                            <div className='share'>
                                <div className="share-split"><span>{lang['IssueFinish_GoAndInform']}</span></div>
                                <div className='actions'>
                                    <AppButton style={{ width: '36px'}} onClick={ whatsAppShare }>
                                        <i className='icon icon-whatsapp'></i>
                                    </AppButton>
                                    <AppButton style={{ width: '36px'}} onClick={ systemShare }>
                                        <span className="icon-more"></span>
                                    </AppButton>
                                    <AppButton style={{ width: '110px'}} onClick={ handleCopy }>
                                        <span className='icon-copy'></span>
                                        { lang['IssueFinish_CopyLink'] }
                                    </AppButton>
                                </div>
                            </div>
                            <AppButton kind={BTN_KIND.primary} onClick={ () => { navigate(`/profile/${user.userName}`) } }>
                                {lang['IssueFinish_BackToProfile']}
                            </AppButton>
                        </div>
                    </div> }

                    { !!presend && <PresendSussess presend={ presend }></PresendSussess> }
                </div>

        </Layout>
    )
}

export default IssueSuccess
