import './DialogNftCheckIn.less'
import {Delete} from "baseui/icon";
import LangContext from "../../../provider/LangProvider/LangContext";
import {useContext, useState} from "react";
import ScanQrcode from "../../ScanQrcode/ScanQrcode";
import DialogsContext from "../../../provider/DialogProvider/DialogsContext";

export interface DialogNftCheckInProps {
    handleClose: () => any
    nftPassId: number
}

function DialogNftCheckIn(props: DialogNftCheckInProps) {
    const {lang} = useContext(LangContext)
    const [canScan, setCanScan] = useState(true)
    const {showToast} = useContext(DialogsContext)

    // useEffect(()=> {
    //     setCanScan(true)
    // }, [])

    const handleScanResult = (res: string) => {
        setCanScan(false)
        console.log('scan', res)
        showToast('Checked !')
        setTimeout(() => {
            setCanScan(true)
        }, 1000)
    }

    return <div className={'dialog-nft-check-in'}>
        <div className='dialog-title'>
            <span>{lang['Dialog_Check_In_Title']}</span>
            <div className='close-dialog-btn' onClick={props.handleClose}>
                <Delete title={'Close'} size={20}/>
            </div>
        </div>
        <div className={'scan-window'}>
            <ScanQrcode enable={canScan} onResult={(res) => {
                handleScanResult(res)
            }}/>
        </div>
    </div>
}

export default DialogNftCheckIn
