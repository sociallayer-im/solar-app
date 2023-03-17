import { useNavigate,  useSearchParams } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import solas, { Badgelet, PresendWithBadgelets, Invite, Group } from '../../service/solas'
import Layout from '../../components/Layout/Layout'
import LangContext from '../../components/provider/LangProvider/LangContext'
import './IssueSuccess.less'
import UserContext from '../../components/provider/UserProvider/UserContext'
import copy from '../../utils/copy'
import PresendSussess from './PresendSuccess'
import IssueSuccess from './IssueSuccess'
import InviteSuccess from './InviteSuccess'

function IssueSuccessPage () {
    const navigate = useNavigate()
    const [searchParams, _] = useSearchParams()
    const [badgelet, setBadgelet] = useState<Badgelet | null>(null)
    const [presend, setpresend] = useState<PresendWithBadgelets | null>(null)
    const [invite, setInvite] = useState<Invite | null>(null)
    const [inviteGroup, setInviteGroup] = useState<Group | null>(null)
    const [desText, setDesText] = useState('')
    const { lang } =  useContext(LangContext)
    const { user } =  useContext(UserContext)

    const presendId = searchParams.get('presend')

    const badgeletId = searchParams.get('badgelet')
    const acceptAmount = searchParams.get('amount')

    const inviteId = searchParams.get('invite')
    const groupId = searchParams.get('group')


    useEffect(() => {
        async function fetchInfo () {
            if (badgeletId) {
                const badgeletDetail = await solas.queryBadgeletDetail({ id: Number(badgeletId) })
                if (Number(acceptAmount) > 1) {
                    setDesText(lang['IssueFinish_IssuedToMany']([badgeletDetail.receiver.domain, Number(acceptAmount) - 1]))
                } else {
                    setDesText(lang['IssueFinish_IssuedToOne']([badgeletDetail.receiver.domain]))
                }

                setBadgelet(badgeletDetail)
            }

            if (presendId) {
                const presendDetail = await solas.queryPresendDetail({ id: Number(presendId), auth_token: user.authToken || '' })
                setpresend(presendDetail)
            }

            if (inviteId && groupId) {
                const inviteDetail = await solas.queryInviteDetail({ invite_id: Number(inviteId), group_id: Number(groupId)})
                if (!inviteDetail) return

                const receiver = await solas.getProfile({id: inviteDetail?.receiver_id})
                if (!receiver) return

                const group = await solas.queryGroupDetail(Number(groupId))
                if (!group) return

                if (Number(acceptAmount) > 1) {
                    setDesText(lang['IssueFinish_IssuedToMany']([receiver.domain, Number(acceptAmount) - 1]))
                } else {
                    setDesText(lang['IssueFinish_IssuedToOne']([receiver.domain]))
                }

                setInviteGroup(group)
                setInvite(inviteDetail)
            }
        }
        fetchInfo()
    }, [user.authToken])

    const genShareLink = () => {
        const base = `${window.location.protocol}//${window.location.host}`
        let path = ''

        if (badgeletId) {
            path = `${base}/badgelet/${badgeletId}`
        }

        if (presendId) {
            path = `${base}/presend/${presendId}`
        }

        if (inviteId) {
            path = `${base}/invite/${inviteId}`
        }

        return path
    }

    const whatsAppShare = () => {
        const text = lang['WhatsApp_Share']([
            user.domain,
            badgelet?.badge.title,
            genShareLink()
        ])
        const decodeText = encodeURIComponent(text)
        window.open(`https://wa.me/?text=${decodeText}`)
    }

    const systemShare = () => {
        if (navigator.share) {
            const shareUrl = genShareLink()
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
        const shareUrl = genShareLink()
        const link = lang['IssueFinish_share']
            .replace('#1',  user.domain!)
            .replace('#2', badgelet?.badge.title || '')
            .replace('#3', shareUrl)

        copy(link)
    }

    return (
        <Layout>
                <div className='issue-success'>
                    { !!badgelet && <IssueSuccess
                        desText={desText}
                        systemShare={ () => { systemShare() }}
                        whatsAppShare={ () => { whatsAppShare() }}
                        handleCopy={ () => { handleCopy() }}
                        badgelet={ badgelet }
                    ></IssueSuccess> }

                    { !!invite && <InviteSuccess
                        desText={desText}
                        systemShare={ () => { systemShare() }}
                        whatsAppShare={ () => { whatsAppShare() }}
                        handleCopy={ () => { handleCopy() }}
                        group={ inviteGroup! }
                    ></InviteSuccess> }

                    { !!presend && <PresendSussess presend={ presend }></PresendSussess> }
                </div>

        </Layout>
    )
}

export default IssueSuccessPage
