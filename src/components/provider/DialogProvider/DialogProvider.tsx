import { ReactNode, useEffect, useState } from 'react'
import Dialog from '../../base/Dialog/Dialog'
import Toast from '../../base/Toast'
import DialogConnectWallet from '../../base/DialogConnectWallet/DialogConnectWallet'
import ToastLoading from '../../base/ToastLoading'
import DialogConfirm, { DialogConfirmProps } from '../../base/DialogConfirm/DialogConfirm'
import DialogsContext, { DialogsContextType } from './DialogsContext'
import { Badge, Badgelet, Presend, Profile } from '../../../service/solas'
import DetailBadgelet from '../../compose/Detail/DetailBadgelet'
import DetailPresend from '../../compose/Detail/DetailPresend'
import DetailBadge from '../../compose/Detail/DetailBadge'
import DialogAvatar from '../../base/DialogAvatar'
import DialogCropper from '../../base/DialogCropper'

export interface DialogProviderProps {
    children: ReactNode
}

function DialogProvider (props: DialogProviderProps) {
    const [dialogsGroup, setDialogsGroup] = useState<{dialogs: ((index: number)=>ReactNode)[]}>({ dialogs: [] })

    useEffect(() => {
        document.body.style.overflow = dialogsGroup.dialogs[0] ? 'hidden' : 'auto'

        return () => { document.body.style.overflow = 'auto' }
    }, [dialogsGroup])

    const closeDialogByID = (dialogID: number) => {
        if (dialogsGroup.dialogs.length) {
             dialogsGroup.dialogs.pop()
            setDialogsGroup({...dialogsGroup})
        }
    }

    const openDialog = (openDialogProps: { content: (close: any) => ReactNode, size?: number[] } ) => {
        dialogsGroup.dialogs.push((index: number) => {
            const close = () => {
                closeDialogByID(index)
            }

            const props = {
                dialogID: index,
                key: index.toString(),
                size: openDialogProps.size || [320, 450],
                handleClose: close
            }

            return (
                <Dialog {...props} >
                    { openDialogProps.content(close) }
                </Dialog>
            )
        })
        setDialogsGroup({...dialogsGroup})
    }

    const openConnectWalletDialog = () => {
        dialogsGroup.dialogs.push((index: number) => {
            const close = () => {
                closeDialogByID(index)
            }

            const props = {
                dialogID: index,
                key: index.toString(),
                size: [320, 450],
                handleClose: close
            }

            return (
                <Dialog {...props} >
                    <DialogConnectWallet  handleClose={close} />
                </Dialog>
            )
        })

        setDialogsGroup({...dialogsGroup})
    }

    const showLoading = () => {
        let id = -1
        dialogsGroup.dialogs.push((index) => {
            id = index
            const props = {
                dialogID: index,
                key: index.toString(),
                size: [76, 76],
                noShell: true
            }

            return (
                <Dialog {...props} >
                    <ToastLoading />
                </Dialog>
            )
        })


        setDialogsGroup({...dialogsGroup})
        return () => { closeDialogByID(id) }
    }

    const showToast = (text: string, duration?: number) => {
        let closeToast = () => {}
        let timeOut: any = null
        dialogsGroup.dialogs.push((index) => {
            const close = () => {
                timeOut && clearTimeout(timeOut)
                closeDialogByID(index)
            }

            closeToast = close

            const props = {
                dialogID: index,
                key: index.toString(),
                maxSize: ['300px', 'auto'],
                noShell: true,
                handleClose: close
            }

            return (
                <Dialog { ...props } >
                    <Toast text={ text }></Toast>
                </Dialog>
            )
        })


        setDialogsGroup({...dialogsGroup})
        duration = duration || 3000
            try {
                timeOut = setTimeout(() => {
                    closeToast()
                }, duration)
            } catch (e) { }
    }

    const openConfirmDialog = (props: DialogConfirmProps) => {
        dialogsGroup.dialogs.push((index) => {
            const close = () => {
                closeDialogByID(index)
            }

            if (props.onCancel) {
                const propsClose = props.onCancel
                props.onCancel = () => {
                    propsClose()
                    close()
                }
            } else {
                props.onCancel = close
            }

            const dialogProps = {
                dialogID: index,
                key: index.toString(),
                size: [340, 'auto'],
                handleClose: close
            }

            return (
                <Dialog { ...dialogProps } >
                    <DialogConfirm { ...props } />
                </Dialog>
            )
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showBadgelet = (props: Badgelet) => {
        dialogsGroup.dialogs.push((index) => {
            const close = () => {
                closeDialogByID(index)
            }

            const dialogProps = {
                dialogID: index,
                key: index.toString(),
                size: [340, 'auto'],
                handleClose: close
            }

            return (
                <Dialog { ...dialogProps } >
                    <DetailBadgelet badgelet={ props } handleClose={ close } />
                </Dialog>
            )
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showPresend = (props: Presend) => {
        dialogsGroup.dialogs.push((index) => {
            const close = () => {
                closeDialogByID(index)
            }

            const dialogProps = {
                dialogID: index,
                key: index.toString(),
                size: [340, 'auto'],
                handleClose: close
            }

            return (
                <Dialog { ...dialogProps } >
                    <DetailPresend presend={ props } handleClose={ close } />
                </Dialog>
            )
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showBadge = (props: Badge) => {
        dialogsGroup.dialogs.push((index) => {
            const close = () => {
                closeDialogByID(index)
            }

            const dialogProps = {
                dialogID: index,
                key: index.toString(),
                size: ['100%', 'auto'],
                handleClose: close
            }

            return (
                <Dialog { ...dialogProps } >
                    <DetailBadge badge={ props } handleClose={ close } />
                </Dialog>
            )
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showAvatar = (props: Profile) => {
        dialogsGroup.dialogs.push((index) => {
            const close = () => {
                closeDialogByID(index)
            }

            const dialogProps = {
                dialogID: index,
                key: index.toString(),
                size: [316, 316],
            }

            return (
                <Dialog { ...dialogProps } >
                    <DialogAvatar profile={ props } handleClose={ close } />
                </Dialog>
            )
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showCropper = (props: { imgURL: string, onConfirm: (data:Blob, close: () => any) => {} } ) => {
        dialogsGroup.dialogs.push((index) => {
            const close = () => {
                closeDialogByID(index)
            }

            const dialogProps = {
                dialogID: index,
                key: index.toString(),
                size: ['100%', '100%'],
            }

            return (
                <Dialog { ...dialogProps } >
                    <DialogCropper imgURL={ props.imgURL } handleClose={ close } handleConfirm={props.onConfirm} />
                </Dialog>
            )
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const contextValue: DialogsContextType = {
        openConnectWalletDialog,
        showLoading,
        showToast,
        openConfirmDialog,
        openDialog,
        showBadgelet,
        showPresend,
        showBadge,
        showAvatar,
        showCropper
    }

    return (
        <DialogsContext.Provider value={ contextValue }>
            { props.children }
            { dialogsGroup.dialogs.map((item: any, index) => {
                return item(index)
            }) }
        </DialogsContext.Provider>
    )
}

export default DialogProvider
