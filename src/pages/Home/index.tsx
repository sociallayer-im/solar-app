import Layout from '../../components/Layout/Layout'
import './Home.less'
import AppButton, { BTN_KIND } from "../../components/base/AppButton/AppButton";
import { useContext, useEffect } from 'react'
import UserContext from '../../components/provider/UserProvider/UserContext'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import solas from '../../service/solas'
import { useNavigate, useParams } from 'react-router-dom'
import useIssueBadge from '../../hooks/useIssueBadge'

function Home () {
    const { user } = useContext( UserContext )
    const { showBadgelet, showPresend, clean, openConnectWalletDialog, showInvite } = useContext( DialogsContext )
    const navigate = useNavigate()
    const { badgeletId, presendId, groupId, inviteId } = useParams()
    const startIssueBadge = useIssueBadge()

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

    const start = () => {
        if (user.userName) {
            startIssueBadge()
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
                    <h1>Create a badge </h1>
                    <p>Join now to start creating badges, describing your achievements, and awarding them to deserving individuals.</p>
                    <AppButton onClick={ start }
                        kind={ BTN_KIND.primary } special>Create your badge</AppButton>
                </div>
            </div>
        </div>
    </Layout>
}

export default Home
