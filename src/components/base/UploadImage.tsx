import { useNavigate } from 'react-router-dom'
import { styled, useStyletron } from 'baseui'
import { useState, useContext, useEffect } from 'react'
import LangContext from '../provider/LangProvider/LangContext'
import chooseFile from '../../utils/chooseFile'
import solas from '../../service/solas'
import UserContext from '../provider/UserProvider/UserContext'
import DialogsContext from '../provider/DialogProvider/DialogsContext'

const Wrapper = styled('div', () => {
    return {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})

const Pic = styled('img', () => {
    return {
        width: '130px',
        height: '130px',
        borderRadius: '50%',
        boxShadow: '0 1.64557px 9.87342px rgb(0 0 0 / 10%)',
        display: 'block',
        cursor: 'pointer'
    }
})

const Des = styled('div', () => {
    return {
        fontSize: '12px',
        lineHeight: '18px',
        color: '#c3c7c3',
        marginTop: '12px'
    }
})

export interface UploadImageProps {
    confirm: (url: string) => any
}

function UploadImage (props: UploadImageProps) {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const [preview, setPreview] = useState('')
    const { lang } = useContext(LangContext)
    const defaultImg = '/images/upload_default.svg'
    const { user } = useContext(UserContext)
    const { showToast, showLoading, showCropper } = useContext(DialogsContext)

    const compress = (data: Blob):Promise<Blob | null> => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = URL.createObjectURL(data)
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                if (ctx) {
                    ctx.save()
                    canvas.width = 900
                    canvas.height = 900
                    ctx.drawImage(img, 0, 0, 900, 900)
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

    const selectFile = async () => {
        try {
            const file = await chooseFile({ accepts: ['image/png', 'image/jpeg']})
            const reader = new FileReader()
            reader.readAsDataURL(file[0])
            reader.onload = async (file)=> {
                showCropper({ imgURL: reader.result as string, onConfirm: async (res: Blob, close: () => any) => {
                        close()
                        const unload = showLoading()
                        try {
                            const newImage = await solas.uploadImage({
                                file: res,
                                uploader: user.wallet || user.email || '',
                                auth_token: user.authToken || ''
                            })
                            unload()
                            setPreview(newImage)
                            props.confirm(newImage)
                        } catch (e: any) {
                            console.log('[selectFile]: ', e)
                            unload()
                            showToast('Upload fail')
                        }
                    }
                })
            }
        } catch (e: any) {
            console.log('[selectFile]: ', e)
            showToast(e.message || 'Upload fail')
        }
    }

    return (<Wrapper>
        <Pic onClick={ () => { selectFile() } } src={ preview || defaultImg } alt=""/>
        <Des>{ lang['MintBadge_UploadTip'](['800K']) }</Des>
    </Wrapper>)
}

export default UploadImage
