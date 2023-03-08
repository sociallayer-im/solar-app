import Layout from '../../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import PageBack from '../../components/base/PageBack'
import './Profile.less'
import {useContext, useEffect, useState} from 'react'
import solas, { Profile } from '../../service/solas'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import ProfilePanel from '../../components/base/ProfilePanel/ProfilePanel'
import AppButton, { BTN_SIZE } from '../../components/base/AppButton'
import LangContext from '../../components/provider/LangProvider/LangContext'
import AppTabs from '../../components/base/AppTabs'
import AppSubTabs from '../../components/base/AppSubTabs'
import { Tab } from 'baseui/tabs'
import ListUserMinted from '../../components/compose/ListUserMinted'
import ListUserPresend from '../../components/compose/ListUserPresend'
import ListUserBadgelet from '../../components/compose/ListUserBadgelet'
import ListUserGroup from '../../components/compose/ListUserGroup'


function ProfilePage () {
    const { username } = useParams()
    const [profile, setProfile] = useState<Profile | null>(null)
    const { showLoading } = useContext(DialogsContext)
    const { lang } = useContext(LangContext)
    const [selectedTab, setSelectedTab] = useState('Minted')

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

    return <Layout>
        {profile &&
            <div className='profile-page'>
            <div className='up'>
                <div className='center'>
                    <PageBack />
                    <div className='slot_1'><ProfilePanel {...profile!} /></div>
                    <div className='slot_2'>
                        <AppButton size={ BTN_SIZE.compact }> { lang['Profile_User_MindBadge'] }</AppButton>
                    </div>
                </div>
            </div>
            <div className='down'>
                <AppTabs initialState={ { activeKey: selectedTab } }>
                    <Tab key='Minted' title={ lang['Profile_Tab_Minted'] }>
                        <AppSubTabs>
                            <Tab key='Minted' title={ lang['Profile_Tab_Minted'] }>
                                <ListUserMinted profile={ profile! } />
                            </Tab>
                            <Tab key='Presend' title={ lang['Profile_Tab_Presend'] }>
                                <ListUserPresend profile={ profile! } />
                            </Tab>
                        </AppSubTabs>
                    </Tab>
                    <Tab key='Received' title={ lang['Profile_Tab_Received'] }>
                        <ListUserBadgelet profile={ profile! } />
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
