import {useNavigate} from 'react-router-dom'
import {useStyletron} from 'baseui'
import {useState, useContext, useEffect, useRef} from 'react'
import { Profile } from '../../../../service/solas'
import usePicture from '../../../../hooks/pictrue'
import { Delete } from 'baseui/icon'
import langContext from '../../../provider/LangProvider/LangContext'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import './DialogCropper.less'
import AppButton, { BTN_KIND, BTN_SIZE } from '../../AppButton/AppButton'
import { Slider } from 'baseui/slider'

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
            <span>Edit image</span>
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
        <Slider
            overrides={{
                InnerThumb: () => null,
                ThumbValue: () => null,
                TickBar: () => null,
                InnerTrack: {
                    style: {
                        height: '4px',
                        borderRadius: '2px',
                        background: '#ECF2EE'
                    }
                },
                Thumb: {
                    style: () => ({
                        height: '20px',
                        width: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                        borderBottomRightRadius: '20px',
                        borderBottomLeftRadius: '20px',
                        borderLeftStyle: 'solid',
                        borderRightStyle: 'solid',
                        borderTopStyle: 'solid',
                        borderBottomStyle: 'solid',
                        borderLeftWidth: '3px',
                        borderTopWidth: '3px',
                        borderRightWidth: '3px',
                        borderBottomWidth: '3px',
                        borderLeftColor: `#fff`,
                        borderTopColor: `#fff`,
                        borderRightColor: `#fff`,
                        borderBottomColor: `#fff`,
                        boxShadow: '0px 1.9878px 18px rgba(0, 0, 0, 0.2)',
                        background: 'linear-gradient(88.02deg, #BAFFAD -2.09%, #A1F4E6 62.09%, #80F8C0 97.29%)',
                    }),
                }}
        }
            value={scale}
            min={ initScale - 1 }
            max={ initScale + 1 }
            step={ 0.1 }
            onChange={({ value }) => value && setScale(value) }
            onFinalChange={({ value }) => console.log(value)}
        />
        <div className='btns'>
            <AppButton onClick={() => { confirm() }}
                       kind={ BTN_KIND.primary } special size={ BTN_SIZE.compact }>
                { 'Apply' }
            </AppButton>
        </div>
    </div>)
}

export default DialogCropper
