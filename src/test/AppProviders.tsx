import {useNavigate} from 'react-router-dom'
import {useStyletron} from 'baseui'
import {useState, useContext, useEffect} from 'react'
import LangProvider from '../components/provider/LangProvider/LangProvider'
import DialogProvider from  '../components/provider/DialogProvider/DialogProvider'
import UserProvider from '../components/provider/UserProvider/UserProvider'
import { mainnet, moonbeam } from 'wagmi/chains'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { publicProvider } from 'wagmi/providers/public'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { BaseProvider } from 'baseui'
import theme from '../theme'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const engine = new Styletron();

const walletconnect = new WalletConnectConnector({
    chains: [mainnet, moonbeam],
    options: {},
})

const inject = new InjectedConnector({
    chains: [mainnet, moonbeam],
})

const { chains, provider } = configureChains(
    [mainnet, moonbeam],
    [publicProvider()],
)

const wagmiClient = createClient({
    autoConnect: true,
    connectors: [inject, walletconnect],
    provider,
})

interface AppProvidersProps {
    children?: any
}

function AppProviders (props: AppProvidersProps) {
    return (
        <BrowserRouter>
            <WagmiConfig client={ wagmiClient }>
                <StyletronProvider value={ engine }>
                    <BaseProvider theme={ theme }>
                        <DialogProvider>
                            <UserProvider>
                                <LangProvider>
                                    <DialogProvider>
                                        <Routes>
                                            <Route path="*" element={ props.children } />
                                        </Routes>
                                    </DialogProvider>
                                </LangProvider>
                            </UserProvider>
                        </DialogProvider>
                    </BaseProvider>
                </StyletronProvider>
            </WagmiConfig>
        </BrowserRouter>
    )
}

export default AppProviders
