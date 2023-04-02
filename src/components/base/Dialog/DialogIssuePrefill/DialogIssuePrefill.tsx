import {useState, useContext, useEffect, ReactNode} from 'react'
import './DialogIssuePrefill.less'
import AppSwiper from '../../AppSwiper/AppSwiper'
import { Delete } from 'baseui/icon'
import LangContext from '../../../provider/LangProvider/LangContext'
import { useNavigate } from 'react-router-dom'
import solas, { Badge } from '../../../../service/solas'
import userContext from '../../../provider/UserProvider/UserContext'



export interface BadgeBookDialogRes {
    badgeId?: number
    badgebookId?: number
}

interface DialogIssuePrefillProps {
    handleClose: () => any
    profileId: number
    onSelect?: (res: BadgeBookDialogRes) => any
}


function DialogIssuePrefill(props: DialogIssuePrefillProps) {
    const { lang } = useContext(LangContext)
    const navigation = useNavigate()
    const [badges, setBadges] = useState<Badge[]>([])
    const { user } = useContext(userContext)

    useEffect(() => {
        async function getData () {
            if (!user.id) return
            const badges = await solas.queryBadge({ sender_id: user.id, page: 1 })
            if (badges.length) {
                setBadges(badges)
            }
        }
        getData()
    }, [])

    const gotoCreateBadge = () => {
        navigation('/badge-create')
        props.handleClose()
    }

    const badgeItems = (badges: Badge[]) => {
        const handleClick = (item: Badge) => {
            !!props.onSelect && props.onSelect({badgeId: item.id })
            props.handleClose()
        }

        return badges.map(item => {
            return (
                <div className='prefill-item' title={ item.title } onClick={ () => { handleClick(item) } }>
                    <img src={item.image_url} alt=""/>
                </div>
            )
        }) as ReactNode[]
    }

    return (<div className='dialog-issue-prefill'>
        <div className='prefill-module'>
            <div className='prefill-module-title'>{ lang['Badgebook_Dialog_Choose_Badge'] }</div>
            <div className='prefill-module-items'>
                <AppSwiper items={ badgeItems(badges) } space={6} itemWidth={68}/>
            </div>
        </div>
        <div className='create-badge-btn' onClick={ gotoCreateBadge }>
            <img src="/images/create_badge_icon.png" alt=""/>
            <span>{ lang['Badgebook_Dialog_Cetate_Badge'] }</span>
        </div>
        <div className='close-dialog' onClick={ () => { props.handleClose() }}><Delete size={ 20 } title='Close' /></div>
    </div>)
}

export default DialogIssuePrefill
