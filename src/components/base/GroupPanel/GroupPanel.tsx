import { styled } from 'baseui'
import { useState, useContext, useEffect } from 'react'
import solas, { Profile }  from '../../../service/solas'
import './GroupPanel.less'
import usePicture from '../../../hooks/pictrue'
import LangContext from '../../provider/LangProvider/LangContext'
import UserContext from '../../provider/UserProvider/UserContext'
import DialogsContext from '../../provider/DialogProvider/DialogsContext'
import DialogProfileQRcode from '../DialogProfileQRcode/DialogProfileQRcode'
import useEvent, { EVENT } from '../../../hooks/globalEvent'
import DialogFollowInfo from '../DialogFollowInfo/DialogFollowInfo'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import AppButton, { BTN_KIND, BTN_SIZE } from '../AppButton'
import MenuItem from '../MenuItem'

interface GroupPanelProps {
    group: Profile
}

function GroupPanel(props: GroupPanelProps) {
    const { defaultAvatar } = usePicture()
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const { openConfirmDialog, openDialog, showAvatar, showLoading, showToast } = useContext(DialogsContext)
    const [newProfile, _] = useEvent(EVENT.profileUpdate)
    const [group, setGroup] = useState(props.group)
    const [showFollowBtn, setShowFollowBtn] = useState(false)
    const [showUnFollowBtn, setShowUnFollowBtn] = useState(false)

    useEffect(() => {
        if (newProfile && newProfile.id === group.id) {
            setGroup({...group, ...newProfile})
        }
    }, [newProfile])

    useEffect(() => {
        setGroup(props.group)
    }, [props.group])

    useEffect(() => {
        if (!user.id) {
            setShowFollowBtn(false)
            setShowUnFollowBtn(false)
            return
        }

        async function checkFollow () {
            const follower = await solas.getFollowers(props.group.id)
            const isFollower = follower.find(item => {
                return item.id === user.id
            })

            setShowFollowBtn(!isFollower && user.id !== props.group.id)
            setShowUnFollowBtn(!!isFollower)
            return !!isFollower
        }

        checkFollow()
    }, [user.id])

    const DialogContent= styled('div', () => {
        return {
            textAlign: 'center',
            fontSize: '16px',
            wordBreak: 'break-all'
        }
    })

    const isProfileOwner = () => {
        return user.id === group.id
    }

    const showFollowInfo = () => {
        openDialog({
            size:['100%', '100%'],
            content: (close: any) => <DialogFollowInfo profile={ group } handleClose={close} />
        })
    }

    const handleFollow = async () => {
        const unload = showLoading()
        try {
            const res = await solas.follow({
                target_id: props.group.id,
                auth_token: user.authToken || ''
            })
            unload()
            setShowUnFollowBtn(true)
            setShowFollowBtn(false)
        } catch (e: any) {
            unload()
            console.log('[handleFollow]: ', e)
            showToast(e.message || 'Follow fail')
        }
    }

    const handleUnFollow = async () => {
        const unload = showLoading()
        try {
            const res = await solas.unfollow({
                target_id: props.group.id,
                auth_token: user.authToken || ''
            })
            unload()
            setShowUnFollowBtn(false)
            setShowFollowBtn(true)
        } catch (e: any) {
            unload()
            console.log('[handleUnFollow]: ', e)
            showToast(e.message || 'Unfollow fail')
        }
    }


    return (
        <div className='profile-panel'>
            <div className='left-size'>
                <div className='avatar'>
                    <img src={ group.image_url || defaultAvatar(group.id) } alt=""/>
                </div>
                <div className='domain-bar'>
                    <div className='domain'>{ group.domain }</div>
                </div>
                <div className='follow' onClick={ showFollowInfo }>
                    <div><b>{ group.followers }</b> { lang['Follow_detail_followed'] } </div>
                    <div><b>{ group.following }</b> { lang['Follow_detail_following'] } </div>
                </div>
            </div>
            <div className='right-size'>
                {
                    showUnFollowBtn &&
                    <StatefulPopover
                        placement={ PLACEMENT.bottomRight }
                        popoverMargin={ 0 }
                        content={ ({ close }) => <MenuItem onClick={ () => { handleUnFollow() } }>{ lang['Relation_Ship_Action_Unfollow'] }</MenuItem> }>
                        <div>
                            <AppButton size={ BTN_SIZE.compact }>
                                { lang['Relation_Ship_Action_Followed'] }
                            </AppButton>
                        </div>
                    </StatefulPopover>
                }

                {
                    showFollowBtn &&
                    <AppButton
                        onClick={ () => { handleFollow() } }
                        kind={ BTN_KIND.primary } size={ BTN_SIZE.compact }>
                        { lang['Relation_Ship_Action_Follow'] }
                    </AppButton>
                }
            </div>
        </div>
    )
}

export default GroupPanel
