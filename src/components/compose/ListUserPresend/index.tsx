import React, {useContext, useEffect} from 'react'
import CardPresend from '../../base/Cards/CardPresend/CardPresend'
import solas, { Profile } from '../../../service/solas'
import ListWrapper from '../../base/ListWrapper'
import Empty from '../../base/Empty'
import LangContext from '../../provider/LangProvider/LangContext'
import UserContext from '../../provider/UserProvider/UserContext'
import useEvent, { EVENT } from '../../../hooks/globalEvent'
import HorizontalList, { HorizontalListMethods } from '../../base/HorizontalList/HorizontalList'

interface ListUserPresendProps {
    profile: Profile,
    userType?: 'group' | 'user'
}

function ListUserPresend ({ userType = 'user',  ...props }: ListUserPresendProps) {
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const listWrapperRef = React.createRef<HorizontalListMethods>()
    const [newPresend, _] = useEvent(EVENT.presendListUpdate)

    const getPresend = async (page: number) => {
        const queryProps = userType === 'user'
            ? { sender_id: props.profile.id, page, auth_token: user.authToken || undefined }
            : { group_id: props.profile.id, page, auth_token: user.authToken || undefined }

        return await solas.queryPresend(queryProps)
    }

    useEffect(() => {
        !!listWrapperRef.current && listWrapperRef.current!.refresh()
    }, [props.profile])

    useEffect(() => {
        if (newPresend) {
          !!newPresend && !!listWrapperRef.current && listWrapperRef.current!.refresh()
        }
    }, [newPresend])

    return (
        <HorizontalList
        item={ (itemData: any) => <CardPresend presend={ itemData } /> }
        space={ 12 }
        itemWidth={ 162 }
        itemHeight={ 184 }
        queryFunction={ getPresend }
        onRef={ listWrapperRef }
        />)
}

export default ListUserPresend
