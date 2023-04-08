import Layout from '../../components/Layout/Layout'
import './Home.less'
import AppButton, { BTN_KIND } from "../../components/base/AppButton/AppButton";
import { useContext, useEffect } from 'react'
import UserContext from '../../components/provider/UserProvider/UserContext'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import solas from '../../service/solas'
import { useNavigate, useParams } from 'react-router-dom'
import useIssueBadge from '../../hooks/useIssueBadge'
import LangContext from '../../components/provider/LangProvider/LangContext'

function Home () {
    const { user } = useContext( UserContext )
    const { showBadgelet, showPresend, clean, openConnectWalletDialog, showInvite, showLoading } = useContext(DialogsContext)
    const navigate = useNavigate()
    const { badgeletId, presendId, groupId, inviteId } = useParams()
    const startIssueBadge = useIssueBadge()
    const { lang } = useContext(LangContext)

    useEffect(() => {
        async function showBadgeletDetail () {
           const newBadgelet = await solas.queryBadgeletDetail({ id: Number(badgeletId) })
           showBadgelet(newBadgelet)
        }

        async function showPresendDetail () {
            const id = presendId?.split('_')[0]
            const code = presendId?.split('_')[1]
            const newBadgelet = await solas.queryPresendDetail({ id: Number(id) })
            showPresend(newBadgelet, code)
        }

        async function showInviteDetail () {
            const inviteDetail = await solas.queryInviteDetail({ group_id: Number(groupId), invite_id: Number(inviteId) })
            showInvite(inviteDetail)
        }

        if (badgeletId) {
            clean('show badgelet detail')
            setTimeout(() => {
                showBadgeletDetail()
            }, 500)
        }

        if (presendId) {
            clean('show presend detail')
            setTimeout(() => {
                showPresendDetail()
            }, 500)
        }

        if (groupId && inviteId) {
            clean('show invite detail')
            setTimeout(() => {
                showInviteDetail()
            }, 500)
        }
    },[])

    const start = async () => {
        if (user.userName) {
            const unload = showLoading()
            const badges = await solas.queryBadge({ sender_id: user.id!, page: 1 })
            unload()
            startIssueBadge({ badges })
        } else {
            openConnectWalletDialog()
        }
    }

    // useEffect(() => {
    //     start()
    // },[user.userName])

    return <Layout>
        <div className='home-page'>
            <div className='circle-1'></div>
            <div className='circle-2'></div>
            <div className='circle-3'></div>
            <div className='wrapper'>
                <img className='cover' src="/images/home/home_1.png" alt=""/>
                <div className='text'>
                    <h1>{ lang['Home_Page_New_Title'] }</h1>
                    <p>{ lang['Home_Page_New_Des'] }</p>
                    <AppButton onClick={ start }
                        kind={ BTN_KIND.primary } special>{ lang['Home_Page_New_Btn'] }</AppButton>
                </div>
            </div>
        </div>
    </Layout>
}

export default Home
