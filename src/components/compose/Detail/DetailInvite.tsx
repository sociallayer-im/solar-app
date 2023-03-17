import LangContext from '../../provider/LangProvider/LangContext'
import UserContext from '../../provider/UserProvider/UserContext'
import DialogsContext from '../../provider/DialogProvider/DialogsContext'
import { useContext, useEffect, useState } from 'react'
import DetailWrapper from './atoms/DetailWrapper'
import usePicture from '../../../hooks/pictrue'
import DetailHeader from './atoms/DetailHeader'
import DetailCover from './atoms/DetailCover'
import DetailName from './atoms/DetailName'
import DetailDes from './atoms/DetailDes'
import DetailArea from './atoms/DetailArea'
import AppButton, { BTN_KIND } from '../../base/AppButton'
import BtnGroup from '../../base/BtnGroup/BtnGroup'
import solas, {Group, Invite, Profile } from '../../../service/solas'
import useEvent, { EVENT } from '../../../hooks/globalEvent'
import ReasonText from '../../base/ReasonText/ReasonText'


export interface DetailInviteProps {
    invite: Invite,
    handleClose: () => any
}

function DetailInvite(props: DetailInviteProps ) {
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const { openConnectWalletDialog, showLoading, showToast } = useContext(DialogsContext)
    const { defaultAvatar } = usePicture()
    const [_1, emitUpdate] = useEvent(EVENT.badgeletListUpdate)
    const [invite, setInvite] = useState(props.invite)
    const [group, setGroup,] = useState<Group | null>(null)
    const [receiver, setReceiver,] = useState<Profile | null>(null)
    const isReceiver= user.id === props.invite.receiver_id

    useEffect(() => {
        async function getInfo () {
            const groupInfo = await solas.queryGroupDetail(props.invite.group_id)
            setGroup(groupInfo)

            const receiver = await solas.getProfile({ id: props.invite.receiver_id})
            setReceiver(receiver)
        }
        getInfo()
    }, [])

    const handleAccept = async () => {
        const unload = showLoading()
        try {
            const accept = await solas.acceptInvite({
                group_invite_id: invite.id,
                auth_token: user.authToken || ''
            })

            unload()
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
            const reject = await solas.cancelInvite({
                group_invite_id: invite.id,
                auth_token: user.authToken || ''
            })

            unload()
            props.handleClose()
            showToast('Reject success')
        } catch (e: any) {
            unload()
            console.log('[handleReject]: ', e)
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
            <DetailHeader onClose={ props.handleClose }/>

            <DetailCover src={ group?.image_url || defaultAvatar(props.invite.group_id)}></DetailCover>
            <DetailName> { group?.username } </DetailName>
            <DetailDes> <ReasonText text={props.invite.message} /></DetailDes>

            <DetailArea
                onClose={ props.handleClose }
                title={ lang['BadgeDialog_Label_Creator'] }
                content={ group?.domain || '' }
                navigate={ `/group/${group?.domain?.split('.')[0]}` }
                image={ group?.image_url || defaultAvatar(props.invite.group_id) } />

            <DetailArea
                onClose={ props.handleClose }
                title={ lang['BadgeDialog_Label_Issuees'] }
                content={ receiver?.domain! }
                navigate={ `/profile/${receiver?.username}` }
                image={ receiver?.image_url || defaultAvatar(receiver?.id) } />

            <BtnGroup>
                { !user.id && LoginBtn }

                { !!user.id
                    && user.id === invite.receiver_id
                    && invite.status === 'new'
                    && ActionBtns }
            </BtnGroup>
        </DetailWrapper>
    )
}

export default DetailInvite
