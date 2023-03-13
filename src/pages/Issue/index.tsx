import { useNavigate, useParams } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import PageBack from '../../components/base/PageBack'
import './Issue.less'
import LangContext from '../../components/provider/LangProvider/LangContext'
import AppInput from '../../components/base/AppInput'
import AppButton, { BTN_KIND } from '../../components/base/AppButton'
import useVerify from '../../hooks/verify'
import solas, { Badge } from '../../service/solas'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import UserContext from '../../components/provider/UserProvider/UserContext'
import ReasonInput from '../../components/base/ReasonInput/ReasonInput'

function Issue() {
    const navigate = useNavigate()
    const [reason, setReason,] = useState('')
    const [domainError, setDomainError,] = useState('')
    const [badgeName, setBadgeName] = useState('')
    const [badgeNameError, setBadgeNameError] = useState('')
    const enhancer = import.meta.env.VITE_SOLAS_DOMAIN
    const { user } = useContext(UserContext)
    const { showLoading, showToast } = useContext(DialogsContext)
    const { verifyDomain } = useVerify()
    const [badge, setBadge] = useState<Badge | null>(null)
    const params = useParams()

    const { lang } = useContext(LangContext)

    useEffect(() => {
        async function getBadgeInfo () {
            const badge = await solas.queryBadgeDetail({ id: Number(params.badgeId) })
            setBadge(badge)
        }

        if (params.badgeId) {
            getBadgeInfo()
        }
    }, [params])

    const handleCreate = async () => {}


    return (
        <Layout>
            <div className='issue-page'>
                <div className='issue-page-wrapper'>
                    <PageBack />
                    <div className='issue-title'>{ lang['IssueBadge_Title'] }</div>
                    <div className='info'>
                        <img src={ badge?.image_url } alt=""/>
                        <div className='name'>{ badge?.name }</div>
                    </div>

                    <div className='input-area'>
                        <div className='input-area-title'>{ lang['IssueBadge_Domain'] }</div>
                        <AppInput readOnly value={ badge?.domain || '' } />
                    </div>

                    <div className='input-area'>
                        <div className='input-area-title'>{ lang['IssueBadge_Reason'] }</div>
                        <ReasonInput value={reason} onChange={ (value) => { setReason(value) }} />
                    </div>

                    <AppButton kind={ BTN_KIND.primary }
                               onClick={ () => { handleCreate() } }>
                        { lang['MintBadge_Submit'] }
                    </AppButton>
                </div>
            </div>
        </Layout>
    )
}

export default Issue
