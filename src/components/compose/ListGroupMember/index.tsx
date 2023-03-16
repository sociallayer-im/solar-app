import {useContext, useEffect, useState} from 'react'
import CardUser from '../../base/CardUser'
import solas, { Profile } from '../../../service/solas'
import ListWrapper from '../../base/ListWrapper'
import LangContext from '../../provider/LangProvider/LangContext'
import UserContext from '../../provider/UserProvider/UserContext'


interface ListGroupMemberProps {
    group: Profile
}

function ListGroupMember (props: ListGroupMemberProps) {
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const [members, setMembers] = useState<Profile[]>([])
    const getMember = async () => {
        const members = await solas.getGroupMembers({
            group_id: props.group.id})
        setMembers(members)
    }

    useEffect(() => {
        getMember()
    }, [props.group])

    return (
        <ListWrapper>
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
