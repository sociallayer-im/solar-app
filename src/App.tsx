import AppRouter from './routers'
import { mainnet, moonbeam } from 'wagmi/chains'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { publicProvider } from 'wagmi/providers/public'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import UserProvider from './components/provider/UserProvider/UserProvider'
import DialogProvider from './components/provider/DialogProvider/DialogProvider'
import LangProvider from './components/provider/LangProvider/LangProvider'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { BaseProvider } from 'baseui'
import theme from './theme'

const engine = new Styletron();

const walletconnect = new WalletConnectConnector({
    chains: [mainnet, moonbeam],
    options: {
        qrcode: true,
    },
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

function App() {
  return (
      <div id="solas">
          <WagmiConfig client={ wagmiClient }>
              <StyletronProvider value={ engine }>
                  <BaseProvider theme={ theme }>
                      <DialogProvider>
                          <UserProvider>
                              <LangProvider>
                                  <DialogProvider>
                                      <AppRouter />
                                  </DialogProvider>
                              </LangProvider>
                        </UserProvider>
                      </DialogProvider>
                  </BaseProvider>
              </StyletronProvider>
          </WagmiConfig>
      </div>
  )
}

export default App
