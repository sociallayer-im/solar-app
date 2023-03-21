import { useContext, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import './Regist.less'
import langContext from '../../components/provider/LangProvider/LangContext'
import RegistForm from '../../components/compose/FormRegist'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'
import PageBack from '../../components/base/PageBack'

function ComponentName () {
    const { lang } = useContext(langContext)
    const { clean } = useContext(DialogsContext)

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
