import LangContext from '../../provider/LangProvider/LangContext'
import UserContext from '../../provider/UserProvider/UserContext'
import DialogsContext from '../../provider/DialogProvider/DialogsContext'
import { useContext, useEffect, useState } from 'react'
import { Presend, ProfileSimple } from '../../../service/solas'
import DetailWrapper from './atoms/DetailWrapper'
import usePicture from '../../../hooks/pictrue'
import DetailHeader from './atoms/DetailHeader'
import DetailCover from './atoms/DetailCover'
import DetailName from './atoms/DetailName'
import DetailDes from './atoms/DetailDes'
import DetailArea from './atoms/DetailArea'
import AppButton, { BTN_KIND } from '../../base/AppButton'
import BtnGroup from '../../base/BtnGroup/BtnGroup'
import solas, { Profile } from '../../../service/solas'
import useEvent, { EVENT } from '../../../hooks/globalEvent'
import copy from '../../../utils/copy'
import DetailReceivers from './atoms/DetailReceivers'
import DetailScrollBox from './atoms/DetailScrollBox'
import ReasonText from '../../base/ReasonText/ReasonText'


export interface DetailPresendProps {
    presend: Presend,
    handleClose: () => void
}

function DetailPresend (props: DetailPresendProps ) {
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const { openConnectWalletDialog, showLoading, showToast } = useContext(DialogsContext)
    const { defaultAvatar } = usePicture()
    const [_, emitUpdate] = useEvent(EVENT.badgeletListUpdate)
    const [sender, setSender] = useState<Profile | null>(null)
    const [receivers, setReceivers] = useState<ProfileSimple[]>([])
    const [acceptableAmount, setAcceptableAmount] = useState<number>(0)

    useEffect(() => {
        async function getOwnerProfile () {
            const profile = await solas.getProfile({ id: props.presend.sender_id })
            setSender(profile)
        }

        async function getReceiver () {
            const presendWithBadgelets = await solas.queryPresendDetail({
                id: props.presend.id,
                auth_token: user.authToken || ''
            })
            const receiver = presendWithBadgelets.badgelets.map(item => {
                return item.receiver
            })

            setReceivers(receiver)
            setAcceptableAmount(Math.min(20, receiver.length + props.presend.counter))
        }

        getOwnerProfile()
        getReceiver()
    },[])

    const loginUserIsSender = user.id === sender?.id
    const canAccept = props.presend.counter > 0

    const LoginBtn = <AppButton
        onClick={ () => { openConnectWalletDialog() } }
        kind={ BTN_KIND.primary }>
        { lang['BadgeDialog_Btn_Login'] }
    </AppButton>

    const handleCopy = () => {
        const link = `https://${window.location.host}/presend/${props.presend.id}_${props.presend.code}`
        copy(link)
        showToast('Copyed')
    }

    const handleAccept= async () => {
        const unload = showLoading()
        try {
            const accept = await solas.acceptPresend({
                id: props.presend.id,
                code: props.presend.code || '',
                auth_token: user.authToken || ''
            })
            unload()
            emitUpdate(props.presend)
            showToast('Accept success')
            props.handleClose()
        } catch (e: any) {
            unload()
            console.log('[handleAccept]: ', e)
            showToast(e.message || 'Accept fail')
        }
    }

    const ActionBtns =  <>
        { loginUserIsSender && canAccept
            && <AppButton onClick={ () => { handleCopy() } }>
                { lang['IssueFinish_CopyLink'] }</AppButton>
        }
        <AppButton
            onClick={ () => { handleAccept() } }
            kind={ BTN_KIND.primary }>
            { canAccept ? lang['BadgeDialog_Btn_Accept'] : lang['BadgeDialog_Btn_None_Left'] }
        </AppButton>
    </>

    return (
        <DetailWrapper>
            <DetailHeader onClose={ props.handleClose }/>

            <DetailCover src={ props.presend.badge.image_url }></DetailCover>
            <DetailName> { props.presend.badge.name } </DetailName>
            <DetailDes> <ReasonText text={ props.presend.message } /> </DetailDes>

            <DetailScrollBox>
                { sender && <DetailArea
                    onClose={ props.handleClose }
                    title={ lang['BadgeDialog_Label_Creator'] }
                    content={ sender.domain! }
                    navigate={ `/profile/${sender.domain?.split('.')[0]}` }
                    image={ sender.image_url || defaultAvatar(sender.id) } /> }

                <DetailReceivers
                    length={ acceptableAmount }
                    placeholder={ true }
                    receivers={ receivers }
                    title={ lang['BadgeDialog_Label_Issuees']} />

                <DetailArea
                    title={ lang['BadgeDialog_Label_Token'] }
                    content={ props.presend.badge.domain } />
            </DetailScrollBox>

            <BtnGroup>
                { user.id ? ActionBtns : LoginBtn }
            </BtnGroup>
        </DetailWrapper>
    )
}

export default DetailPresend
