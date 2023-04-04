import { useSearchParams } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import solas, { Group, Profile, ProfileSimple } from '../../service/solas'
import Layout from '../../components/Layout/Layout'
import LangContext from '../../components/provider/LangProvider/LangContext'
import './SendSuccess.less'
import UserContext from '../../components/provider/UserProvider/UserContext'
import copy from '../../utils/copy'
import PageBack from '../../components/base/PageBack'
import SendSuccessCard, { Info } from '../../components/compose/SendSuccessCard/SendSuccessCard'
import usePicture from '../../hooks/pictrue'
import AppButton, { BTN_SIZE } from '../../components/base/AppButton/AppButton'

//AppSwiper deps
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'


function IssueSuccessPage () {
    const [searchParams, _] = useSearchParams()
    const [info, setInfo] = useState<Info | null>(null)
    const [sender, setSender] = useState<Profile| ProfileSimple | Group | null>(null)
    const [desText, setDesText] = useState('')
    const [presendCode, setPresnedCode] = useState('')
    const { lang } =  useContext(LangContext)
    const { user } =  useContext(UserContext)
    const { defaultAvatar } =  usePicture()

    // presend成功传参
    const presendId = searchParams.get('presend')

    // 颁发成功传参
    const badgeletId = searchParams.get('badgelet')

    // 邀请成功传参
    const inviteId = searchParams.get('invite')
    const groupId = searchParams.get('group')

    const issueType = inviteId
        ? 'invite'
        : presendId
            ? 'presend'
            : 'badgelet'


    useEffect(() => {
        async function fetchInfo () {
            if (badgeletId) {
                const badgeletDetail = await solas.queryBadgeletDetail({ id: Number(badgeletId) })

                setSender(badgeletDetail.sender)
                setInfo({
                    content: badgeletDetail.content,
                    name: badgeletDetail.badge.name,
                    cover: badgeletDetail.badge.image_url,
                })
            }

            if (presendId) {
                const presendDetail = await solas.queryPresendDetail({ id: Number(presendId), auth_token: user.authToken || '' })
                const sender = await solas.getProfile({ id: presendDetail.sender_id })


                if (presendDetail.code) {
                    setPresnedCode(presendDetail.code)
                }
                setSender(sender)
                setInfo({
                    content: presendDetail.message,
                    name: presendDetail.badge.name,
                    cover: presendDetail.badge.image_url,
                })
            }

            if (inviteId && groupId) {
                const inviteDetail = await solas.queryInviteDetail({ invite_id: Number(inviteId), group_id: Number(groupId)})
                if (!inviteDetail) return

                const receiver = await solas.getProfile({id: inviteDetail?.receiver_id})
                if (!receiver) return

                const group = await solas.queryGroupDetail(Number(groupId))
                if (!group) return


                setSender(group)
                setInfo({
                    content: inviteDetail.message,
                    name: group.username,
                    cover: group.image_url || defaultAvatar(group.id) ,
                })
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
            if (presendCode) {
                path = path + '_' + presendCode
            }
        }

        if (inviteId && groupId) {
            path = `${base}/invite/${groupId}/${inviteId}`
        }

        return path
    }

    const handleCopy = () => {
        const shareUrl = genShareLink()
        const link = lang['IssueFinish_share']
            .replace('#1',  user.domain!)
            .replace('#2', info?.name || '')
            .replace('#3', shareUrl)

        copy(link)
    }

    return (
        <Layout>
            <div className='send-success'>
                <div className='center-box header'>
                    <PageBack title={ lang['IssueFinish_Title'] } to={`/profile/${user.userName}`} />
                </div>
                <div className='background'>
                    <div className='ball1'></div>
                    <div className='ball2'></div>
                    <div className='ball3'></div>
                </div>
                <div className='cards'>
                    { !!info &&  !!sender &&
                        <Swiper
                            onSlideChange={(swiper) => {
                                console.log(swiper.activeIndex)
                            }}
                            spaceBetween={ 16 }
                            freeMode
                            centeredSlides
                            slidesPerView={'auto'} >
                            <SwiperSlide style={{width: '335px', height: '456px'}}>
                                <SendSuccessCard
                                    shareLink={ genShareLink() }
                                    type={ issueType }
                                    info={ info }
                                    sender={sender} />
                            </SwiperSlide>
                        </Swiper>
                    }
                </div>
                <div className='center-box actions'>
                    <div className='text1'>{ lang['IssueFinish_Screenshot'] }</div>
                    <div className='text2'>{ lang['IssueFinish_Screenshot_Or'] }</div>
                    <AppButton inline
                               size={ BTN_SIZE.compact }
                               style={{background: '#fff'}}
                               onClick={ handleCopy }>
                        <i className='icon-copy'></i>
                        <span>{ lang['IssueFinish_CopyLink'] }</span>
                    </AppButton>
                </div>
            </div>
        </Layout>
    )
}

export default IssueSuccessPage
