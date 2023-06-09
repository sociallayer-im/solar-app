import { useSearchParams } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import solas, {Group, Profile, ProfileSimple, queryPointItemDetail} from '../../service/solas'
import Layout from '../../components/Layout/Layout'
import LangContext from '../../components/provider/LangProvider/LangContext'
import './IssueBadgeSuccess.less'
import UserContext from '../../components/provider/UserProvider/UserContext'
import copy from '../../utils/copy'
import PageBack from '../../components/base/PageBack'
import usePicture from '../../hooks/pictrue'
import AppButton, { BTN_SIZE } from '../../components/base/AppButton/AppButton'
import usePageHeight from '../../hooks/pageHeight'
import DialogsContext from "../../components/provider/DialogProvider/DialogsContext";
import ShareQrcode, { ShareQrcodeProp } from "../../components/compose/ShareQrcode/ShareQrcode";

function IssueSuccessPage () {
    const [searchParams, _] = useSearchParams()
    const [info, setInfo] = useState<ShareQrcodeProp | null>(null)
    const { lang } =  useContext(LangContext)
    const { user } =  useContext(UserContext)
    const { defaultAvatar } =  usePicture()
    const { heightWithoutNav } = usePageHeight()
    const { showToast } = useContext(DialogsContext)
    const [linkContent, setLinkContent] = useState('')

    // presend成功传参
    const presendId = searchParams.get('presend')

    // 颁发成功传参
    const badgeletId = searchParams.get('badgelet')

    // 邀请成功传参
    const inviteId = searchParams.get('invite')
    const groupId = searchParams.get('group')

    // nftpass 颁发成功传参
    const nftpassletId = searchParams.get('nftpasslet')

   // presend成功传参
   const pointId = searchParams.get('point')
   const pointitemId = searchParams.get('pointitem')


    useEffect(() => {
        async function fetchInfo () {
            if (badgeletId) {
                const badgeletDetail = await solas.queryBadgeletDetail({ id: Number(badgeletId) })

                setInfo({
                    sender: badgeletDetail.sender,
                    name: badgeletDetail.badge.name,
                    cover: badgeletDetail.badge.image_url,
                    link: genShareLink()
                })
            }

            if (presendId) {
                const presendDetail = await solas.queryPresendDetail({ id: Number(presendId), auth_token: user.authToken || '' })
                const sender = await solas.getProfile({ id: presendDetail.sender_id })

                setInfo({
                    name: presendDetail.badge.name,
                    cover: presendDetail.badge.image_url,
                    limit: presendDetail.badgelets.length + presendDetail.counter,
                    expires: presendDetail.expires_at,
                    link: genShareLink(presendDetail.code || undefined),
                    sender: sender as ProfileSimple
                })
            }

            if (inviteId && groupId) {
                const inviteDetail = await solas.queryInviteDetail({ invite_id: Number(inviteId), group_id: Number(groupId)})
                if (!inviteDetail) return

                const receiver = await solas.getProfile({id: inviteDetail?.receiver_id})
                if (!receiver) return

                const group = await solas.queryGroupDetail(Number(groupId))
                if (!group) return

                setInfo({
                    sender: group as any,
                    name: group.username,
                    cover: group.image_url || defaultAvatar(group.id) ,
                    link: genShareLink(),
                })
            }

            if (nftpassletId) {
                const badgeletDetail = await solas.queryBadgeletDetail({ id: Number(nftpassletId) })

                setInfo({
                    sender: badgeletDetail.sender,
                    name: badgeletDetail.badge.name,
                    cover: badgeletDetail.badge.image_url,
                    link: genShareLink()
                })
            }

            if (pointId && pointitemId) {
                const point = await solas.queryPointDetail({ id: Number(pointId) })
                const pointItem = await solas.queryPointItemDetail({ id: Number(pointitemId) })

                setInfo({
                    sender: point.sender,
                    name: point.title,
                    cover: point.image_url,
                    link: genShareLink(),
                    points: pointItem.value
                })
            }
        }

        fetchInfo()
    }, [user.authToken])

    const genShareLink = (presendCode?:string) => {
        const base = `${window.location.protocol}//${window.location.host}`
        let path = ''

        if (badgeletId) {
            path = `${base}/badgelet/${badgeletId}`
        }

        if (presendId) {
            path = `${base}/presend/${presendId}`
            if (presendCode) {
                path = path + '_' + presendCode
            }
        }

        if (inviteId && groupId) {
            path = `${base}/invite/${groupId}/${inviteId}`
        }

        if (nftpassletId) {
            path = `${base}/nftpasslet/${nftpassletId}`
        }

        if (pointId && pointitemId) {
            path = `${base}/pointitem/${pointitemId}`
        }

        return path
    }

    useEffect(() => {
        const shareUrl = genShareLink()
        const text = lang['IssueFinish_share']
            .replace('#1',  user.domain!)
            .replace('#2', info?.name || '')
            .replace('#3', shareUrl)
        setLinkContent(text)
    }, [info])

    const handleCopy = () => {
        copy(linkContent)
        showToast('Copied')
    }


    return (
        <Layout>
            <div className='send-badge-success' style={{minHeight: `${heightWithoutNav}px`}}>
                <div className='center-box header'>
                    <PageBack backBtnLabel={ lang['Page_Back_Done'] }
                              title={ lang['IssueFinish_Title'] }
                              to={user.userName ? `/profile/${user.userName}` : '/'} />
                </div>
                <div className='background'>
                    <div className='ball1'></div>
                    <div className='ball2'></div>
                    <div className='ball3'></div>
                </div>
                <div className='cards'>
                    <div className={'title'}>{lang['IssueFinish_Share_By_Qrcode']}</div>
                    {!!info && <ShareQrcode {...info}/> }
                </div>
                <div className='cards'>
                    <div className={'title'}>{lang['IssueFinish_Share_By_Link']}</div>
                    { !!info && <div className={'link-content'}>
                        { linkContent }
                       <div className={'copy-link-btn'} onClick={handleCopy}>
                           <i className='icon-copy'></i>
                           <span>{ lang['IssueFinish_CopyLink'] }</span>
                       </div>
                    </div>}
                </div>
            </div>
        </Layout>
    )
}

export default IssueSuccessPage
