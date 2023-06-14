import LangContext from '../../provider/LangProvider/LangContext'
import UserContext from '../../provider/UserProvider/UserContext'
import DialogsContext from '../../provider/DialogProvider/DialogsContext'
import {useContext, useEffect, useState} from 'react'
import DetailWrapper from './atoms/DetailWrapper/DetailWrapper'
import usePicture from '../../../hooks/pictrue'
import DetailHeader from './atoms/DetailHeader'
import DetailBadgeletMenu from './atoms/DetalBadgeletMenu'
import DetailBadgeletPrivateMark from './atoms/DetailBadgeletPriviateMark'
import DetailCover from './atoms/DetailCover'
import DetailName from './atoms/DetailName'
import DetailDes from './atoms/DetailDes/DetailDes'
import DetailArea from './atoms/DetailArea'
import AppButton, {BTN_KIND} from '../../base/AppButton/AppButton'
import BtnGroup from '../../base/BtnGroup/BtnGroup'
import solas, {NftPasslet} from '../../../service/solas'
import useEvent, {EVENT} from '../../../hooks/globalEvent'
import ReasonText from '../../base/ReasonText/ReasonText'
import DetailScrollBox from './atoms/DetailScrollBox/DetailScrollBox'
import DetailCreator from './atoms/DetailCreator/DetailCreator'
import useTime from '../../../hooks/formatTime'
import {useNavigate} from 'react-router-dom'
import QRcode from "../../base/QRcode";
import {useStyletron} from "baseui";


export interface DetailNftpassletProps {
    nftpasslet: NftPasslet,
    handleClose: () => void
}

const NftpassQrcode = (props: { nftpasslet: NftPasslet }) => {
    const [css] = useStyletron()

    const wrapper = {
        width: '220px',
        height: '238px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '62px auto 62px auto',
    }
    const title = {
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: '28px',
        textAlign: 'center',
        color: '#272928',
        marginBottom: '8px',
    }

    const qrcodeWrapper = {
        width: '192px',
        height: '192px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff'
    }

    const text = window.location.host + '/nftpasslet/' + props.nftpasslet.id + ''

    return <div className={css(wrapper as any)}>
        <div className={css(title as any)}>Scan the QR Code</div>
        <div className={css(qrcodeWrapper as any)}>
            <QRcode size={[160, 160]} text={text}/>
        </div>
    </div>
}

