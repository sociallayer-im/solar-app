import { useContext } from 'react'
import {Badge} from "../../../service/solas";
import langContext from "../../provider/LangProvider/LangContext";

interface DetailPrefillBadgeProps {
    badge: Badge
}
function DetailPrefillBadge(props: DetailPrefillBadgeProps) {
    const { lang } = useContext(langContext)

    const formatTime = (dateString: string) => {
        const dateObject = new Date(dateString)
        const year = dateObject.getFullYear()
        const mon = dateObject.getMonth() + 1
        const date = dateObject.getDate()
        return `${year}.${mon}.${date}`
    }

    return (
        <div className='prefill-preview'>
        <img src={ props.badge.image_url } className='avatar' alt=""/>
        <div className='name'>{ props.badge.title }</div>
        <div className='create-time'>
            <span className='icon-clock'></span>
            <span>{ lang['IssueBadge_Create_time']} { formatTime(props.badge.created_at) }</span>
        </div>
    </div>
    )
}

export default DetailPrefillBadge
