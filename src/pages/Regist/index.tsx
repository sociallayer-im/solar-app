import { useNavigate } from 'react-router-dom'
import { useStyletron} from 'baseui'
import { useState , useContext, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import './Regist.less'
import langContext from '../../components/provider/LangProvider/LangContext'
import RegistForm from '../../components/compose/FormRegist'

function ComponentName () {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const [a, seta] = useState('')
    const { lang } = useContext(langContext)

    useEffect(() => {

    }, [])

    return (
        <Layout>
            <div className='regist-page'>
                <div className='regist-page-bg'></div>
                <div className='regist-page-wrapper'>
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
