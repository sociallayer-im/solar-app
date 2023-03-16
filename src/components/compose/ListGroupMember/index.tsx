import {useContext, useEffect, useState} from 'react'
import CardUser from '../../base/CardUser'
import solas, { Profile } from '../../../service/solas'
import ListWrapper from '../../base/ListWrapper'
import LangContext from '../../provider/LangProvider/LangContext'
import UserContext from '../../provider/UserProvider/UserContext'
import { styled } from 'baseui'
import { Plus } from 'baseui/icon'


interface ListGroupMemberProps {
    group: Profile
}

function ListGroupMember (props: ListGroupMemberProps) {
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const [members, setMembers] = useState<Profile[]>([])
    const [owner, setOwner] = useState<Profile | null>(null)

    useEffect(() => {
        const getMember = async () => {
            const members = await solas.getGroupMembers({
                group_id: props.group.id})
            setMembers(members)
        }

        const getOwner = async () => {
            const owner = await solas.getProfile({ id: props.group.group_owner_id! })
            setOwner(owner)
        }
        getMember()
        getOwner()
    }, [props.group])

    const OwnerMark = styled('div', () => {
        return {
            fontSize: '14px',
            marginRight: '8px'
        }
    })

    const PlusIcon = styled('div', () => {
        return {
            width: '28px',
            height: '28px',
            marginRight: '8px',
            borderRadius: '50%',
            background: 'rgb(241, 241, 241)',
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center'
        }
    })

    const InviteBtn = () => {
        return <CardUser
            img={() => <PlusIcon><Plus /></PlusIcon>}
            content={() => <b>Invite new members</b>}
        />
    }

    return (
        <ListWrapper>
            { owner?.id === user.id && <InviteBtn /> }
            { !!owner &&  <CardUser profile={owner} endEnhancer={() => <OwnerMark>Owner</OwnerMark>}/>}
            {   members.length ?
                members.map((item, index) => {
                    return <CardUser
                        profile={ item }
                        key={ index.toString() }/>
                })
                : false
            }
        </ListWrapper>)
}

export default ListGroupMember
