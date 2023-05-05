import React, {useContext, useEffect, useState} from 'react'
import CardUser from '../../base/Cards/CardUser/CardUser'
import solas, { Profile } from '../../../service/solas'
import ListWrapper from '../../base/ListWrapper'
import LangContext from '../../provider/LangProvider/LangContext'
import UserContext from '../../provider/UserProvider/UserContext'
import { styled } from 'baseui'
import { useNavigate } from 'react-router-dom'
import ListTitle from '../../base/ListTitle/ListTitle'
import HorizontalList, { HorizontalListMethods}  from '../../base/HorizontalList/HorizontalList'
import CardMember from '../../base/Cards/CardMember/CardMember'
import './ListGroupMember.less'
import CardInviteMember from '../../base/Cards/CardInviteMember/CardInviteMember'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import MenuItem from "../../base/MenuItem";
import DialogsContext from "../../provider/DialogProvider/DialogsContext";
import { Overflow } from 'baseui/icon'
import DialogManageMember from '../../base/Dialog/DialogManageMember/DialogManageMember'


interface ListGroupMemberProps {
    group: Profile
}

function ListGroupMember (props: ListGroupMemberProps) {
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [members, setMembers] = useState<Profile[]>([])
    const [owner, setOwner] = useState<Profile | null>(null)
    const listWrapperRef = React.createRef<HorizontalListMethods>()
    const { showToast, showLoading, openConfirmDialog, openDialog } = useContext(DialogsContext)
    const [currUserJoinedGroup, setCurrUserJoinedGroup] = useState(false)

    useEffect(() => {
        getOwner()
        listWrapperRef.current?.refresh()
    }, [props.group, user.id])

    const getOwner = async () => {
        const owner = await solas.getProfile({ id: props.group.group_owner_id! })
        setOwner(owner)
        await checkUserJoinedGroup()
    }

    const checkUserJoinedGroup = async () => {
        if (!user.id) return
        const userJoinedGroups = await solas.queryGroupsUserJoined({
            profile_id: user.id!,
        })
        if (userJoinedGroups && userJoinedGroups.length) {
            const target = userJoinedGroups.find((group) => {
                return group.id === props.group.id
            })
            setCurrUserJoinedGroup(!!target)
        }
    }

    const getMember = async (page: number) => {
        if (page > 1) return []

        const members = await solas.getGroupMembers({
            group_id: props.group.id
        })
        setMembers(members)
        return members
    }

    const leaveGroup = async () => {
        const unload = showLoading()
        try {
            const res = await solas.leaveGroup({
                group_id: props.group.id,
                auth_token: user.authToken || '',
                profile_id: user.id!
            })
            unload()
            showToast('You have left the group')
        } catch (e: any) {
            unload()
            console.log('[handleUnJoin]: ', e)
            showToast(e.message || 'Unjoin fail')
        }
    }

    const showLeaveGroupConfirm = () => {
        openConfirmDialog({
            confirmText: 'Leave',
            cancelText: 'Cancel',
            confirmBtnColor: '#F64F4F!important',
            confirmTextColor: '#fff!important',
            title: 'Are you sure to leave the group?',
            content: '',
            onConfirm: (close: any) => { close(); leaveGroup() }
        })
    }

    const PreEnhancerWrapper = styled('div', () => {
        return {
            display: 'flex',
            flexFlow: 'row nowrap'
        }
    })

    const showMemberManageDialog = () => {
        const dialog = openDialog({
            content: (close: any) => <DialogManageMember
                groupId={props.group.id}
                handleClose={close}/>,
            size: ['100%', '100%']
        })
    }

    const PreEnhancer = () => {
        return <PreEnhancerWrapper>
            {
                user.id === props.group.group_owner_id && <CardInviteMember groupId={props.group.id} />
            }
            {
                !!owner && <CardMember isOwner profile={owner}/>
            }
        </PreEnhancerWrapper>
    }

    const MemberAction = <StatefulPopover
        placement={ PLACEMENT.bottom }
        popoverMargin={ 0 }
        content={ ({ close }) => <MenuItem onClick={ () => { showLeaveGroupConfirm(); close()} }>{ lang['Relation_Ship_Action_Leave'] }</MenuItem> }>
        <div className='member-list-joined-label'>Joined</div>
    </StatefulPopover>

    const OwnerAction = <div className='member-manage-btn' onClick={ showMemberManageDialog }><Overflow size={18}/></div>

    const Action = props.group.group_owner_id === user.id
        ? OwnerAction
        : currUserJoinedGroup
            ? MemberAction
            : <div></div>

    return <div className='list-group-member'>
        <ListTitle
            title={ lang['Group_detail_tabs_member'] }
            uint={ lang['Group_detail_tabs_member'] }
            count={ members.length }
            action={ Action }
        />
        <HorizontalList
            item={(data: Profile) => <CardMember profile={data} /> }
            space={12}
            itemWidth={ 100 }
            itemHeight={ 165 }
            onRef={ listWrapperRef }
            queryFunction={ getMember }
            preEnhancer={ () => <PreEnhancer /> }
        />
    </div>
}

export default ListGroupMember
