import Layout from '../../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import PageBack from '../../components/base/PageBack'
import './Group.less'
import { useContext, useEffect, useState } from 'react'
import solas, { Profile } from '../../service/solas'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import GroupPanel from '../../components/base/GroupPanel/GroupPanel'
import AppButton, { BTN_SIZE } from '../../components/base/AppButton/AppButton'
import LangContext from '../../components/provider/LangProvider/LangContext'
import ListUserBadgelet from '../../components/compose/ListUserBadgelet'
import ListGroupMember from '../../components/compose/ListGroupMember'
import UserContext from '../../components/provider/UserProvider/UserContext'
import useIssueBadge from '../../hooks/useIssueBadge'
import ListUserCreated from '../../components/compose/ListUserCreated/ListUserCreated'
import BgProfile from '../../components/base/BgProfile/BgProfile'
import {styled} from "baseui";
import useCopy from '../../hooks/copy'
import { useNavigate } from 'react-router-dom'
import {Tabs, Tab} from "baseui/tabs";
import ListUserRecognition from "../../components/compose/ListUserRecognition/ListUserRecognition";
import ListUserPresend from "../../components/compose/ListUserPresend";


function GroupPage () {
    const { groupname } = useParams()
    const [profile, setProfile] = useState<Profile | null>(null)
    const { showLoading, showGroupSetting } = useContext(DialogsContext)
    const { lang } = useContext(LangContext)
    const { user, logOut } = useContext(UserContext)
    const [selectedTab, setSelectedTab] = useState('0')
    const startIssue = useIssueBadge({ groupName: groupname})
    const { copyWithDialog } = useCopy()
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

    const handleMintOrIssue = async () => {
        // 处理用户登录后但是未注册域名的情况，即有authToken和钱包地址,但是没有domain和username的情况
        if (user.wallet && user.authToken && !user.domain) {
            navigate('/regist')
            return
        }

        const unload = showLoading()
        const badges = await solas.queryBadge({ group_id: profile!.id!, page: 1 })
        unload()

        user.id === profile?.group_owner_id
            ? startIssue({ badges })
            : startIssue({ badges, to: profile?.domain || ''})
    }

    const ShowDomain = styled('div', ({$theme}) => {
        return {
            color: '#272928'
        }
    })

    const goToEditGroup = () => {
        navigate(`/group-edit/${profile?.username}`)
    }

    const ProfileMenu = () => <div className='profile-setting'>
        <ShowDomain onClick={ () => { copyWithDialog(profile?.domain || '', lang['Dialog_Copy_Message']) } }>{ profile?.domain }</ShowDomain>
        { user.id === profile?.group_owner_id &&
            <div className='profile-setting-btn' onClick={() => { goToEditGroup() } }><i className='icon-setting'></i></div>
        }
    </div>

    return <Layout>
        { !!profile &&
            <div className='profile-page'>
            <div className='up-side'>
                <BgProfile profile={ profile }/>
                <div className='center'>
                    <div className='top-side'>
                        <PageBack  menu={ ProfileMenu } />
                    </div>
                    <div className='slot_1'>
                        <GroupPanel group={ profile } />
                    </div>
                    <div className='slot_2'>
                        <AppButton special size={ BTN_SIZE.compact } onClick={ handleMintOrIssue }>
                            <span className='icon-sendfasong'></span>
                            { user.id === profile.group_owner_id
                                ? lang['Follow_detail_btn_mint']
                                : lang['Profile_User_IssueBadge'] + profile.username
                            }
                        </AppButton>
                    </div>
                </div>
            </div>
            <div className='down-side'>
                <div className={'profile-tab'}>
                    <Tabs
                        renderAll
                        activeKey={selectedTab}
                        onChange={({ activeKey }) => {
                            setSelectedTab(activeKey as any);
                        }}>
                        <Tab title={'Badge'}>
                            <ListUserRecognition profile={profile} />
                        </Tab>
                        { user.id === profile.group_owner_id ?
                            <Tab title="Presend">
                                <ListUserPresend profile={profile} />
                            </Tab>
                            : <></>
                        }
                        <Tab title={'Member'}>
                            <ListGroupMember group={ profile }/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
        }
    </Layout>
}

export default GroupPage
