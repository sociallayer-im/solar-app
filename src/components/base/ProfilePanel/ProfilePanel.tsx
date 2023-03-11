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
import useEvent, { EVENT } from '../../../hooks/globalEvent'

function ProfilePanel(props: Profile) {
    const [profile, setProfile] = useState(props)
    const { defaultAvatar } = usePicture()
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const { openConfirmDialog, openDialog, showAvatar } = useContext(DialogsContext)
    const [newProfile, _] = useEvent(EVENT.profileUpdate)

    useEffect(() => {
        if (newProfile && newProfile.id === profile.id) {
            setProfile({...profile, ...newProfile})
        }
    }, [newProfile])

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
            content: () => <DialogContent>{ profile.address }</DialogContent>
        })
    }

    const showEmail = () => {
        openConfirmDialog({
            title: lang['Profile_Show_Email'],
            confirmLabel: lang['Profile_Show_Copy'],
            cancelLabel: lang['Profile_Show_Close'],
            onConfirm: (close: any) => { close(); },
            content: () => <DialogContent>{ profile.email }</DialogContent>
        })
    }

    const showProfileQRcode = () => {
        openDialog({
            size:[316, 486],
            content: (close: any) => <DialogProfileQRcode profile={profile} />
        })
    }

    const isProfileOwner = () => {
        return user.id === profile.id
    }

    const editAvatar = () => {
        if (!isProfileOwner) return
        showAvatar(profile)
    }

    return (
        <div className='profile-panel'>
            <div className='left-size'>
                <div className='avatar'>
                    <img onClick={() => { editAvatar() } } src={ profile.image_url || defaultAvatar(profile.id) } alt=""/>
                    <div className='qrcode-btn' onClick={showProfileQRcode}>
                        <i className='icon icon-qrcode'></i>
                    </div>
                </div>
                <div className='domain-bar'>
                    <div className='domain'>{ profile.domain }</div>
                    { profile.address &&
                        <div className='show-wallet' onClick={ () => { showWallet() } }>
                            <i className='icon icon-wallet'></i>
                        </div>
                    }
                    { profile.email && isProfileOwner() &&
                        <div className='show-email' onClick={ () => { showEmail() } }>
                            <i className='icon icon-email'></i>
                        </div>
                    }
                </div>
                <div className='follow'>
                    <div>{ lang['Follow_detail_followed'] } { profile.followers }</div>
                    <div>{ lang['Follow_detail_following'] } { profile.following }</div>
                </div>
            </div>
            <div className='right-size'></div>
        </div>
    )
}

export default ProfilePanel
