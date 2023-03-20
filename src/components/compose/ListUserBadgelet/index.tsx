import {useContext, useEffect, useState} from 'react'
import CardBadgelet from '../../base/Cards/CardBadgelet'
import solas, { Profile, Badgelet } from '../../../service/solas'
import ListWrapper from '../../base/ListWrapper'
import Empty from '../../base/Empty'
import LangContext from '../../provider/LangProvider/LangContext'
import useScrollToLoad from '../../../hooks/scrollToLoad'
import useEvent, { EVENT } from '../../../hooks/globalEvent'
import UserContext from '../../provider/UserProvider/UserContext'
import {sortBy} from "lodash";

interface ListUserBadgeletProps {
    profile: Profile
}

function ListUserBadgelet (props: ListUserBadgeletProps) {
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const [badgelets, setBadgelets] = useState<Badgelet[]>([])
    const getBadgelet = async (page: number) => {
        return await solas.queryBadgelet({
            show_hidden: user.id === props.profile.id ? 1: 0,
            receiver_id: props.profile.id,
            page })
    }
    const { isEmpty, list, ref, refresh } = useScrollToLoad ({ queryFunction: getBadgelet })
    const [needUpdate, _] = useEvent(EVENT.badgeletListUpdate)

    useEffect(() => {
        if (!needUpdate) return
        refresh()
    }, [needUpdate])

    useEffect(() => {
        refresh()
    }, [props.profile])

    useEffect(() => {
        if (list.length) {
            let sortByTop:Badgelet[] = []
            list.forEach(item => {
                if (item.top) {
                    sortByTop = [item, ...sortByTop]
                } else {
                    sortByTop = [...sortByTop, item]
                }
            })
            setBadgelets(sortByTop)
        }
    }, [list])

    return (
        <ListWrapper>
            {   isEmpty ?
                <Empty text={ lang['Empty_No_Badge'] } />
                : false
            }
            {   badgelets.length ?
                badgelets.map((item, index) => {
                    return <CardBadgelet badgelet={ item } key={ index.toString() }/>
                })
                : false
            }
            <div ref={ref} className='page-bottom-marker'></div>
        </ListWrapper>)
}

export default ListUserBadgelet
