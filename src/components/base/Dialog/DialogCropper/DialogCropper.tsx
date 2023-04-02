import {useStyletron} from 'baseui'
import {useState, useContext, useEffect, useRef} from 'react'
import { Delete } from 'baseui/icon'
import langContext from '../../../provider/LangProvider/LangContext'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import './DialogCropper.less'
import AppButton, { BTN_KIND, BTN_SIZE } from '../../AppButton/AppButton'
import AppSlider from '../../AppSlider/AppSlider'

export interface DialogCropperProps {
    imgURL: string
    handleClose: () => void
    handleConfirm: (res: Blob, close: () => any) => any
}

function DialogCropper(props: DialogCropperProps) {
    const [css] = useStyletron()
    const { lang } = useContext(langContext)
    const cropperRef = useRef<ReactCropperElement>(null);
    const cropBoxInitWidth = 216
    const [scale, setScale] = useState([1])
    const [initScale, setInitScale] = useState(1)

    const setPosition = () => {
        const cropper = cropperRef.current?.cropper
        const img = new Image()
        img.src = props.imgURL
        img.onload = () => {
            const isVertical = img.width < img.height
            const ration = cropBoxInitWidth / img.height
            setScale([ration])
            setInitScale(ration)
            if (!isVertical) {
                cropper!.zoomTo(ration)
            }
        }
    }

    const compress = (data: Blob):Promise<Blob | null> => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = URL.createObjectURL(data)
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                if (ctx) {
                    ctx.save()
                    canvas.width = 600
                    canvas.height = 600
                    ctx.drawImage(img, 0, 0, 600, 600)
                    ctx.restore()
                    canvas.toBlob(
                        blob => {
                            resolve(blob)
                        },
                        'image/png',
                        1
                    )
                }
            }
        })
    }

    const confirm =  () => {
        const cropper = cropperRef.current?.cropper
        cropper!.getCroppedCanvas().toBlob(async (blob) => {
            if (blob) {
                const data = await compress(blob)
                props.handleConfirm(data!, props.handleClose)
            }
        })
    }

    useEffect(() => {
        if (scale) {
            console.log('scale', scale)
            setTimeout(()=> {
                const cropper = cropperRef.current?.cropper
                cropper && cropper!.zoomTo(scale[0])
            }, 100)
        }
    }, [scale])

    return (<div className='dialog-cropper'>
        <div className='dialog-title'>
            <span>{ lang['Cropper_Dialog_Title'] }</span>
            <div className='close-dialog-btn' onClick={ props.handleClose }>
                <Delete title={'Close'} size={20}/>
            </div>
        </div>
        <Cropper
            src={ props.imgURL }
            style={{ height: "216px", width: "311px", marginBottom: '12px' }}
            aspectRatio={1}
            guides={false}
            ref={cropperRef}
            autoCrop={true}
            autoCropArea={1}
            cropBoxResizable={false}
            cropBoxMovable={false}
            scalable={false}
            dragMode={'move'}
            minCropBoxHeight={cropBoxInitWidth}
            minCropBoxWidth={cropBoxInitWidth}
            viewMode={0}
            ready={() => {
                setPosition()
            }}
        />
        <AppSlider onChange={setScale} step={0.1} value={scale} range={1}/>
        <div className='btns'>
            <AppButton onClick={() => { confirm() }}
                       kind={ BTN_KIND.primary } special size={ BTN_SIZE.compact }>
                { lang['Cropper_Dialog_Btn'] }
            </AppButton>
        </div>
    </div>)
}

export default DialogCropper
