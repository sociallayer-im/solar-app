import { useNavigate } from 'react-router-dom'
import { useStyletron, styled } from 'baseui'
import { useState, useContext, useEffect } from 'react'
import { Profile }  from '../../../service/solas'
import './ProfilePanel.less'
import usePicture from '../../../hooks/pictrue'
import LangContext from '../../provider/LangProvider/LangContext'
import UserContext from '../../provider/UserProvider/UserContext'
import DialogsContext from '../../provider/DialogProvider/DialogsContext'
import DialogProfileQRcode from '../DialogProfileQRcode/DialogProfileQRcode'

function ProfilePanel(props: Profile) {
    const { defaultAvatar } = usePicture()
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const { openConfirmDialog, openDialog } = useContext(DialogsContext)

    useEffect(() => {

    }, [])

    const DialogContent= styled('div', () => {
        return {
            textAlign: 'center',
            fontSize: '16px',
            wordBreak: 'break-all'
        }
    })

    const showWallet = () => {
        openConfirmDialog({
            title: lang['Profile_Show_Wallet'],
            confirmLabel: lang['Profile_Show_Copy'],
            cancelLabel: lang['Profile_Show_Close'],
            onConfirm: (close: any) => { close(); },
            content: () => <DialogContent>{ props.address }</DialogContent>
        })
    }

    const showEmail = () => {
        openConfirmDialog({
            title: lang['Profile_Show_Email'],
            confirmLabel: lang['Profile_Show_Copy'],
            cancelLabel: lang['Profile_Show_Close'],
            onConfirm: (close: any) => { close(); },
            content: () => <DialogContent>{ props.email }</DialogContent>
        })
    }

    const showProfileQRcode = () => {
        openDialog({
            size:[316, 486],
            content: (close: any) => <DialogProfileQRcode profile={props} />
        })
    }

    const isProfileOwner = () => {
        return user.id === props.id
    }

    return (
        <div className='profile-panel'>
            <div className='left-size'>
                <div className='avatar'>
                    <img src={ props.image_url || defaultAvatar(props.id) } alt=""/>
                    <div className='qrcode-btn' onClick={showProfileQRcode}>
                        <i className='icon icon-qrcode'></i>
                    </div>
                </div>
                <div className='domain-bar'>
                    <div className='domain'>{ props.domain }</div>
                    { props.address &&
                        <div className='show-wallet' onClick={ () => { showWallet() } }>
                            <i className='icon icon-wallet'></i>
                        </div>
                    }
                    { props.email && isProfileOwner() &&
                        <div className='show-email' onClick={ () => { showEmail() } }>
                            <i className='icon icon-email'></i>
                        </div>
                    }
                </div>
                <div className='follow'>
                    <div>{ lang['Follow_detail_followed'] } { props.followers }</div>
                    <div>{ lang['Follow_detail_following'] } { props.following }</div>
                </div>
            </div>
            <div className='right-size'></div>
        </div>
    )
}

export default ProfilePanel
