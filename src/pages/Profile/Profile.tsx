import Layout from '../../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import PageBack from '../../components/base/PageBack'
import './Profile.less'
import { useContext, useEffect, useState } from 'react'
import solas, { Profile } from '../../service/solas'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import ProfilePanel from '../../components/base/ProfilePanel/ProfilePanel'
import AppButton, { BTN_SIZE } from '../../components/base/AppButton/AppButton'
import LangContext from '../../components/provider/LangProvider/LangContext'
import AppTabs from '../../components/base/AppTabs'
import AppSubTabs from '../../components/base/AppSubTabs'
import { Tab } from 'baseui/tabs'
import ListUserMinted from '../../components/compose/ListUserMinted'
import ListUserPresend from '../../components/compose/ListUserPresend'
import ListUserBadgelet from '../../components/compose/ListUserBadgelet'
import ListUserGroup from '../../components/compose/ListUserGroup'
import UserContext from '../../components/provider/UserProvider/UserContext'
import { useNavigate } from 'react-router-dom'
import useIssueBadge from '../../hooks/useIssueBadge'


function ProfilePage () {
    const { username } = useParams()
    const [profile, setProfile] = useState<Profile | null>(null)
    const { showLoading } = useContext(DialogsContext)
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const [selectedTab, setSelectedTab] = useState('Received')
    const navigate = useNavigate()
    const startIssue = useIssueBadge()

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
        // 处理用户登录后但是未注册域名的情况，即有authToken和钱包地址,但是没有domain和username的情况
        if (user.wallet && user.authToken && !user.domain) {
            navigate('/regist')
            return
        }

        const unload = showLoading()
        const badges = await solas.queryBadge({ sender_id: user.id!, page: 1 })
        unload()

        user.userName === profile?.username
            ? startIssue({ badges })
            : startIssue({ badges, to: profile?.domain || ''})
    }

    return <Layout>
        { !!profile &&
            <div className='profile-page'>
            <div className='up-side'>
                <div className='center'>
                    <PageBack />
                    <div className='slot_1'>
                        <ProfilePanel profile={ profile } />
                    </div>
                    <div className='slot_2'>
                        <AppButton size={ BTN_SIZE.compact } onClick={ handleMintOrIssue }>
                            { user.userName === profile.username
                                ? lang['Profile_User_MindBadge']
                                : lang['Profile_User_IssueBadge'] + ' ' +profile.username
                            }
                        </AppButton>
                    </div>
                </div>
            </div>
            <div className='down-side'>
                <AppTabs initialState={ { activeKey: selectedTab } }>
                    <Tab key='Received' title={ lang['Profile_Tab_Received'] }>
                        <ListUserBadgelet profile={ profile! } />
                    </Tab>
                    <Tab key='Minted' title={ lang['Profile_Tab_Minted'] }>
                        <AppSubTabs>
                            <Tab key='Minted' title={ lang['Profile_Tab_Minted'] }>
                                <ListUserMinted profile={ profile! } />
                            </Tab>
                            { user.id === profile.id
                                ? <Tab key='Presend' title={ lang['Profile_Tab_Presend'] }>
                                    <ListUserPresend profile={ profile! } />
                                 </Tab>
                                : <></>
                            }
                        </AppSubTabs>
                    </Tab>
                    <Tab key='Groups' title={ lang['Profile_Tab_Groups'] }>
                        <ListUserGroup profile={ profile! } />
                    </Tab>
                </AppTabs>
            </div>
        </div>
        }
    </Layout>
}

export default ProfilePage
