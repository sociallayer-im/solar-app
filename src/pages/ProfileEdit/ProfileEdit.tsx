import {useNavigate, useParams} from 'react-router-dom'
import {useStyletron} from 'baseui'
import {useContext, useEffect, useState} from 'react'
import Layout from '../../components/Layout/Layout'
import solas, {Profile} from '../../service/solas'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import PageBack from '../../components/base/PageBack'
import './ProfileEdit.less'
import AppButton, {BTN_KIND, BTN_SIZE} from '../../components/base/AppButton/AppButton'
import ProfileEditForm from '../../components/compose/ProfileEditForm/ProfileEditForm'
import LangContext from '../../components/provider/LangProvider/LangContext'
import {DialogConfirmProps} from "../../components/base/Dialog/DialogConfirm/DialogConfirm";


function ProfileEdit() {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const [profile, setProfile] = useState<Profile | null>(null)
    const {username} = useParams()
    const { showLoading } = useContext(DialogsContext)
    const { lang } = useContext(LangContext)

    useEffect(() => {
        const unload = showLoading()
        const getProfile = async () => {
            if (!username) return
            try {
                const profile = await solas.getProfile({
                    username
                })

                setProfile(profile)
                unload()
            } catch (e: any) {
                console.error('[getProfile]: ', e)
            }
        }
        getProfile()
    }, [])

    const SaveBtn = function () {
        return <AppButton style={{width: '60px'}} inline kind={BTN_KIND.primary} special size={BTN_SIZE.mini} >Save</AppButton>
    }

    return (<Layout>
        <div className='edit-profile-page'>
            {!!profile &&
                <div className='edit-profile-page-wrapper'>
                    <PageBack title={lang['Profile_Edit_Title']} menu={ SaveBtn }/>
                    <ProfileEditForm  profile={ profile } />
                    <AppButton style={{color: '#F64F4F'}}>{ lang['Group_setting_dissolve'] }</AppButton>
                </div>
            }
        </div>
    </Layout>)
}

export default ProfileEdit
