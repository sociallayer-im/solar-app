import { ReactNode, useEffect, useState } from 'react'
import {
    Badge,
    Badgelet,
    Invite,
    Presend,
    Profile,
    Group,
    NftPass,
    Point,
    PointItem,
    NftPasslet
} from '../../../service/solas'
import DialogsContext, { DialogsContextType } from './DialogsContext'
import DialogDomainConfirm, { DialogConfirmDomainProps } from '../../base/Dialog/DialogConfirmDomain/DialogConfirmDomain'
import DialogConfirm, { DialogConfirmProps } from '../../base/Dialog/DialogConfirm/DialogConfirm'
import Dialog from '../../base/Dialog/Dialog'
import Toast from '../../base/Toast'
import DialogConnectWallet from '../../base/Dialog/DialogConnectWallet/DialogConnectWallet'
import ToastLoading from '../../base/ToastLoading'
import DetailBadgelet from '../../compose/Detail/DetailBadgelet'
import DetailPresend from '../../compose/Detail/DetailPresend'
import DetailBadge from '../../compose/Detail/DetailBadge/DetailBadge'
import DialogAvatar from '../../base/Dialog/DialogAvatar'
import DialogCropper from '../../base/Dialog/DialogCropper/DialogCropper'
import DetailInvite from '../../compose/Detail/DetailInvite'
import DialogGroupSetting from '../../base/Dialog/DialogGroupSetting/DialogGroupSetting'
import DetailNftpass from "../../compose/Detail/DetailNftpass/DetailNftpass";
import DetailNftpasslet from "../../compose/Detail/DetailNftpasslet";
import DetailPoint from "../../compose/Detail/DetailPoint";
import DetailPointItem from "../../compose/Detail/DetailPointItem";
import DialogNftCheckIn from "../../base/Dialog/DialogNftCheckIn/DialogNftCheckIn";

export interface DialogProviderProps {
    children: ReactNode
}

interface Dialog {
    id: number,
    content: () => ReactNode
}

export interface OpenDialogProps {
    content: (close: any) => ReactNode,
    size?: (number | string)[],
    position?: 'bottom' | 'center'
}

function genID () {
    return parseInt((Math.random()*(99999 - 10000 + 1) + 10000).toString())
}

