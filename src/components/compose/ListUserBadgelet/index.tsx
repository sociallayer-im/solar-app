import {useContext, useEffect} from 'react'
import CardBadgelet from '../../base/CardBadgelet'
import solas, { Profile, Badgelet } from '../../../service/solas'
import ListWrapper from '../../base/ListWrapper'
import Empty from '../../base/Empty'
import LangContext from '../../provider/LangProvider/LangContext'
import useScrollToLoad from '../../../hooks/scrollToLoad'
import useEvent, { EVENT } from '../../../hooks/globalEvent'
import UserContext from '../../provider/UserProvider/UserContext'

interface ListUserBadgeletProps {
    profile: Profile
}

function ListUserBadgelet (props: ListUserBadgeletProps) {
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const getBadgelet = async (page: number) => {
        return  await solas.queryBadgelet({
            show_hidden: user.id === props.profile.id,
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

    return (
        <ListWrapper>
            {   isEmpty ?
                <Empty text={ lang['Empty_No_Badge'] } />
                : false
            }
            {   list.length ?
                list.map((item, index) => {
                    return <CardBadgelet badgelet={ item } key={ index.toString() }/>
                })
                : false
            }
            <div ref={ref}></div>
        </ListWrapper>)
}

export default ListUserBadgelet
