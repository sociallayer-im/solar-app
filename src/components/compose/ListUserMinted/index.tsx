import { useStyletron } from 'baseui'
import {useState, useContext, useEffect, useRef} from 'react'
import CardBadge from '../../base/Card/CardBadge'
import solas, { Profile, Badge } from '../../../service/solas'
import { onReachBottom } from '../../../utils/scroll'
import ListWrapper from '../../base/ListWrapper'
import Empty from '../../base/Empty'
import LangContext from '../../provider/LangProvider/LangContext'
import useScrollToLoad from "../../../hooks/scrollToLoad";

interface ListUserMintedProps {
    profile: Profile
    userType?: 'group' | 'user'
}

function ListUserMinted ({ userType = 'user',  ...props }: ListUserMintedProps) {
    const { lang } = useContext(LangContext)
    const getBadge = async (page: number) => {
        const queryProps = userType === 'user'
            ? { sender_id: props.profile.id, page }
            : { group_id: props.profile.id, page }

        return await solas.queryBadge(queryProps)

    }

    const { isEmpty, list, ref, refresh } = useScrollToLoad ({ queryFunction: getBadge })

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
                    return <CardBadge badge={ item } key={ index.toString() }/>
                })
            }
            <div ref={ref} className='page-bottom-marker'></div>
        </ListWrapper>)
}

export default ListUserMinted
