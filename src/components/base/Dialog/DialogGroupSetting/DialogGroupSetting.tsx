import { useState, useContext, useEffect } from 'react'
import './DialogGroupSetting.less'
import PageBack from '../../PageBack';
import langContext from '../../../provider/LangProvider/LangContext'
import UserContext from '../../../provider/UserProvider/UserContext'
import solas, { Group } from '../../../../service/solas'
import DialogsContext from '../../../provider/DialogProvider/DialogsContext'
import { DialogConfirmProps } from '../DialogConfirm/DialogConfirm'
import { useNavigate } from 'react-router-dom'

export interface DialogGroupSettingProps {
    group: Group
    handleClose: () => any
}


function DialogGroupSetting(props: DialogGroupSettingProps) {
    const { lang } = useContext(langContext)
    const { user } = useContext(UserContext)
    const { showLoading, showToast, openConfirmDialog } = useContext(DialogsContext)
    const navigate= useNavigate()

    const handleDissolve = async () => {
        const unload = showLoading()
        try {
            const res = solas.freezeGroup({
                group_id: props.group.id,
                auth_token: user.authToken || ''
            })
            unload()
            showToast('Dissolve success')
            props.handleClose()
            navigate(`/profile/${user.userName}`)
        } catch (e: any) {
            console.log('[handleDissolve]: ', e)
            unload()
            showToast(e.message || 'Dissolve fail')
        }
     }

     const showConfirmDialog = () => {
        const dialogProps: DialogConfirmProps = {
            title: lang['Group_freeze_dialog_title'],
            confirmLabel: lang['Group_freeze_Dialog_confirm'],
            cancelLabel: lang['Group_freeze_Dialog_cancel'],
            onConfirm: (close: any) => { close(); handleDissolve() },
            content: () => <div className='confirm-domain'><span>{props.group.domain}</span></div>
        }

        const dialog = openConfirmDialog(dialogProps)
     }

    return (<div className='group-setting-dialog'>
       <div className='top-side'>
           <div className='list-header'>
               <div className='center'>
                   <PageBack onClose={ () => { props.handleClose() } } title={lang['Group_setting_title']}/>
               </div>
           </div>
       </div>
        <div className='group-setting-menu'>
            <div className='center'>
                <div className='group-setting-menu-item' onClick={ showConfirmDialog }>
                    { lang['Group_setting_dissolve'] }
                </div>
            </div>
        </div>
    </div>)
}

export default DialogGroupSetting
