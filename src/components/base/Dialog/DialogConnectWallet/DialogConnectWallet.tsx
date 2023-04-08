import {Connector, useAccount, useConnect, useSigner, useDisconnect } from 'wagmi'
import './DialogConnectWallet.less'
import { useContext } from 'react'
import LangContext from '../../../provider/LangProvider/LangContext'
import { setLastLoginType } from '../../../../utils/authStorage'
import { useNavigate } from 'react-router-dom'

interface DialogConnectWalletProps {
    handleClose: (...rest: any[]) => any
}

function DialogConnectWallet (props: DialogConnectWalletProps) {
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const { disconnect } = useDisconnect()
    const { lang } = useContext(LangContext)
    const { isDisconnected } = useAccount()
    const navigate = useNavigate()


    const handleConnectWallet = (connector: Connector) => {
        if (isLoading && pendingConnector?.id === connector.id) return

        if (!isDisconnected) {
            disconnect()
        }

       setTimeout(() => {
           setLastLoginType('wallet')
           connect({ connector })
           props.handleClose()
       },500)
    }

    return (
        <div className='dialog-connect-wallet'>
            {connectors.map((connector) => (
                <div className={ !connector.ready  ? 'connect-item disable': 'connect-item' }
                    key={connector.id}
                    onClick={() => handleConnectWallet(connector)}>
                    <img src={ `/images/${connector.name.toLowerCase()}.png` } alt={connector.name} />
                    <div className='connect-name'>{connector.name}</div>
                    <div className='connect-des'>
                        {connector.name === 'MetaMask' ? lang['Wallet_Intro_MetaMask'] : lang['Wallet_Intro_WalletConnect']}
                    </div>
                </div>
            ))}
            <div className='connect-item' onClick={ () => { props.handleClose() ; navigate('/login'); props.handleClose() } }>
                <img src="/images/email.svg" alt="email"/>
                <div className='connect-name'>Email</div>
                <div className='connect-des'>{ lang['Login_alert'] }</div>
            </div>
        </div>
    )
}

export default DialogConnectWallet
