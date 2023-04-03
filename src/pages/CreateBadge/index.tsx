import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import PageBack from '../../components/base/PageBack'
import './CreateBadge.less'
import LangContext from '../../components/provider/LangProvider/LangContext'
import UploadImage from '../../components/compose/UploadImage/UploadImage'
import AppInput from '../../components/base/AppInput'
import UserContext from '../../components/provider/UserProvider/UserContext'
import AppButton, { BTN_KIND } from '../../components/base/AppButton/AppButton'
import useVerify from '../../hooks/verify'
import solas, { Group, Profile } from '../../service/solas'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import ReasonInput from '../../components/base/ReasonInput/ReasonInput'
import SelectCreator from '../../components/compose/SelectCreator/SelectCreator'

function CreateBadge() {
    const navigate = useNavigate()
    const [cover, setCover] = useState('')
    const [domain, setDomain,] = useState('')
    const [domainError, setDomainError,] = useState('')
    const [badgeName, setBadgeName] = useState('')
    const [reason, setReason] = useState('')
    const [creator, setCreator] = useState<Group | Profile | null>(null)
    const [badgeNameError, setBadgeNameError] = useState('')
    const enhancer = import.meta.env.VITE_SOLAS_DOMAIN
    const { user } = useContext(UserContext)
    const { showLoading, showToast } = useContext(DialogsContext)
    const { verifyDomain } = useVerify()
    const [searchParams, _] = useSearchParams()

    const { lang } = useContext(LangContext)

    useEffect(() => {
        if (!domain.length) {
            setDomainError('')
            return
        }

        const errorMsg = verifyDomain(domain, [4, 16])
        setDomainError(errorMsg || '')
    }, [domain])

    const handleCreate = async () => {
        setDomainError('')
        setBadgeNameError('')

        if (!badgeName) {
            setBadgeNameError('badge name must not empty')
            return
        }

        if (!domain) {
            setDomainError('badge domain must not empty')
            return
        }

        if (!cover) {
            showToast('please upload a badge picture')
            return
        }

        const unload = showLoading()
        try {
            const newBadge = await solas.createBadge({
                name: badgeName,
                title: badgeName,
                domain: domain + enhancer,
                image_url: cover,
                auth_token: user.authToken || '',
                content: '',
                group_id: searchParams.get('group') ? Number(searchParams.get('group') ) : undefined
            })
            unload()
            const presetAcceptor = searchParams.get('to')
            navigate(presetAcceptor ? `/issue/${newBadge.id}?to=${presetAcceptor}` : `/issue/${newBadge.id}`)
        } catch (e: any) {
            unload()
            console.log('[handleCreate]: ', e)
            showToast(e.message || 'Create fail')
        }
    }

    return (
        <Layout>
            <div className='create-badge-page'>
                <div className='create-badge-page-wrapper'>
                    <PageBack title={ lang['MintBadge_Title'] }/>

                    <div className='create-badge-page-form'>
                        <div className='input-area'>
                            <div className='input-area-title'>{ lang['MintBadge_Upload'] }</div>
                            <UploadImage
                                imageSelect={ cover }
                                confirm={(coverUrl) => { setCover(coverUrl) } }/>
                        </div>

                        <div className='input-area'>
                            <div className='input-area-title'>{ lang['MintBadge_Name_Label'] }</div>
                            <AppInput
                                clearable
                                maxLength={ 30 }
                                value={ badgeName }
                                errorMsg={ badgeNameError }
                                endEnhancer={() => <span style={ { fontSize: '12px', color: '#999' } }>
                                    { `${badgeName.length}/30` }
                                </span>
                                }
                                placeholder={ lang['MintBadge_Name_Placeholder'] }
                                onChange={ (e) => { setBadgeName(e.target.value) } } />
                        </div>

                        <div className='input-area'>
                            <div className='input-area-title'>{ lang['MintBadge_Domain_Label'] }</div>
                            <AppInput
                                clearable
                                value={ domain }
                                errorMsg={ domainError }
                                placeholder={ lang['MintBadge_Domain_Placeholder'] }
                                endEnhancer={() => <span>{ enhancer }</span>}
                                onChange={ (e) => { setDomain(e.target.value) } } />
                            <div className='input-area-des' dangerouslySetInnerHTML={{__html: lang['MintBadge_Domain_Rule']}} />
                        </div>

                        <div className='input-area'>
                            <div className='input-area-title'>{ lang['IssueBadge_Reason'] }</div>
                            <ReasonInput value={reason}  onChange={ (value) => { setReason(value) }} />
                        </div>

                        <div className='input-area'>
                            <div className='input-area-title'>{ lang['BadgeDialog_Label_Creator'] }</div>
                            <SelectCreator value={ creator } onChange={(res) => { console.log('resres', res);setCreator(res) }}/>
                        </div>

                        <AppButton kind={ BTN_KIND.primary }
                                   onClick={ () => { handleCreate() } }>
                            { lang['MintBadge_Submit'] }
                        </AppButton>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateBadge
