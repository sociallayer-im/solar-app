import Layout from '../../components/Layout/Layout'
import { useConnect, useAccount } from 'wagmi'
import useLang , { LangType } from '../../hooks/lang/lang'
import { useContext, useEffect, useState} from 'react'
import UserContext from '../../components/provider/UserProvider/UserContext'
import DialogsContext from '../../components/provider/DialogProvider/DialogsContext'

function Home () {
    const { address, isConnected } = useAccount()
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()

    const { lang, switchLang, langType } = useLang()
    const { user, setUser } = useContext(UserContext)
    const { openConnectWalletDialog, showLoading, showToast } = useContext(DialogsContext)

    const handleLangChange = () => {
        switchLang(langType === 'cn' ? LangType.en : LangType.cn)
    }

    const [email, setEmail] = useState('')
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value)
    }

    useEffect(() => {

    })

    return <Layout>
        <div>
            <button onClick={() => { showLoading(3000)} }>show loading</button>
            <button onClick={() => { showToast('show toastshow toastshow toastshow toast',100000)} }>show toast</button>
            <div onClick={handleLangChange}>{lang['Wallet_Intro_MetaMask']}</div>
            <div >langType: { langType }</div>
            {error && <div>{ error.message }</div>}

            <div >user Info:  { JSON.stringify(user) }</div>
        </div>
    </Layout>
}

export default Home
