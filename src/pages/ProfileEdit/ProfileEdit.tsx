import {useNavigate, useParams} from 'react-router-dom'
import {useStyletron} from 'baseui'
import {useContext, useEffect, useState, createRef} from 'react'
import Layout from '../../components/Layout/Layout'
import solas, {Profile, verifyTwitter} from '../../service/solas'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import PageBack from '../../components/base/PageBack'
import './ProfileEdit.less'
import AppButton, {BTN_KIND, BTN_SIZE} from '../../components/base/AppButton/AppButton'
import FormProfileEdit, { ProfileEditFormData } from '../../components/compose/FormProfileEdit/FormProfileEdit'
import LangContext from '../../components/provider/LangProvider/LangContext'
import {DialogConfirmProps} from "../../components/base/Dialog/DialogConfirmDomain/DialogConfirmDomain";
import UserContext from "../../components/provider/UserProvider/UserContext";


function ProfileEdit() {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const [profile, setProfile] = useState<Profile | null>(null)
    const [newProfile, setNewProfile] = useState<Profile | null>(null)
    const {username} = useParams()
    const { showLoading, showToast } = useContext(DialogsContext)
    const { lang } = useContext(LangContext)
    const form = createRef<ProfileEditFormData>()
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        const unload = showLoading()
        const getProfile = async () => {
            if (!username) return
            try {
                const profile = await solas.getProfile({
                    username
                })

                setNewProfile(profile)
                setProfile(profile)
                unload()
            } catch (e: any) {
                console.error('[getProfile]: ', e)
            }
        }
        getProfile()
    }, [])

    const saveProfile = async () => {
        console.log(form.current?.profile)
        const avatar = form.current?.profile.image_url
        let twitter = form.current?.profile.twitter
        if (twitter) {
            twitter = twitter.replace('https://twitter.com/', '')
        }

        const unload = showLoading()
        try {
            console.log('profile?.image_url', profile?.image_url)
            console.log('avatar', avatar)
            if (avatar && avatar !== profile?.image_url) {
                const updateAvatar = await solas.updateProfile({
                    data: {image_url: avatar},
                    auth_token: user.authToken || ''
                })
            }

            if (twitter && twitter !== profile?.twitter) {
                const updateTwitter = await solas.verifyTwitter({
                    twitter_handle: twitter || '',
                    tweet_url: '',
                    auth_token: user.authToken || ''
                })
            }


            showToast('Save Successfully')
            setUser({
                avatar: avatar,
                twitter: twitter,
            })
            navigate(`/profile/${user.userName}`)
        } catch (e) {
            console.error('[saveProfile]: ', e)
        } finally {
            unload()
        }
    }

    const SaveBtn = function () {
        return <AppButton
            onClick={ saveProfile }
            style={{width: '60px'}} inline kind={BTN_KIND.primary}
            special
            size={BTN_SIZE.mini} >
            {lang['Profile_Edit_Save']}
        </AppButton>
    }

    const handleBack = () => {
        const editedAvatar = form.current?.profile.image_url !== profile?.image_url
        const editTwitter = form.current?.profile.twitter !== profile?.twitter

        if ( editedAvatar || editTwitter) {
            alert('edited')
        }
    }

    return (<Layout>
        <div className='edit-profile-page'>
            {!!newProfile &&
                <div className='edit-profile-page-wrapper'>
                    <PageBack
                        onClose={ handleBack }
                        title={lang['Profile_Edit_Title']}
                        menu={ SaveBtn }/>
                    <FormProfileEdit profile={ newProfile } onRef={ form }/>
                    <AppButton style={{color: '#F64F4F'}}>{ lang['Group_setting_dissolve'] }</AppButton>
                </div>
            }
        </div>
    </Layout>)
}

export default ProfileEdit
