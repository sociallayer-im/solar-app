import {useLocation, useNavigate, useParams, useSearchParams} from 'react-router-dom'
import {useContext, useEffect, useState} from 'react'
import Layout from '../../components/Layout/Layout'
import PageBack from '../../components/base/PageBack'
import './IssueBadge.less'
import LangContext from '../../components/provider/LangProvider/LangContext'
import AppButton, {BTN_KIND} from '../../components/base/AppButton/AppButton'
import solas, {Badge, Presend} from '../../service/solas'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import UserContext from '../../components/provider/UserProvider/UserContext'
import copy from '../../utils/copy'
import IssueTypeSelectorBadge, {IssueTypeSelectorData, IssueType} from "../../components/compose/IssueTypeSelectorBadge/IssueTypeSelectorBadge";

function Issue() {
    const {user} = useContext(UserContext)
    const {showToast, showLoading} = useContext(DialogsContext)
    const [badge, setBadge] = useState<Badge | null>(null)
    const params = useParams()
    const [SearchParams, _] = useSearchParams()
    const navigate = useNavigate()
    let {state} = useLocation()

    // 处理预填接受者
    const presetAcceptor = SearchParams.get('to')
    const initIssueType = presetAcceptor ? 'issue' : ''
    const initIssues = presetAcceptor ?[presetAcceptor, ''] : ['']


    state = state || {}

    const {lang} = useContext(LangContext)

    useEffect(() => {
        async function getBadgeInfo() {
            const badge = await solas.queryBadgeDetail({id: Number(params.badgeId)})
            setBadge(badge)
        }

        if (params.badgeId) {
            getBadgeInfo()
        }
    }, [params])

    const handleCreatePresend = async (data: IssueTypeSelectorData) => {
        if (!data.presendAmount) {
            showToast('Please type in quantity')
            return
        }

        const unload = showLoading()
        try {
            const presend = await solas.createPresend({
                badge_id: badge?.id!,
                message: state.reason || '',
                counter: data.presendAmount,
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

    const handleCreateIssue = async (data: IssueTypeSelectorData) => {
        const checkedIssues = data.issues.filter(item => !!item)
        if (!checkedIssues.length) {
            showToast('Please type in issues')
            return
        }

        console.log('checkedIssues', checkedIssues)

        const unload = showLoading()
        try {
            const badgelets = await solas.issueBatch({
                badgeId: badge?.id!,
                reason: state.reason || '',
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

    const handleCreate = async (data: IssueTypeSelectorData) => {
        if (data.issueType === 'presend') {
            handleCreatePresend(data)
        }

        if (data.issueType === 'issue') {
            handleCreateIssue(data)
        }
    }

    const fallBackPath = badge?.group
        ? `/group/${ badge?.group.username}`
        : `/profile/${user.userName}`

    return (
        <Layout>
            <div className='issue-badge-page'>
                <div className='issue-page-wrapper'>
                    <PageBack historyReplace to={fallBackPath}/>
                    <div className={'issue-text'}>
                        <div className={'title'}>Create Successfully</div>
                        <div className={'des'}>Your badge have been created</div>
                    </div>
                    <IssueTypeSelectorBadge
                        initIssueType={initIssueType}
                        initIssues={initIssues}
                        onConfirm={handleCreate}
                        onCancel={() => {
                            navigate(fallBackPath, {replace: true})
                        }}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Issue
