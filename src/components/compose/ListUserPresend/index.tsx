import {useContext, useEffect} from 'react'
import CardPresend from '../../base/CardPresend'
import solas, { Profile, Presend } from '../../../service/solas'
import ListWrapper from '../../base/ListWrapper'
import Empty from '../../base/Empty'
import LangContext from '../../provider/LangProvider/LangContext'
import useScrollToLoad from '../../../hooks/scrollToLoad'
import UserContext from '../../provider/UserProvider/UserContext'

interface ListUserPresendProps {
    profile: Profile
}

function ListUserPresend (props: ListUserPresendProps) {
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const getPresend = async (page: number) => {
        return await solas.queryPresend({ page,
            sender_id: props.profile.id,
            auth_token: user.authToken || undefined })
    }

    const { isEmpty, list, ref, refresh } = useScrollToLoad ({ queryFunction: getPresend })

    useEffect(() => {
        refresh()
    }, [props.profile])

    return (
        <ListWrapper>
            { isEmpty ?
                <Empty text={ lang['Empty_No_Badge'] } />
                : false
            }
            {
                list.map((item, index) => {
                    return <CardPresend presend={ item } key={ index.toString() }/>
                })
            }
            <div ref={ ref }></div>
        </ListWrapper>)
}

export default ListUserPresend
