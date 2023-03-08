import { useStyletron } from 'baseui'
import LangContext from '../../provider/LangProvider/LangContext'
import UserContext from '../../provider/UserProvider/UserContext'
import DialogsContext from '../../provider/DialogProvider/DialogsContext'
import {useContext, useEffect} from 'react'
import {Badgelet, rejectBadgelet} from '../../../service/solas'
import DetailWrapper from './atoms/DetailWrapper'
import usePicture from '../../../hooks/pictrue'
import DetailHeader from './atoms/DetailHeader'
import DetailBadgeletMenu from './atoms/DetalBadgeletMenu'
import DetailBadgeletPrivateMark from './atoms/DetailBadgeletPriviateMark'
import DetailCover from './atoms/DetailCover'
import DetailName from './atoms/DetailName'
import DetailDes from './atoms/DetailDes'
import DetailArea from './atoms/DetailArea'
import AppButton, { BTN_KIND } from '../../base/AppButton'
import BtnGroup from '../../base/BtnGroup/BtnGroup'
import solas from '../../../service/solas'
import useEvent, { EVENT } from '../../../hooks/globalEvent'


export interface DetailBadgeletProps {
    badgelet: Badgelet,
    handleClose: () => void
}

function DetailBadgelet(props: DetailBadgeletProps ) {
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const { openConnectWalletDialog, showLoading, showToast } = useContext(DialogsContext)
    const { defaultAvatar } = usePicture()
    const [_, emitUpdate] = useEvent(EVENT.badgeletListUpdate)

    const handleAccept = async () => {
        const unload = showLoading()
        try {
            const accept = await solas.acceptBadgelet({
                badgelet_id: props.badgelet.id,
                auth_token: user.authToken || ''
            })

            unload()
            emitUpdate(props.badgelet)
            showToast('Accept success')
            props.handleClose()
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
                badgelet_id: props.badgelet.id,
                auth_token: user.authToken || ''
            })

            unload()
            emitUpdate(props.badgelet)
            showToast('Reject success')
            props.handleClose()
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
                slotLeft={ props.badgelet.hide && <DetailBadgeletPrivateMark /> }
                slotRight={ <DetailBadgeletMenu badgelet={ props.badgelet }/>  }
                onClose={ props.handleClose }/>

            <DetailCover src={ props.badgelet.badge.image_url }></DetailCover>
            <DetailName> { props.badgelet.badge.name } </DetailName>
            <DetailDes> { props.badgelet.content } </DetailDes>

            <DetailArea
                onClose={ props.handleClose }
                title={ lang['BadgeDialog_Label_Creator'] }
                content={ props.badgelet.owner.domain! }
                navigate={ `/profile/${props.badgelet.owner.domain?.split('.')[0]}` }
                image={ props.badgelet.owner.image_url || defaultAvatar(props.badgelet.owner.id) } />

            <DetailArea
                onClose={ props.handleClose }
                title={ lang['BadgeDialog_Label_Issuees'] }
                content={ props.badgelet.receiver.domain! }
                navigate={ `/profile/${props.badgelet.receiver.domain?.split('.')[0]}` }
                image={ props.badgelet.receiver.image_url || defaultAvatar(props.badgelet.receiver.id) } />

            <DetailArea
                title={ lang['BadgeDialog_Label_Token'] }
                content={ props.badgelet.domain }
                link={ props.badgelet.chain_info ? `https://moonscan.io/tx/${props.badgelet.chain_info}` : undefined } />

            <BtnGroup>
                { !user.id && LoginBtn }

                { user.id
                    && user.id === props.badgelet.receiver.id
                    && props.badgelet.status === 'pending'
                    && ActionBtns }
            </BtnGroup>
        </DetailWrapper>
    )
}

export default DetailBadgelet
