import {useNavigate} from 'react-router-dom'
import {useStyletron} from 'baseui'
import {useState, useContext, useEffect, ReactNode} from 'react'
import './DialogIssuePrefill.less'
import AppSwiper from '../../AppSwiper/AppSwiper'
import { Delete } from 'baseui/icon'



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
    const [css] = useStyletron()
    const navigate = useNavigate()
    const [a, seta] = useState('')

    useEffect(() => {

    }, [])

    const items = () => {
        return [
            <div className='prefill-item'>
                <img src="/images/default_avatar/avatar_1.png" alt=""/>
            </div>,
            <div className='prefill-item'>
                <img src="/images/default_avatar/avatar_1.png" alt=""/>
            </div>,
            <div className='prefill-item'>
                <img src="/images/default_avatar/avatar_1.png" alt=""/>
            </div>,
            <div className='prefill-item'>
                <img src="/images/default_avatar/avatar_1.png" alt=""/>
            </div>,
            <div className='prefill-item'>
                <img src="/images/default_avatar/avatar_1.png" alt=""/>
            </div>
        ] as ReactNode[]
    }

    return (<div className='dialog-issue-prefill'>
        <div className='prefill-module'>
            <div className='prefill-module-title'>Choose from Badge book</div>
            <div className='prefill-module-items'>
                <AppSwiper items={items()} space={6} itemWidth={68}/>
            </div>
        </div>
        <div className='prefill-module'>
            <div className='prefill-module-title'>Choose from Minted</div>
            <div className='prefill-module-items'>
                <AppSwiper items={items()} space={6} itemWidth={68}/>
            </div>
        </div>
        <div className='prefill-module'>
            <div className='prefill-module-title'>Choose from Draft</div>
            <div className='prefill-module-items'>
                <AppSwiper items={items()} space={6} itemWidth={68}/>
            </div>
        </div>
        <div className='create-badge-btn'>
            <img src="/images/create_badge_icon.png" alt=""/>
            <span>Create a new badge</span>
        </div>
        <div className='close-dialog' onClick={ () => { props.handleClose() }}><Delete size={ 20 } title='Close' /></div>
    </div>)
}

export default DialogIssuePrefill
