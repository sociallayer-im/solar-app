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

    useEffect(() => {
        getOwner()
        listWrapperRef.current?.refresh()
    }, [props.group])

    const getOwner = async () => {
        const owner = await solas.getProfile({ id: props.group.group_owner_id! })
        setOwner(owner)
    }

    const getMember = async (page: number) => {
        if (page > 1) return []

        const members = await solas.getGroupMembers({
            group_id: props.group.id
        })
        setMembers(members)
        return members
    }

    const PreEnhancerWrapper = styled('div', () => {
        return {
            display: 'flex',
            flexFlow: 'row nowrap'
        }
    })

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

    return <div className='list-group-member'>
        <ListTitle
            title={ lang['Group_detail_tabs_member'] }
            uint={ lang['Group_detail_tabs_member'] }
            count={ members.length }
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
