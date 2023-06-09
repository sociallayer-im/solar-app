import {useLocation, useNavigate, useParams, useSearchParams} from 'react-router-dom'
import {useContext, useEffect, useState} from 'react'
import Layout from '../../components/Layout/Layout'
import PageBack from '../../components/base/PageBack'
import './IssuePoint.less'
import LangContext from '../../components/provider/LangProvider/LangContext'
import AppButton, {BTN_KIND} from '../../components/base/AppButton/AppButton'
import solas, {Badge, Presend} from '../../service/solas'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import UserContext from '../../components/provider/UserProvider/UserContext'
import copy from '../../utils/copy'
import IssueTypeSelectorPoint, {IssueTypeSelectorData, IssueType} from "../../components/compose/IssueTypeSelectorPoint/IssueTypeSelectorPoint";

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

    const handleCreate = async (data: IssueTypeSelectorData) => {
        const checkedIssues = data.issues.filter(item => !!item)
        if (!checkedIssues.length) {
            showToast('Please type in issues')
            return
        }

        console.log('checkedIssues', checkedIssues)

        // const unload = showLoading()

    }

    const fallBackPath = badge?.group
        ? `/group/${ badge?.group.username}`
        : `/profile/${user.userName}`

    return (
        <Layout>
            <div className='issue-point-page'>
                <div className='issue-page-wrapper'>
                    <PageBack historyReplace to={fallBackPath}/>
                    <div className={'issue-text'}>
                        <div className={'title'}>Create Successfully</div>
                        <div className={'des'}>Your Points have been created</div>
                    </div>
                    <IssueTypeSelectorPoint
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
