import { useContext, useEffect } from 'react'
import CardInvite from '../../base/Cards/CardInvite/CardInvite'
import solas, { Profile, Invite } from '../../../service/solas'
import ListWrapper from '../../base/ListWrapper'
import Empty from '../../base/Empty'
import LangContext from '../../provider/LangProvider/LangContext'
import useScrollToLoad from '../../../hooks/scrollToLoad'
import HorizontalList, { HorizontalListMethods } from '../../base/HorizontalList/HorizontalList'

interface ListUserBadgeletProps {
    group: Profile
}

function ListGroupInvite (props: ListUserBadgeletProps) {
    const { lang } = useContext(LangContext)
    const getInvite = async (page: number) => {
        return await solas.queryGroupInvites({
            group_id: props.group.id,
            page })
    }
    const { isEmpty, list, ref, refresh } = useScrollToLoad ({ queryFunction: getInvite })

    useEffect(() => {
        refresh()
    }, [props.group])

    return <HorizontalList
        item={ (itemData: Invite) => <CardInvite
            invite={ itemData }
            groupCover={props.group.image_url || undefined}
            groupName={ props.group.username || ''}
        /> }
        space={ 12 }
        itemWidth={ 162 }
        itemHeight={ 184 }
        queryFunction={ getInvite }
    />
}

export default ListGroupInvite
