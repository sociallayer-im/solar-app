import {useState, useContext, useEffect, ReactNode} from 'react'
import './DialogIssuePrefill.less'
import AppSwiper from '../../AppSwiper/AppSwiper'
import { Delete } from 'baseui/icon'
import LangContext from '../../../provider/LangProvider/LangContext'
import { useNavigate } from 'react-router-dom'



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

    useEffect(() => {

    }, [])

    const gotoCreateBadge = () => {
        navigation('/badge-create')
        props.handleClose()
    }

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
            <div className='prefill-module-title'>{ lang['Badgebook_Dialog_Choose_Badgebook'] }</div>
            <div className='prefill-module-items'>
                <AppSwiper items={items()} space={6} itemWidth={68}/>
            </div>
        </div>
        <div className='prefill-module'>
            <div className='prefill-module-title'>{ lang['Badgebook_Dialog_Choose_Badge'] }</div>
            <div className='prefill-module-items'>
                <AppSwiper items={items()} space={6} itemWidth={68}/>
            </div>
        </div>
        <div className='prefill-module'>
            <div className='prefill-module-title'>{ lang['Badgebook_Dialog_Choose_Draft'] }</div>
            <div className='prefill-module-items'>
                <AppSwiper items={items()} space={6} itemWidth={68}/>
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
