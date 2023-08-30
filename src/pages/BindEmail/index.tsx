import Layout from '../../components/Layout/Layout'
import './BindEmail.less'
import EmailLoginForm from '../../components/compose/FormEmailLogin'
import CodeInputForm from '../../components/compose/FormCodeInput'
import LangContext from '../../components/provider/LangProvider/LangContext'
import {useContext, useState} from 'react'
import {EmailLoginRes} from '../../service/solas'
import UserContext from '../../components/provider/UserProvider/UserContext'
import {setAuth} from '../../utils/authStorage'
import {useNavigate} from 'react-router-dom'
import usePageHeight from '../../hooks/pageHeight'
import PageBack from "../../components/base/PageBack";

function BindEmail() {
    const {lang} = useContext(LangContext)
    const [loginEmail, setLoginEmail] = useState('')
    const {setUser, user, emailLogin} = useContext(UserContext)
    const navigate = useNavigate()
    const {heightWithoutNav} = usePageHeight()

    const setEmailAuth = async (loginRes: EmailLoginRes) => {
        window.localStorage.setItem('lastLoginType', 'email')
        setAuth(loginRes.email, loginRes.auth_token)

        await emailLogin()
    }

    return <Layout>
        <div className='bind-email'>
            <div className={'login-page-back'}><PageBack onClose={() => {
                navigate('/')
            }}/></div>
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
                            type={'binding'}
                            loginEmail={loginEmail}/>
                    </div>
                }
            </div>
        </div>
    </Layout>
}

export default BindEmail
