import {useNavigate} from 'react-router-dom'
import {useStyletron} from 'baseui'
import {useContext, useEffect, useImperativeHandle, useState} from 'react'
import {Profile} from '../../../service/solas'
import UploadAvatar from '../UploadAvatar/UploadAvatar'
import usePicture from '../../../hooks/pictrue'
import './FormProfileEdit.less'
import AppInput from '../../base/AppInput'
import LangContext from '../../provider/LangProvider/LangContext'
import AppTextArea from '../../base/AppTextArea/AppTextArea'
import EditSocialMedia from '../EditSocialMedia/EditSocialMedia'

export interface ProfileEditFormProps {
    profile: Profile
    onRef?: any
}

export interface ProfileEditFormData{
    profile: Profile
}

function FormProfileEdit(props: ProfileEditFormProps) {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const [a, seta] = useState('')
    const {defaultAvatar} = usePicture()
    const [newProfile, setNewProfile] = useState<Profile>(props.profile)
    const {lang} = useContext(LangContext)

    useEffect(() => {

    }, [])

    useImperativeHandle(props.onRef, () => {
        // 需要将暴露的接口返回出去
        const a: ProfileEditFormData = { profile: newProfile }
        return a
    })

    const update = (key: keyof Profile, value: any) => {
        console.log(value)
        const profile: any = {...newProfile}
        profile[key] = value
        setNewProfile(profile)
    }

    return (<div className='profile-edit-from'>
        <div className='input-area'>
            <div className='input-area-title'>{lang['Profile_Edit_Avatar']}</div>
            <UploadAvatar
                imageSelect={newProfile.image_url || defaultAvatar(newProfile.id)}
                confirm={(imgRes) => {
                    update('image_url', imgRes)
                }}/>
        </div>

        {/*<div className='input-area'>*/}
        {/*    <div className='input-area-title'>{lang['Profile_Edit_Ncikname']}</div>*/}
        {/*    <AppInput value={newProfile.username || ''} onChange={(e) => {*/}
        {/*        update('username', e.target.value)*/}
        {/*    }}/>*/}
        {/*</div>*/}

        {/*<div className='input-area'>*/}
        {/*    <div className='input-area-title'>{lang['Profile_Edit_Location']}</div>*/}
        {/*    <AppInput value={newProfile.username || ''} onChange={(e) => {*/}
        {/*        update('username', e.target.value)*/}
        {/*    }}/>*/}
        {/*</div>*/}

        {/*<div className='input-area'>*/}
        {/*    <div className='input-area-title'>{lang['Profile_Edit_Bio']}</div>*/}
        {/*    <AppTextArea*/}
        {/*        maxLength={200}*/}
        {/*        value={newProfile.username || ''}*/}
        {/*        onChange={(e) => {*/}
        {/*            update('username', e.target.value)*/}
        {/*        }}/>*/}
        {/*</div>*/}

        <div className='input-area'>
            <div className='input-area-title'>{lang['Profile_Edit_Social_Media']}</div>
            <EditSocialMedia
                title={'Twitter'}
                icon={'icon-twitter'}
                value={newProfile.twitter || ''}
                onChange={(value) => {
                    update('twitter', value)
                }}
            />
            {/*<EditSocialMedia*/}
            {/*    title={'Telegram'}*/}
            {/*    icon={'icon-tg'}*/}
            {/*    value={newProfile.twitter || ''}*/}
            {/*    onChange={(value) => {*/}
            {/*        update('twitter', value)*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<EditSocialMedia*/}
            {/*    title={'Github'}*/}
            {/*    icon={'icon-github'}*/}
            {/*    value={newProfile.twitter || ''}*/}
            {/*    onChange={(value) => {*/}
            {/*        update('twitter', value)*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<EditSocialMedia*/}
            {/*    title={'Link'}*/}
            {/*    icon={'icon-web2'}*/}
            {/*    value={newProfile.twitter || ''}*/}
            {/*    onChange={(value) => {*/}
            {/*        update('twitter', value)*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<EditSocialMedia*/}
            {/*    title={'ENS'}*/}
            {/*    icon={'icon-ens'}*/}
            {/*    value={newProfile.twitter || ''}*/}
            {/*    onChange={(value) => {*/}
            {/*        update('twitter', value)*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<EditSocialMedia*/}
            {/*    title={'Discord'}*/}
            {/*    icon={'icon-discord'}*/}
            {/*    value={newProfile.twitter || ''}*/}
            {/*    onChange={(value) => {*/}
            {/*        update('twitter', value)*/}
            {/*    }}*/}
            {/*/>*/}
        </div>
    </div>)
}

export default FormProfileEdit