function DialogProvider (props: DialogProviderProps) {
    const [dialogsGroup, setDialogsGroup] = useState<{dialogs: Dialog[]}>({ dialogs: [] })

    useEffect(() => {
        document.body.style.overflow = dialogsGroup.dialogs[0] ? 'hidden' : 'auto'

        return () => { document.body.style.overflow = 'auto' }
    }, [dialogsGroup])

    const closeDialogByID = (dialogID: number) => {
        if (dialogsGroup.dialogs.length) {
            let targetIndex: null | number = null
            dialogsGroup.dialogs.forEach((item, index) => {
                if (item.id === dialogID) {
                    targetIndex = index
                }
            })

            if ( targetIndex === null ) return
            const copy = { ...dialogsGroup}
            copy.dialogs.splice(targetIndex, 1)
            setDialogsGroup(copy)
        }
    }

    const clean = (message?: string) => {
        console.log('clean:', message)
        const copy = { ...dialogsGroup}
        copy.dialogs = []
        setTimeout(() => {
            setDialogsGroup(copy)
        }, 200)
    }

    const openDialog = (openDialogProps: OpenDialogProps ) => {
        const id = genID()
        dialogsGroup.dialogs.push({
            id: id,
            content: () => {
                const close = () => {
                    closeDialogByID(id)
                }

                const props = {
                    key: id.toString(),
                    size: openDialogProps.size || [320, 450],
                    position: openDialogProps.position || undefined,
                    handleClose: close
                }

                return (
                    <Dialog {...props} >
                        { (close) => openDialogProps.content(close) }
                    </Dialog>
                )
            }
        })
        setDialogsGroup({...dialogsGroup})
    }

    const openConnectWalletDialog = () => {
        const id = genID()
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const close = () => {
                    closeDialogByID(id)
                }

                const props = {
                    key: id.toString(),
                    size: [320, 450],
                    handleClose: close,
                    position: 'bottom' as const
                }

                return (
                    <Dialog {...props} >
                        { (close) => <DialogConnectWallet  handleClose={close} />}
                    </Dialog>
                )
            }
        })

        setDialogsGroup({...dialogsGroup})
    }

    const showLoading = () => {
        const id = genID()
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const props = {
                    key: id.toString(),
                    size: [76, 76],
                    noShell: true
                }

                return (
                    <Dialog {...props} >
                        { (close) => <ToastLoading /> }
                    </Dialog>
                )
            }
        })

        setDialogsGroup({...dialogsGroup})
        return () => { closeDialogByID(id) }
    }

    const showToast = (text: string, duration?: number) => {
        const id = genID()
        let closeToast = () => {}
        let timeOut: any = null
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const close = () => {
                    !!timeOut && clearTimeout(timeOut)
                    closeDialogByID(id)
                }

                closeToast = close

                const props = {
                    key: id.toString(),
                    maxSize: ['300px', 'auto'],
                    noShell: true,
                    handleClose: close
                }

                return (
                    <Dialog { ...props } >
                        { (close) => <Toast text={ text }></Toast> }
                    </Dialog>
                )
            }
        })


        setDialogsGroup({...dialogsGroup})
        duration = duration || 3000
            try {
                timeOut = setTimeout(() => {
                    closeToast()
                }, duration)
            } catch (e) { }
    }

    const openDomainConfirmDialog = (props: DialogConfirmDomainProps) => {
        const id = genID()
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const close = () => {
                    closeDialogByID(id)
                }

                const dialogProps = {
                    key: id.toString(),
                    size: [340, 'auto'],
                    handleClose: close
                }

                return (
                    <Dialog { ...dialogProps } >
                        { (close) => <DialogDomainConfirm { ...props }
                                                    onCancel={ ()=> { close(); props.onCancel &&  props.onCancel()} }/> }
                    </Dialog>
                )
            }
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const openConfirmDialog = (props: DialogConfirmDomainProps) => {
        const id = genID()
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const close = () => {
                    closeDialogByID(id)
                }

                const dialogProps = {
                    key: id.toString(),
                    size: [340, 'auto'],
                    handleClose: close
                }

                return (
                    <Dialog { ...dialogProps } >
                        { (close) => <DialogConfirm { ...props }
                                                          onCancel={ ()=> { close(); props.onCancel &&  props.onCancel()} }/> }
                    </Dialog>
                )
            }
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showBadgelet = (props: Badgelet) => {
        const id = genID()
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const close = () => {
                    closeDialogByID(id)
                }

                const dialogProps = {
                    key: id.toString(),
                    size: [460, 'auto'],
                    handleClose: close,
                    position: 'bottom' as const
                }

                return (
                    <Dialog { ...dialogProps } >
                        { (close) => <DetailBadgelet badgelet={ props } handleClose={ close } /> }
                    </Dialog>
                )
            }
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showPointItem = (props: PointItem) => {
        const id = genID()
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const close = () => {
                    closeDialogByID(id)
                }

                const dialogProps = {
                    key: id.toString(),
                    size: [460, 'auto'],
                    handleClose: close,
                    position: 'bottom' as const
                }

                return (
                    <Dialog { ...dialogProps } >
                        { (close) => <DetailPointItem pointItem={ props } handleClose={ close } /> }
                    </Dialog>
                )
            }
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showPoint = (props: Point) => {
        const id = genID()
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const close = () => {
                    closeDialogByID(id)
                }

                const dialogProps = {
                    key: id.toString(),
                    size: [460, 'auto'],
                    handleClose: close,
                    position: 'bottom' as const
                }

                return (
                    <Dialog { ...dialogProps } >
                        { (close) => <DetailPoint point={ props } handleClose={ close } /> }
                    </Dialog>
                )
            }
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showNftpasslet = (props: NftPasslet) => {
        const id = genID()
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const close = () => {
                    closeDialogByID(id)
                }

                const dialogProps = {
                    key: id.toString(),
                    size: [460, 'auto'],
                    handleClose: close,
                    position: 'bottom' as const
                }

                return (
                    <Dialog { ...dialogProps } >
                        { (close) => <DetailNftpasslet nftpasslet={ props } handleClose={ close } /> }
                    </Dialog>
                )
            }
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showInvite = (props: Invite) => {
        const id = genID()
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const close = () => {
                    closeDialogByID(id)
                }

                const dialogProps = {
                    key: id.toString(),
                    size: [460, 'auto'],
                    handleClose: close,
                    position: 'bottom' as const
                }

                return (
                    <Dialog { ...dialogProps } >
                        { (close) =>  <DetailInvite invite={ props } handleClose={ close } /> }
                    </Dialog>
                )
            }
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showPresend = (props: Presend, code?: string) => {
        const id = genID()
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const close = () => {
                    closeDialogByID(id)
                }

                const dialogProps = {
                    key: id.toString(),
                    size: [460, 'auto'],
                    handleClose: close,
                    position: 'bottom' as const
                }

                return (
                    <Dialog { ...dialogProps } >
                        { (close) => <DetailPresend presend={ props } code={ code } handleClose={ close } /> }
                    </Dialog>
                )
            }
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showBadge = (props: Badge) => {
        const id = genID()
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const close = () => {
                    closeDialogByID(id)
                }

                const dialogProps = {
                    key: id.toString(),
                    size: [460, 'auto'],
                    handleClose: close,
                    position: 'bottom' as const
                }

                return (
                    <Dialog { ...dialogProps } >
                        { (close) => <DetailBadge badge={ props } handleClose={ close } /> }
                    </Dialog>
                )
            }
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showNftpass = (props: NftPass) => {
        const id = genID()
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const close = () => {
                    closeDialogByID(id)
                }

                const dialogProps = {
                    key: id.toString(),
                    size: [460, 'auto'],
                    handleClose: close,
                    position: 'bottom' as const
                }

                return (
                    <Dialog { ...dialogProps } >
                        { (close) => <DetailNftpass nftpass={ props } handleClose={ close } /> }
                    </Dialog>
                )
            }
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showAvatar = (props: Profile) => {
        const id = genID()
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const close = () => {
                    closeDialogByID(id)
                }

                const dialogProps = {
                    key: id.toString(),
                    size: [316, 316],
                }

                return (
                    <Dialog { ...dialogProps } >
                        { (transitionClose) => <DialogAvatar profile={ props } handleClose={ close } /> }
                    </Dialog>
                )
            }
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showCropper = (props: { imgURL: string, onConfirm: (data:Blob, close: () => any) => {} } ) => {
        const id = genID()
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const close = () => {
                    closeDialogByID(id)
                }

                const dialogProps = {
                    key: id.toString(),
                    size: ['343px', '388px'],
                }

                return (
                    <Dialog { ...dialogProps } >
                        { () => <DialogCropper
                            imgURL={ props.imgURL }
                            handleClose={ close }
                            handleConfirm={props.onConfirm} /> }
                    </Dialog>
                )
            }
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showGroupSetting = (group: Group) => {
        const id = genID()
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const close = () => {
                    closeDialogByID(id)
                }

                const dialogProps = {
                    key: id.toString(),
                    size: ['100%', '100%'],
                    handleClose: close
                }

                return (
                    <Dialog { ...dialogProps } >
                        { (close) => <DialogGroupSetting group={group} handleClose={ close }/> }
                    </Dialog>
                )
            }
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const showCheckIn = (nftpassId: number) => {
        const id = genID()
        const width = window.innerWidth
        dialogsGroup.dialogs.push({
            id,
            content: () => {
                const close = () => {
                    closeDialogByID(id)
                }

                const dialogProps = {
                    key: id.toString(),
                    size: width < 768 ?  ['100%', '100%'] :  [500, 'auto'],
                    handleClose: close
                }

                return (
                    <Dialog { ...dialogProps } >
                        { (close) => <DialogNftCheckIn nftPassId={nftpassId} handleClose={close} /> }
                    </Dialog>
                )
            }
        })
        setDialogsGroup({ ...dialogsGroup })
    }

    const contextValue: DialogsContextType = {
        openConnectWalletDialog,
        showLoading,
        showToast,
        openDomainConfirmDialog,
        openDialog,
        showBadgelet,
        showPresend,
        showBadge,
        showAvatar,
        showCropper,
        clean,
        showInvite,
        showGroupSetting,
        openConfirmDialog,
        showNftpass,
        showNftpasslet,
        showPoint,
        showPointItem,
        showCheckIn
    }

    return (
        <DialogsContext.Provider value={ contextValue }>
            { props.children }
            { dialogsGroup.dialogs.map((item: any, index) => {
                return item.content()
            }) }
        </DialogsContext.Provider>
    )
}

export default DialogProvider
