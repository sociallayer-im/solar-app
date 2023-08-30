import Layout from '../../components/Layout/Layout'
import './BindEmail.less'
import EmailLoginForm from '../../components/compose/FormEmailLogin'
import CodeInputForm from '../../components/compose/FormCodeInput'
import LangContext from '../../components/provider/LangProvider/LangContext'
import {useContext, useState} from 'react'
import UserContext from '../../components/provider/UserProvider/UserContext'
import {deleteFallback, getPlantLoginFallBack} from '../../utils/authStorage'
import {useNavigate, useSearchParams} from 'react-router-dom'
import usePageHeight from '../../hooks/pageHeight'
import PageBack from "../../components/base/PageBack";

function BindEmail() {
    const {lang} = useContext(LangContext)
    const [loginEmail, setLoginEmail] = useState('')
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    const {heightWithoutNav} = usePageHeight()
    const [searchParams] = useSearchParams()

    const fallback = async () => {
        // 返回之前的页面
        const fallBack = window.localStorage.getItem('fallback')
        const platformLoginFallback = getPlantLoginFallBack()
        const lastLoginType = window.localStorage.getItem('lastLoginType')
        if (platformLoginFallback) {
            deleteFallback()
            window.location.href = platformLoginFallback + `?auth=${user.authToken}&account${user.wallet || user.email}&logintype=${lastLoginType}`
        } else if (fallBack && fallBack !== window.location.href) {
            const path = fallBack.replace(window.location.origin, '')
            window.localStorage.removeItem('fallback')
            navigate(path)
        } else {
            navigate('/')
        }
    }

    return <Layout>
        <div className='bind-email'>
            <div className={'login-page-back'}>
                {searchParams.get('new') ?
                    <div className={'skip'} onClick={e => {fallback()}}>{lang['Bind_Email_Skip']}</div>
                    : <PageBack onClose={() => {
                        navigate('/')
                    }}/>
                }
            </div>
            <div className='login-page-bg'></div>
            <div className='login-page-wrapper' style={{height: `${heightWithoutNav}px`}}>
                {!loginEmail ?
                    <div className='login-page-content'>
                        <div className='title'>{lang['Bind_Email_Title']}</div>
                        <div className='des'>{lang['Bind_Email_Des']}</div>
                        <EmailLoginForm
                            type={'binding'}
                            onConfirm={(email) => {
                                setLoginEmail(email)
                            }}/>
                    </div>
                    :
                    <div className='login-page-content code'>
                        <div className='title'>{lang['Login_input_Code_title']}</div>
                        <div className='des'>{lang['Login_input_Code_des']([loginEmail])}</div>
                        <CodeInputForm
                            fallback={searchParams.get('new') ? fallback : undefined}
                            type={'binding'}
                            loginEmail={loginEmail}/>
                    </div>
                }
            </div>
        </div>
    </Layout>
}

export default BindEmail
