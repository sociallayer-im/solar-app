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
import { Overflow } from 'baseui/icon'
import useIssueBadge from '../../hooks/useIssueBadge'
import ListUserCreated from '../../components/compose/ListUserCreated/ListUserCreated'
import BgProfile from '../../components/base/BgProfile/BgProfile'
import {styled} from "baseui";
import useCopy from "../../hooks/copy";


function GroupPage () {
    const { groupname } = useParams()
    const [profile, setProfile] = useState<Profile | null>(null)
    const { showLoading, showGroupSetting } = useContext(DialogsContext)
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const [selectedTab, setSelectedTab] = useState('Minted')
    const startIssue = useIssueBadge({ groupName: groupname})
    const { copyWithDialog } = useCopy()

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
        const unload = showLoading()
        const badges = await solas.queryBadge({ group_id: profile!.id!, page: 1 })
        unload()

        user.id === profile?.group_owner_id
            ? startIssue({ badges })
            : startIssue({ badges, to: profile?.domain || ''})
    }

    // 卸载组件

    const groupOption = () => {
        const style = { cursor: 'pointer' }
        return user.id === profile?.group_owner_id
                ? <Overflow size={22} onClick={ () => { showGroupSetting(profile) } } style={ style } />
                : ''
    }

    const ShowDomain = styled('div', ({$theme}) => {
        return {
            color: '#272928'
        }
    })

    const ProfileMenu = () => <div className='profile-setting'>
        <ShowDomain onClick={ () => { copyWithDialog(profile?.domain || '', lang['Dialog_Copy_Message']) } }>{ profile?.domain }</ShowDomain>
        { user.id === profile?.group_owner_id &&
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
                <div className='profile-user-name'> { profile.username }</div>
                <ListUserBadgelet profile={profile!} />
                <ListUserCreated userType='group' profile={ profile! } />
                <ListGroupMember group={ profile }/>
            </div>
        </div>
        }
    </Layout>
}

export default GroupPage
