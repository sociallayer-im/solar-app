import { useContext, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import './Regist.less'
import langContext from '../../components/provider/LangProvider/LangContext'
import RegistForm from '../../components/compose/FormRegist'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import PageBack from '../../components/base/PageBack'
import UserContext from "../../components/provider/UserProvider/UserContext";
import {useNavigate} from "react-router-dom";

function ComponentName () {
    const { lang } = useContext(langContext)
    const { clean } = useContext(DialogsContext)
    const { user, logOut } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {

        // 如果用户已经注册过域名，将会跳转到用户的profile页面
        if (user.domain) {
            navigate(`/profile/${user.domain}`)
        }

        // 离开页面后用户没完成注册将会自动退出登录
        return () => {
            if (user.authToken && !user.domain) {
                logOut()
            }
        }
    }, [user.domain])

    useEffect(() => {
        clean('regist')


    }, [])

    return (
        <Layout>
            <div className='regist-page'>
                <div className='regist-page-bg'></div>
                <div className='regist-page-wrapper'>
                    <div className='regist-page-back'><PageBack /></div>
                    <div className='regist-page-content' >
                        <div className='title'>{ lang['Regist_Title'] }</div>
                        <div className='des' dangerouslySetInnerHTML={ { __html: lang['Domain_Rule'] } }></div>
                        <RegistForm onConfirm={(domain) => {}}></RegistForm>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ComponentName
