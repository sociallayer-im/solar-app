import { createContext } from 'react'

export interface DialogsContextType {
    openConnectWalletDialog: (...rest: any[]) => any
    showLoading: (...rest: any[]) => (() => any)
    showToast: (...rest: any[]) => any,
    openConfirmDialog: (...rest: any[]) => any,
    openDialog: (...rest: any[]) => any,
    showBadgelet: (...rest: any[]) => any,
    showPresend: (...rest: any[]) => any,
    showBadge: (...rest: any[]) => any
}

const DialogsContext  = createContext<DialogsContextType>({
    openConnectWalletDialog: () => {},
    showLoading: () => (() => {}),
    showToast: () => {},
    openConfirmDialog: () => {},
    openDialog: () => {},
    showBadgelet: () => {},
    showPresend: () => {},
    showBadge: () => {}
})

export default DialogsContext
