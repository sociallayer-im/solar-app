import { useState, useContext, useEffect } from 'react'
import solas, {leaveGroup, Profile} from '../../../service/solas'
import './GroupPanel.less'
import usePicture from '../../../hooks/pictrue'
import LangContext from '../../provider/LangProvider/LangContext'
import UserContext from '../../provider/UserProvider/UserContext'
import DialogsContext from '../../provider/DialogProvider/DialogsContext'
import useEvent, { EVENT } from '../../../hooks/globalEvent'
import DialogFollowInfo from '../Dialog/DialogFollowInfo/DialogFollowInfo'
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
    const { openDialog, showAvatar, showLoading, showToast } = useContext(DialogsContext)
    const [newProfile, _] = useEvent(EVENT.groupUpdate)
    const [group, setGroup] = useState(props.group)
    const [showUnFollowBtn, setShowUnFollowBtn] = useState(false)

    const checkFollow  = async () => {
        const follower = await solas.getFollowers(props.group.id)
        const isFollower = follower.find(item => {
            return item.id === user.id
        })

        setShowUnFollowBtn(!!isFollower)
        return !!isFollower
    }

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
            setShowUnFollowBtn(false)
            return
        }
        checkFollow()
    }, [user.id])


    const showFollowInfo = () => {
        openDialog({
            size:['100%', '100%'],
            content: (close: any) => <DialogFollowInfo title={props.group.domain!} profile={ group } handleClose={close} />
        })
    }

    const handleUnJoin = async () => {
        const unload = showLoading()
        try {
            const res = await solas.leaveGroup({
                group_id: props.group.id,
                auth_token: user.authToken || '',
                profile_id: user.id!
            })
            unload()
            setShowUnFollowBtn(false)
        } catch (e: any) {
            unload()
            console.log('[handleUnJoin]: ', e)
            showToast(e.message || 'Unjoin fail')
        }
    }

    const showAvatarDialog = () => {
        if (props.group.group_owner_id === user.id) {
            showAvatar(group)
        }
    }


    return (
        <div className='profile-panel'>
            <div className='left-size'>
                <div className='avatar' onClick={ showAvatarDialog }>
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
                        content={ ({ close }) => <MenuItem onClick={ () => { handleUnJoin() } }>{ lang['Relation_Ship_Action_Leave'] }</MenuItem> }>
                        <div>
                            <AppButton size={ BTN_SIZE.compact }>
                                { lang['Relation_Ship_Action_Joined'] }
                            </AppButton>
                        </div>
                    </StatefulPopover>
                }
            </div>
        </div>
    )
}

export default GroupPanel
