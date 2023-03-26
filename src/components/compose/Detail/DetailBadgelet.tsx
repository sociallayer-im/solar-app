import LangContext from '../../provider/LangProvider/LangContext'
import UserContext from '../../provider/UserProvider/UserContext'
import DialogsContext from '../../provider/DialogProvider/DialogsContext'
import {useContext, useEffect, useState} from 'react'
import DetailWrapper from './atoms/DetailWrapper'
import usePicture from '../../../hooks/pictrue'
import DetailHeader from './atoms/DetailHeader'
import DetailBadgeletMenu from './atoms/DetalBadgeletMenu'
import DetailBadgeletPrivateMark from './atoms/DetailBadgeletPriviateMark'
import DetailCover from './atoms/DetailCover'
import DetailName from './atoms/DetailName'
import DetailDes from './atoms/DetailDes'
import DetailArea from './atoms/DetailArea'
import AppButton, { BTN_KIND } from '../../base/AppButton/AppButton'
import BtnGroup from '../../base/BtnGroup/BtnGroup'
import solas, { Badgelet, ProfileSimple } from '../../../service/solas'
import useEvent, { EVENT } from '../../../hooks/globalEvent'
import ReasonText from '../../base/ReasonText/ReasonText'
import DetailScrollBox from './atoms/DetailScrollBox'


export interface DetailBadgeletProps {
    badgelet: Badgelet,
    handleClose: () => void
}

function DetailBadgelet(props: DetailBadgeletProps ) {
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const { openConnectWalletDialog, showLoading, showToast } = useContext(DialogsContext)
    const { defaultAvatar } = usePicture()
    const [_1, emitUpdate] = useEvent(EVENT.badgeletListUpdate)
    const [needUpdate, _2] = useEvent(EVENT.badgeletDetailUpdate)
    const [badgelet, setBadgelet] = useState(props.badgelet)
    const isBadgeletOwner = user.id === props.badgelet.receiver.id

    const upDateBadgelet = async () => {
        const newBadgelet = await solas.queryBadgeletDetail({ id: props.badgelet.id })
        setBadgelet(newBadgelet)
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
                badgelet_id: badgelet.id,
                auth_token: user.authToken || ''
            })

            unload()
            emitUpdate(badgelet)
            props.handleClose()
            showToast('Accept success')
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
                badgelet_id: badgelet.id,
                auth_token: user.authToken || ''
            })

            unload()
            emitUpdate(badgelet)
            props.handleClose()
            showToast('Reject success')
        } catch (e: any) {
            unload()
            console.log('[handleAccept]: ', e)
            showToast(e.message || 'Reject fail')
        }
    }

    const LoginBtn = <AppButton
        onClick={ () => { openConnectWalletDialog() } }
        kind={ BTN_KIND.primary }>
        { lang['BadgeDialog_Btn_Login'] }
    </AppButton>

    const ActionBtns =  <>
        <AppButton onClick={ () => { handleReject() }} >
            { lang['BadgeDialog_Btn_Reject'] }
        </AppButton>
        <AppButton
            kind={ BTN_KIND.primary }
            onClick={() => { handleAccept() }}>
            { lang['BadgeDialog_Btn_Accept'] }
        </AppButton>
    </>

    return (
        <DetailWrapper>
            <DetailHeader
                slotLeft={ badgelet.hide && <DetailBadgeletPrivateMark /> }
                slotRight={
                    badgelet.status !== 'pending' &&
                    isBadgeletOwner &&
                    <DetailBadgeletMenu badgelet={ badgelet }/>
                }
                onClose={ props.handleClose }/>

            <DetailCover src={ badgelet.badge.image_url }></DetailCover>
            <DetailName> { badgelet.badge.name } </DetailName>
            <DetailDes> <ReasonText text={badgelet.content}></ReasonText> </DetailDes>

            <DetailScrollBox>
                <DetailArea
                    onClose={ props.handleClose }
                    title={ lang['BadgeDialog_Label_Creator'] }
                    content={ badgelet.sender.domain! }
                    navigate={ `/profile/${badgelet.sender.domain?.split('.')[0]}` }
                    image={ props.badgelet.sender.image_url || defaultAvatar(props.badgelet.sender.id) } />

                <DetailArea
                    onClose={ props.handleClose }
                    title={ lang['BadgeDialog_Label_Issuees'] }
                    content={ badgelet.receiver.domain! }
                    navigate={ `/profile/${badgelet.receiver.domain?.split('.')[0]}` }
                    image={ badgelet.receiver.image_url || defaultAvatar(badgelet.receiver.id) } />

                <DetailArea
                    title={ lang['BadgeDialog_Label_Token'] }
                    content={ badgelet.domain }
                    link={ badgelet.chain_data ? `https://moonscan.io/tx/${badgelet.chain_data}` : undefined } />
            </DetailScrollBox>

            <BtnGroup>
                { !user.id && LoginBtn }

                { !!user.id
                    && user.id === badgelet.receiver.id
                    && badgelet.status === 'pending'
                    && ActionBtns }
            </BtnGroup>
        </DetailWrapper>
    )
}

export default DetailBadgelet
