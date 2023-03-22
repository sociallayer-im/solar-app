import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import PageBack from '../../components/base/PageBack'
import './Issue.less'
import LangContext from '../../components/provider/LangProvider/LangContext'
import AppInput from '../../components/base/AppInput'
import AppButton, { BTN_KIND } from '../../components/base/AppButton/AppButton'
import solas, {Badge, issueBatch} from '../../service/solas'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import UserContext from '../../components/provider/UserProvider/UserContext'
import ReasonInput from '../../components/base/ReasonInput/ReasonInput'
import IssueTypeTabs from '../../components/base/IssueTypeTabs'
import { Tab } from 'baseui/tabs'
import AmountInput from '../../components/base/AmountInput/AmountInput'
import IssuesInput from '../../components/base/IssuesInput/IssuesInput'

function Issue() {
    const [reason, setReason,] = useState('')
    const { user } = useContext(UserContext)
    const { showToast, showLoading } = useContext(DialogsContext)
    const [badge, setBadge] = useState<Badge | null>(null)
    const params = useParams()
    const [SearchParams, _] = useSearchParams()
    const [presendAmount, setPresendAmount] = useState<number | string>(0)
    const [issueType, setIssueType] = useState('presend')
    const [issues, setIssues] = useState<string[]>([''])
    const navigate = useNavigate()

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

    useEffect(() => {
        const presetAcceptor = SearchParams.get('to')
        if (presetAcceptor) {
            setIssues([presetAcceptor, ''])
            setIssueType('domain')
        }
    }, [])

    const handleCreatePresend = async () => {
        if (!presendAmount) {
            showToast('Please type in quantity')
            return
        }
        if (!reason) {
            showToast('Please type in reason')
            return
        }

        const unload = showLoading()
        try {
            const presend = await solas.createPresend({
                badge_id: badge?.id!,
                message: reason,
                counter: presendAmount,
                auth_token: user.authToken || ''
            })
            unload()
            navigate(`/issue-success?presend=${presend.id}`)
        } catch (e: any) {
            console.log('[handleCreatePresend]: ', e)
            unload()
            showToast(e.message || 'Create presend fail')
        }
    }

    const handleCreateIssue = async () => {
        if (!reason) {
            showToast('Please type in reason')
            return
        }

        const checkedIssues = issues.filter(item => !!item)
        if (!checkedIssues.length) {
            showToast('Please type in issues')
            return
        }

        console.log('checkedIssues', checkedIssues)

        const unload = showLoading()
        try {
            const badgelets = await solas.issueBatch({
                badgeId: badge?.id!,
                reason: reason,
                issues: checkedIssues,
                auth_token: user.authToken || ''
            })
            unload()
            navigate(`/issue-success?badgelet=${badgelets[0].id}&amount=${badgelets.length}`)
        } catch (e: any) {
            console.log('[handleCreateIssue]: ', e)
            unload()
            showToast(e.message || 'Issue fail')
        }
    }

    const handleCreate = async () => {
        if (issueType === 'presend') {
            handleCreatePresend()
        } else {
            handleCreateIssue()
        }
    }

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
                        <ReasonInput value={reason}  onChange={ (value) => { setReason(value) }} />
                    </div>

                    <div className='input-area'>
                        <div className='input-area-title'>{ lang['IssueBadge_Issuees'] }</div>

                        <IssueTypeTabs activeKey={issueType}
                                       onChange={ (key) => { setIssueType(key.activeKey.toString()) } }>
                            <Tab key='presend' title={ lang['IssueBadge_Sendwithlink'] }>
                                <div className='issues-des'>
                                    { lang['Presend_step'] }
                                </div>
                                <AmountInput value={ presendAmount }
                                    onChange={ (newValue) => { setPresendAmount(newValue) } }/>
                            </Tab>
                            <Tab key='domain' title={ lang['IssueBadge_Sendwithdomain'] }>
                                <div className='issues-des'>
                                    { lang['IssueBadge_Input_Des'] }
                                </div>
                                <IssuesInput value={ issues }
                                    onChange={ (newIssues) => { setIssues(newIssues) } } />
                            </Tab>
                        </IssueTypeTabs>
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
