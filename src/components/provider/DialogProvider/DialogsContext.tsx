import { createContext } from 'react'

export interface DialogsContextType {
    openConnectWalletDialog: (...rest: any[]) => any
    showLoading: (...rest: any[]) => (() => any)
    showToast: (...rest: any[]) => any,
    openDomainConfirmDialog: (...rest: any[]) => any,
    openConfirmDialog: (...rest: any[]) => any,
    openDialog: (...rest: any[]) => any,
    showBadgelet: (...rest: any[]) => any,
    showPoint: (...rest: any[]) => any,
    showPointItem: (...rest: any[]) => any,
    showNftpasslet: (...rest: any[]) => any,
    showPresend: (...rest: any[]) => any,
    showBadge: (...rest: any[]) => any
    showNftpass: (...rest: any[]) => any
    showAvatar: (...rest: any[]) => any
    showCropper: (...rest: any[]) => any,
    showInvite: (...rest: any[]) => any,
    showGroupSetting: (...rest: any[]) => any,
    clean: (msg?: string) => any
}

const DialogsContext  = createContext<DialogsContextType>({
    openConnectWalletDialog: () => {},
    showLoading: () => (() => {}),
    showToast: () => {},
    openDomainConfirmDialog: () => {},
    openConfirmDialog: () => {},
    openDialog: () => {},
    showBadgelet: () => {},
    showPointItem: () => {},
    showPoint: () => {},
    showPresend: () => {},
    showBadge: () => {},
    showNftpass: () => {},
    showNftpasslet: () => {},
    showAvatar: () => {},
    showCropper: () => {},
    showInvite: () => {},
    showGroupSetting: () => {},
    clean: (msg?: string) => {}
})

export default DialogsContext
