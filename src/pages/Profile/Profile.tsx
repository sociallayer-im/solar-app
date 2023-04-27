import Layout from '../../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import PageBack from '../../components/base/PageBack'
import './Profile.less'
import { useContext, useEffect, useState } from 'react'
import solas, { Profile } from '../../service/solas'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import ProfilePanel from '../../components/base/ProfilePanel/ProfilePanel'
import AppButton, {BTN_KIND, BTN_SIZE} from '../../components/base/AppButton/AppButton'
import LangContext from '../../components/provider/LangProvider/LangContext'
import ListUserBadgelet from '../../components/compose/ListUserBadgelet'
import ListUserGroup from '../../components/compose/ListUserGroup'
import UserContext from '../../components/provider/UserProvider/UserContext'
import { useNavigate } from 'react-router-dom'
import useIssueBadge from '../../hooks/useIssueBadge'
import ListUserCreated from '../../components/compose/ListUserCreated/ListUserCreated'
import BgProfile from '../../components/base/BgProfile/BgProfile'
import useEvent, {EVENT} from '../../hooks/globalEvent'
import { styled } from 'baseui'
import useCopy from '../../hooks/copy'


function ProfilePage () {
    const { username } = useParams()
    const [profile, setProfile] = useState<Profile | null>(null)
    const { showLoading } = useContext(DialogsContext)
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const [selectedTab, setSelectedTab] = useState('Received')
    const navigate = useNavigate()
    const startIssue = useIssueBadge()
    const [newProfile, _] = useEvent(EVENT.profileUpdate)
    const { copyWithDialog } = useCopy()

    useEffect(() => {
        if (newProfile && newProfile.id === profile?.id) {
            setProfile(newProfile)
        }
    }, [newProfile])

    useEffect(() => {
        const getProfile  =  async function () {
            if (!username) return
            const unload = showLoading()
            try {
                const profile = await solas.getProfile({ username })
                setProfile(profile)
            } catch (e) {
                console.log('[getProfile]: ', e)
            } finally {
                unload()
            }
        }
        getProfile()
    },[username])

    const handleMintOrIssue = async () => {
        const unload = showLoading()
        const badges = await solas.queryBadge({ sender_id: user.id!, page: 1 })
        unload()

        user.userName === profile?.username
            ? startIssue({ badges })
            : startIssue({ badges, to: profile?.domain || ''})
    }

    const ShowDomain = styled('div', ({$theme}) => {
       return {
           color: '#272928'
       }
    })

    const ProfileMenu = () => <div className='profile-setting'>
        <ShowDomain onClick={ () => { copyWithDialog(profile?.domain || '', lang['Dialog_Copy_Message']) } }>{ profile?.domain }</ShowDomain>
        { user.id === profile?.id &&
            <div className='profile-setting-btn'><i className='icon-setting'></i></div>
        }
    </div>

    return <Layout>
        { !!profile &&
            <div className='profile-page'>
                <div className='up-side'>
                    <BgProfile profile={ profile }/>
                    <div className='center'>
                        <div className='top-side'>
                            <PageBack menu={ () => ProfileMenu() } />
                        </div>
                        <div className='slot_1'>
                            <ProfilePanel profile={ profile } />
                        </div>
                        <div className='slot_2'>
                            <AppButton
                                special kind={ BTN_KIND.primary }
                                size={ BTN_SIZE.compact }
                                onClick={ handleMintOrIssue }>
                                <span className='icon-sendfasong'></span>
                                { user.id === profile.id
                                    ? lang['Profile_User_MindBadge']
                                    : lang['Profile_User_IssueBadge'] + profile.username
                                }
                            </AppButton>
                        </div>
                    </div>
                </div>
                <div className='down-side'>
                    <div className='profile-user-name'>{ profile.username }</div>
                    <ListUserBadgelet profile={ profile! } />
                    <ListUserCreated profile={ profile! } />
                    <ListUserGroup profile={ profile! } />
                </div>
            </div>
        }
    </Layout>
}

export default ProfilePage
