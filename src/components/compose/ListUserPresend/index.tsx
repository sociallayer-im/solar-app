import {useContext, useEffect} from 'react'
import CardPresend from '../../base/Cards/CardPresend'
import solas, { Profile, Presend } from '../../../service/solas'
import ListWrapper from '../../base/ListWrapper'
import Empty from '../../base/Empty'
import LangContext from '../../provider/LangProvider/LangContext'
import useScrollToLoad from '../../../hooks/scrollToLoad'
import UserContext from '../../provider/UserProvider/UserContext'

interface ListUserPresendProps {
    profile: Profile,
    userType?: 'group' | 'user'
}

function ListUserPresend ({ userType = 'user',  ...props }: ListUserPresendProps) {
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const getPresend = async (page: number) => {
        const queryProps = userType === 'user'
            ? { sender_id: props.profile.id, page, auth_token: user.authToken || undefined }
            : { group_id: props.profile.id, page, auth_token: user.authToken || undefined }

        return await solas.queryPresend(queryProps)
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
