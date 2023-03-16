import {useContext, useEffect, useState} from 'react'
import CardInvite from '../../base/CardInvite'
import solas, { Profile, Invite } from '../../../service/solas'
import ListWrapper from '../../base/ListWrapper'
import Empty from '../../base/Empty'
import LangContext from '../../provider/LangProvider/LangContext'
import useScrollToLoad from '../../../hooks/scrollToLoad'
import useEvent, { EVENT } from '../../../hooks/globalEvent'
import UserContext from '../../provider/UserProvider/UserContext'
import {sortBy} from "lodash";

interface ListUserBadgeletProps {
    group: Profile
}

function ListGroupInvite (props: ListUserBadgeletProps) {
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const getInvite = async (page: number) => {
        return await solas.queryGroupInvites({
            group_id: props.group.id,
            page })
    }
    const { isEmpty, list, ref, refresh } = useScrollToLoad ({ queryFunction: getInvite })

    useEffect(() => {
        refresh()
    }, [props.group])

    return (
        <ListWrapper>
            {   isEmpty ?
                <Empty text={ lang['Empty_No_Invite'] } />
                : false
            }
            {   list.length ?
                list.map((item, index) => {
                    return <CardInvite
                        invite={ item }
                        key={ index.toString() }
                        groupName={ props.group.username || '' }
                        groupCover={ props.group.image_url || ''}/>
                })
                : false
            }
            <div ref={ref}></div>
        </ListWrapper>)
}

export default ListGroupInvite
