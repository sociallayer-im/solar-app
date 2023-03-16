import Layout from '../../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import PageBack from '../../components/base/PageBack'
import './Group.less'
import { useContext, useEffect, useState } from 'react'
import solas, { Profile } from '../../service/solas'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import GroupPanel from '../../components/base/GroupPanel/GroupPanel'
import AppButton, { BTN_SIZE } from '../../components/base/AppButton'
import LangContext from '../../components/provider/LangProvider/LangContext'
import AppTabs from '../../components/base/AppTabs'
import AppSubTabs from '../../components/base/AppSubTabs'
import { Tab } from 'baseui/tabs'
import ListUserMinted from '../../components/compose/ListUserMinted'
import ListUserPresend from '../../components/compose/ListUserPresend'
import ListUserBadgelet from '../../components/compose/ListUserBadgelet'
import ListGroupInvitep from '../../components/compose/ListGroupInvite'
import ListGroupMember from '../../components/compose/ListGroupMember'
import UserContext from '../../components/provider/UserProvider/UserContext'
import { useNavigate } from 'react-router-dom'


function GroupPage () {
    const { groupname } = useParams()
    const [profile, setProfile] = useState<Profile | null>(null)
    const { showLoading } = useContext(DialogsContext)
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const [selectedTab, setSelectedTab] = useState('Minted')
    const navigate = useNavigate()

    useEffect(() => {
        const getProfile  =  async function () {
            if (!groupname) return
            const unload = showLoading()
            try {
                const profile = await solas.getProfile({ username: groupname })
                setProfile(profile)
            } catch (e) {
                console.log('[getProfile]: ', e)
            } finally {
                unload()
            }
        }
        getProfile()
    },[groupname])

    const handleMintOrIssue = () => {
        navigate(user.userName === profile?.username ? '/badge-create' : `/badge-create?to=${profile?.domain}`)
    }

    return <Layout>
        { !!profile &&
            <div className='profile-page'>
            <div className='up-side'>
                <div className='center'>
                    <PageBack />
                    <div className='slot_1'>
                        <GroupPanel group={ profile } />
                    </div>
                    <div className='slot_2'>
                        <AppButton size={ BTN_SIZE.compact } onClick={ handleMintOrIssue }>
                            { user.userName === profile.username
                                ? lang['Profile_User_MindBadge']
                                : lang['Profile_User_IssueBadge']
                            }
                        </AppButton>
                    </div>
                </div>
            </div>
            <div className='down-side'>
                <AppTabs initialState={ { activeKey: selectedTab } }>
                    <Tab key='Minted' title={ lang['Profile_Tab_Minted'] }>
                        <AppSubTabs>
                            <Tab key='Minted' title={ lang['Profile_Tab_Minted'] }>
                                <ListUserMinted userType='group' profile={ profile! } />
                            </Tab>
                            <Tab key='Invite' title={ lang['Group_detail_tabs_Invite'] }>
                                <ListGroupInvitep group={ profile! } />
                            </Tab>
                            <Tab key='Presend' title={ lang['Profile_Tab_Presend'] }>
                                <ListUserPresend userType='group' profile={ profile! } />
                            </Tab>
                        </AppSubTabs>
                    </Tab>
                    <Tab key='Received' title={ lang['Profile_Tab_Received'] }>
                        <ListUserBadgelet profile={ profile! } />
                    </Tab>
                    <Tab key='Members' title={ lang['Group_detail_tabs_member'] }>
                        <ListGroupMember group={ profile! } />
                    </Tab>
                </AppTabs>
            </div>
        </div>
        }
    </Layout>
}

export default GroupPage
