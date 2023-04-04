import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import PageBack from '../../components/base/PageBack'
import './CreateBadge.less'
import LangContext from '../../components/provider/LangProvider/LangContext'
import AppButton, { BTN_KIND } from '../../components/base/AppButton/AppButton'
import solas, {Badge, Group, Profile} from '../../service/solas'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import ReasonInput from '../../components/base/ReasonInput/ReasonInput'
import DetailPrefillBadge from '../../components/base/DetailPrefillBadge/DetailPrefillBadge'

interface CreateBadgeWithPrefillProp {
    badgeId: number
}
function CreateBadgeWithPrefill(props: CreateBadgeWithPrefillProp) {
    const navigate = useNavigate()
    const [reason, setReason] = useState('')
    const { showLoading } = useContext(DialogsContext)
    const [searchParams, _] = useSearchParams()
    const [preFillBadge,setPreFillBadge] = useState<Badge | null>(null)

    const { lang } = useContext(LangContext)

    useEffect(() => {
        async function getBadgeDetail () {
            const unload = showLoading()
           try {
               const badge = await  solas.queryBadgeDetail({ id: props.badgeId })
               setPreFillBadge(badge)
               setReason(badge.content)
           } finally {
               unload()
           }
        }

        getBadgeDetail()
    }, [])

    const handleCreate = async () => {
        const presetAcceptor = searchParams.get('to')
        navigate(presetAcceptor ? `/issue/${props.badgeId}?to=${presetAcceptor}` : `/issue/${props.badgeId}`, { state: { reason: reason }})
    }

    return (
        <Layout>
            {  !!preFillBadge &&
                <div className='create-badge-page'>
                    <div className='create-badge-page-wrapper'>
                        <PageBack title={ lang['MintBadge_Title'] }/>
                        <DetailPrefillBadge badge={preFillBadge} />
                        <div className='create-badge-page-form'>
                            <div className='input-area'>
                                <div className='input-area-title'>{ lang['IssueBadge_Reason'] }</div>
                                <ReasonInput value={ reason }  onChange={ (value) => { setReason(value) }} />
                            </div>

                            <AppButton kind={ BTN_KIND.primary }
                                       special
                                       onClick={ () => { handleCreate() } }>
                                { lang['MintBadge_Submit'] }
                            </AppButton>
                        </div>
                    </div>
                </div>
            }
        </Layout>
    )
}

export default CreateBadgeWithPrefill
