import { useNavigate } from 'react-router-dom'
import { useStyletron } from 'baseui'
import { useState, useContext, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import PageBack from '../../components/base/PageBack'
import './CreateBadge.less'
import LangContext from '../../components/provider/LangProvider/LangContext'
import UploadImage from '../../components/base/UploadImage'
import AppInput from '../../components/base/AppInput'
import userContext from '../../components/provider/UserProvider/UserContext'
import AppButton, { BTN_KIND } from '../../components/base/AppButton'

function CreateBadge() {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const [a, seta] = useState('')
    const [cover, setCover] = useState('')
    const [domain, setDomain,] = useState('')
    const [badgeName, setBadgeName] = useState('')
    const enhancer = import.meta.env.VITE_SOLAS_DOMAIN
    const { user } = useContext(userContext)

    const { lang } = useContext(LangContext)

    useEffect(() => {

    }, [])

    return (
        <Layout>
            <div className='create-badge-page'>
                <div className='create-badge-page-wrapper'>
                    <PageBack />
                    <div className='create-badge-title'>{ lang['MintBadge_Title'] }</div>
                    <div></div>
                    <div className='upload-image'>
                        <UploadImage confirm={(coverUrl) => { setCover(coverUrl) } }/>
                    </div>

                    <div className='input-area'>
                        <div className='input-area-title'>{ lang['MintBadge_Name_Label'] }</div>
                        <AppInput
                            clearable
                            maxLength={30}
                            value={ badgeName }
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
                            placeholder={ lang['MintBadge_Domain_Placeholder'] }
                            endEnhancer={() => <span>{ enhancer }</span>}
                            onChange={ (e) => { setDomain(e.target.value) } } />
                        <div className='input-area-des' dangerouslySetInnerHTML={{__html: lang['MintBadge_Domain_Rule']}} />
                    </div>

                    <div className='input-area'>
                        <div className='input-area-title'>{ lang['BadgeDialog_Label_Creator'] }</div>
                        <AppInput
                            clearable
                            readOnly
                            value={ user.domain || '' } />
                    </div>

                    <AppButton kind={ BTN_KIND.primary }>{ lang['MintBadge_Submit'] }</AppButton>
                </div>
            </div>
        </Layout>
    )
}

export default CreateBadge