function DetailNftpasslet(props: DetailNftpassletProps) {
    const {lang} = useContext(LangContext)
    const {user} = useContext(UserContext)
    const {openConnectWalletDialog, showLoading, showToast} = useContext(DialogsContext)
    const {defaultAvatar} = usePicture()
    const [_1, emitUpdate] = useEvent(EVENT.badgeletListUpdate)
    const [needUpdate, _2] = useEvent(EVENT.badgeletDetailUpdate)
    const [nftpasslet, setNftpasslet] = useState(props.nftpasslet)
    const isOwner = user.id === props.nftpasslet.receiver.id
    const formatTime = useTime()
    const navigate = useNavigate()
    const [showQrcode, setShowQrcode] = useState(false)

    const upDateBadgelet = async () => {
        const newBadgelet = await solas.queryBadgeletDetail({id: props.nftpasslet.id})
        setNftpasslet(newBadgelet)
    }

    useEffect(() => {
        if (needUpdate) {
            upDateBadgelet()
        }
    }, [needUpdate])

    const handleAccept = async () => {
        const unload = showLoading()
        try {
            const accept = await solas.acceptBadgelet({
                badgelet_id: nftpasslet.id,
                auth_token: user.authToken || ''
            })

            unload()
            emitUpdate(nftpasslet)
            props.handleClose()
            showToast('Accept success')
            navigate(`/profile/${user.userName}`)
        } catch (e: any) {
            unload()
            console.log('[handleAccept]: ', e)
            showToast(e.message || 'Accept fail')
        }
    }

    const handleReject = async () => {
        const unload = showLoading()
        try {
            const reject = await solas.rejectBadgelet({
                badgelet_id: nftpasslet.id,
                auth_token: user.authToken || ''
            })

            unload()
            emitUpdate(nftpasslet)
            props.handleClose()
            showToast('rejected')
        } catch (e: any) {
            unload()
            console.log('[handleAccept]: ', e)
            showToast(e.message || 'Reject fail')
        }
    }

    const LoginBtn = <AppButton
        special
        onClick={() => {
            openConnectWalletDialog()
        }}
        kind={BTN_KIND.primary}>
        {lang['BadgeDialog_Btn_Login']}
    </AppButton>

    const ActionBtns = <>
        <AppButton
            special
            kind={BTN_KIND.primary}
            onClick={() => {
                handleAccept()
            }}>
            {lang['BadgeDialog_Btn_Accept']}
        </AppButton>
        <AppButton onClick={() => {
            handleReject()
        }}>
            {lang['BadgeDialog_Btn_Reject']}
        </AppButton>
    </>

    const swiperMaxHeight = window.innerHeight - 320
    return (
        <DetailWrapper>
            <DetailHeader
                title={lang['NFT_Detail_title']}
                slotLeft={nftpasslet.hide && <DetailBadgeletPrivateMark/>}
                onClose={props.handleClose}/>

            <DetailCover src={nftpasslet.badge.image_url}></DetailCover>
            <DetailName> {nftpasslet.badge.name} </DetailName>

            {!showQrcode
                && <DetailCreator isGroup={!!nftpasslet.badge.group}
                                  profile={nftpasslet.badge.group || nftpasslet.sender}/>
            }

            {
                !showQrcode ? <>
                        <DetailScrollBox style={{maxHeight: swiperMaxHeight - 60 + 'px', marginLeft: 0}}>
                            {
                                !!nftpasslet.content &&
                                <DetailDes title={lang['NFT_Detail_title']}>
                                    <ReasonText text={nftpasslet.content}></ReasonText>
                                </DetailDes>
                            }

                            <DetailArea
                                onClose={props.handleClose}
                                title={lang['BadgeDialog_Label_Issuees']}
                                content={nftpasslet.receiver.domain
                                    ? nftpasslet.receiver.domain.split('.')[0]
                                    : ''
                                }
                                navigate={nftpasslet.receiver.domain
                                    ? `/profile/${nftpasslet.receiver.domain?.split('.')[0]}`
                                    : '#'}
                                image={nftpasslet.receiver.image_url || defaultAvatar(nftpasslet.receiver.id)}/>

                            <DetailArea
                                title={lang['BadgeDialog_Label_Token']}
                                content={nftpasslet.domain}
                                link={nftpasslet.chain_data ? `https://moonscan.io/tx/${nftpasslet.chain_data}` : undefined}/>

                            <DetailArea
                                title={lang['BadgeDialog_Label_Creat_Time']}
                                content={formatTime(nftpasslet.created_at)}/>

                        </DetailScrollBox>
                        <BtnGroup>
                            {!user.domain && LoginBtn}

                            {!!user.domain
                                && user.id === nftpasslet.receiver.id
                                && nftpasslet.status === 'pending'
                                && ActionBtns}

                            {!!user.domain
                                && user.id === nftpasslet.receiver.id
                                && nftpasslet.status === 'accepted'
                                && <AppButton
                                    special
                                    kind={BTN_KIND.primary}
                                    onClick={() => {
                                        setShowQrcode(true)
                                    }}>
                                    { lang['NFT_Detail_use'] }
                                </AppButton>
                            }
                        </BtnGroup>
                    </>
                    : <>
                        <NftpassQrcode nftpasslet={props.nftpasslet} />
                        <BtnGroup>
                            <AppButton
                                kind={'secondary'}
                                onClick={() => {
                                    setShowQrcode(false)
                                }}>
                                {'Close'}
                            </AppButton>
                        </BtnGroup>
                    </>
            }
        </DetailWrapper>
    )
}

export default DetailNftpasslet
