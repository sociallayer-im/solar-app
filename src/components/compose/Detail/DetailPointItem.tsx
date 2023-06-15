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
import solas, {Badgelet, PointItem} from '../../../service/solas'
import useEvent, {EVENT} from '../../../hooks/globalEvent'
import ReasonText from '../../base/ReasonText/ReasonText'
import DetailScrollBox from './atoms/DetailScrollBox/DetailScrollBox'
import DetailCreator from './atoms/DetailCreator/DetailCreator'
import useTime from '../../../hooks/formatTime'
import {useNavigate} from 'react-router-dom'
import PointCover from "./atoms/PointCover";


export interface DetailBadgeletProps {
    pointItem: PointItem,
    handleClose: () => void
}

function DetailPointItem(props: DetailBadgeletProps) {
    const {lang} = useContext(LangContext)
    const {user} = useContext(UserContext)
    const {openConnectWalletDialog, showLoading, showToast} = useContext(DialogsContext)
    const {defaultAvatar} = usePicture()
    const [_1, emitUpdate] = useEvent(EVENT.pointItemUpdate)
    const [needUpdate, _2] = useEvent(EVENT.pointItemListUpdate)
    const [pointItem, setPointItem] = useState(props.pointItem)
    const isOwner = user.id === props.pointItem.owner.id
    const formatTime = useTime()
    const navigate = useNavigate()

    const upDateBadgelet = async () => {
        const newPointItem = await solas.queryPointItemDetail({id: props.pointItem.id})
        setPointItem(newPointItem)
    }

    useEffect(() => {
        if (needUpdate) {
            upDateBadgelet()
        }
    }, [needUpdate])

    const handleAccept = async () => {
        const unload = showLoading()
        try {
            const accept = await solas.acceptPoint({
                point_item_id: props.pointItem.id,
                auth_token: user.authToken || ''
            })

            unload()
            emitUpdate(accept)
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
            const reject = await solas.rejectPoint({
                point_item_id: props.pointItem.id,
                auth_token: user.authToken || ''
            })

            unload()
            emitUpdate(reject)
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
    console.log('props.pointItem', props.pointItem)
    return (
        <DetailWrapper>
            <DetailHeader
                title={lang['Point_Detail_Title']}
                onClose={props.handleClose}/>

            <PointCover value={props.pointItem.value} src={props.pointItem.point.image_url}/>
            <DetailName> {props.pointItem.point.title} </DetailName>
            <DetailCreator isGroup={!!props.pointItem.point.group}
                           profile={props.pointItem.point.group || props.pointItem.sender}/>


            <DetailScrollBox style={{maxHeight: swiperMaxHeight - 60 + 'px', marginLeft: 0}}>
                {
                    !!props.pointItem.point.content &&
                    <DetailDes>
                        <ReasonText text={props.pointItem.point.content}></ReasonText>
                    </DetailDes>
                }

                <DetailArea
                    title={lang['Profile_Tab_Point']}
                    content={props.pointItem.value + ''}/>

                <DetailArea
                    onClose={props.handleClose}
                    title={lang['BadgeDialog_Label_Issuees']}
                    content={props.pointItem.owner.domain
                        ? props.pointItem.owner.domain.split('.')[0]
                        : ''
                    }
                    navigate={props.pointItem.owner.domain
                        ? `/profile/${props.pointItem.owner.domain?.split('.')[0]}`
                        : '#'}
                    image={props.pointItem.owner.image_url || defaultAvatar(props.pointItem.owner.id)}/>


                <DetailArea
                    title={lang['BadgeDialog_Label_Creat_Time']}
                    content={formatTime(props.pointItem.created_at)}/>

            </DetailScrollBox>

            <BtnGroup>
                {!user.domain && LoginBtn}

                {!!user.domain
                    && user.id === props.pointItem.owner.id
                    && props.pointItem.status === 'sending'
                    && ActionBtns}
            </BtnGroup>
        </DetailWrapper>
    )
}

export default DetailPointItem
