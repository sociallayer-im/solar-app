import {useNavigate} from 'react-router-dom'
import {useStyletron} from 'baseui'
import {useState, useContext, useEffect, useRef} from 'react'
import { Profile } from '../../service/solas'
import usePicture from '../../hooks/pictrue'
import { Delete } from 'baseui/icon'
import langContext from '../provider/LangProvider/LangContext'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import AppButton, { BTN_KIND } from './AppButton'

export interface DialogCropperProps {
    imgURL: string
    handleClose: () => void
    handleConfirm: (res: Blob, close: () => any) => any
}

function DialogCropper(props: DialogCropperProps) {
    const [css] = useStyletron()
    const { lang } = useContext(langContext)
    const cropperRef = useRef<ReactCropperElement>(null);
    const cropBoxInitWidth = window.innerWidth > 450 ?  316 : window.innerWidth

    const setPosition = () => {
        const cropper = cropperRef.current?.cropper
        const img = new Image()
        img.src = props.imgURL
        img.onload = () => {
            const isVertical = img.width < img.height
            const ration = cropBoxInitWidth / img.height
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

    const style = {
        wrapper: {
            width: '100%',
            height: '100%',
            background: '#fff',
            position: 'relative' as const
        },
        btnGroup: {
            position: 'absolute' as const,
            left: '0',
            width: '100%',
            height: '10px',
            display: 'flex',
            bottom: (window.innerHeight - cropBoxInitWidth)  / 2 - 10 + 'px'
        },
        btn: {
            marginLeft: '10px',
            marginRight: '10px',
            height: '40px'
        }
    }

    return (<div className={css(style.wrapper)}>
        <Cropper
            src={ props.imgURL }
            style={{ height: "100%", width: "100%" }}
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
        <div className={css(style.btnGroup)}>
            <AppButton style={ style.btn }
                       onClick={() => { props.handleClose() }}>
                { lang['Search_Cancel'] }
            </AppButton>
            <AppButton style={ style.btn }
                       onClick={() => { confirm() } }
                       kind={ BTN_KIND.primary }>
                { lang['Regist_Confirm'] }
            </AppButton>
        </div>
    </div>)
}

export default DialogCropper
