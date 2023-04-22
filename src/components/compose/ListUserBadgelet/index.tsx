import React, { useContext, useEffect } from 'react'
import CardBadgelet from '../../base/Cards/CardBadgelet/CardBadgelet'
import solas, { Profile, Badgelet  } from '../../../service/solas'
import LangContext from '../../provider/LangProvider/LangContext'
import useEvent, { EVENT } from '../../../hooks/globalEvent'
import UserContext from '../../provider/UserProvider/UserContext'
import ListTitle from '../../base/ListTitle/ListTitle'
import HorizontalList, { HorizontalListMethods } from '../../base/HorizontalList/HorizontalList'
import './ListUserBadgelet.less'

interface ListUserBadgeletProps {
    profile: Profile
}

function ListUserBadgelet (props: ListUserBadgeletProps) {
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)

    const listWrapperRef = React.createRef<HorizontalListMethods>()

    const getBadgelet = async (page: number) => {
        return await solas.queryBadgelet({
            show_hidden: user.id === props.profile.id ? 1: undefined,
            receiver_id: props.profile.id,
            page })
    }
    const [needUpdate, _] = useEvent(EVENT.badgeletListUpdate)

    useEffect(() => {
        if (!needUpdate) return
        !!listWrapperRef.current && listWrapperRef.current!.refresh()
    }, [needUpdate])

    useEffect(() => {
        !!listWrapperRef.current && listWrapperRef.current!.refresh()
    }, [props.profile])

    return (
        <div className='list-user-badgelet'>
            <ListTitle
                title={lang['Badgelet_List_Title']}
                count={ 0 }
                uint={lang['Badgelet_List_Unit']} />
            <div className='list-user-badgelet-content'>
                <HorizontalList
                    item={ (itemData: Badgelet) => <CardBadgelet badgelet={ itemData } /> }
                    space={ 12 }
                    itemWidth={ 162 }
                    itemHeight={ 184 }
                    queryFunction={ getBadgelet }
                />
            </div>
        </div>
    )
}

export default ListUserBadgelet
