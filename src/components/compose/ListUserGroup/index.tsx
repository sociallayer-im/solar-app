import {useContext, useEffect} from 'react'
import CardGroup from '../../base/CardGroup'
import solas, { Profile, Group } from '../../../service/solas'
import ListWrapper from '../../base/ListWrapper'
import Empty from '../../base/Empty'
import LangContext from '../../provider/LangProvider/LangContext'
import useScrollToLoad from '../../../hooks/scrollToLoad'
import CardCreateGroup from '../../base/CardCreateGroup'
import UserContext from '../../provider/UserProvider/UserContext'

interface ListUserGroupProps {
    profile: Profile
}

function ListUserGroup (props: ListUserGroupProps) {
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const getGroup = async (page: number) => {
        if (page > 1) return []

        return await solas.queryUserGroup({ profile_id: props.profile.id })
    }

    const { isEmpty, list, ref, refresh } = useScrollToLoad ({ queryFunction: getGroup })

    useEffect(() => {
        refresh()
    }, [props.profile])

    const isProfileOwner = user.id === props.profile.id

    return (
        <ListWrapper>
            { isEmpty && !isProfileOwner && <Empty text={lang['Empty_No_Group']} /> }
            { isProfileOwner && <CardCreateGroup /> }
            {
                list.map((item, index) => <CardGroup
                    profile={ props.profile }
                    group={ item }
                    key={ item.id.toString() } />)
            }
            <div ref={ ref }></div>
        </ListWrapper>)
}

export default ListUserGroup
