import {useStyletron} from 'baseui'
import {useContext} from 'react'
import solas, {Profile} from '../../service/solas'
import usePicture from '../../hooks/pictrue'
import {Delete} from 'baseui/icon'
import langContext from '../provider/LangProvider/LangContext'
import DialogsContext from '../provider/DialogProvider/DialogsContext'
import chooseFile from '../../utils/chooseFile'
import UserContext from '../provider/UserProvider/UserContext'
import useEvent, {EVENT} from '../../hooks/globalEvent'

const style = {
    wrapper: {
        width: '100%',
        height: '100%',
        background: '#fff',
        borderRadius: '12px',
        position: 'relative' as const
    },
    img: {
        width: '100%',
        height: '100%',
        display: 'block',
        borderRadius: '12px'
    },
    close: {
        width: '30px',
        height: '30px',
        background: 'rgba(39,41,40,.7)',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        position: 'absolute' as const,
        right: '16px',
        top: '16px'
    },
    showUpload: {
        background: 'rgba(39,41,40,.7)',
        borderRadius: '20px',
        color: '#fff',
        cursor: 'pointer',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '10px',
        paddingBottom: '10px',
        fontSize: '14px',
        textAlign: 'center' as const,
        marginTop: '20px',
        display: 'inline-flex',
        marginLeft: '50%',
        transform: 'translateX(-50%)'
    }
}

export interface DialogAvatarProps {
    profile: Profile
    handleClose: () => void
}

function DialogAvatar (props: DialogAvatarProps) {
    const [css] = useStyletron()
    const { defaultAvatar } = usePicture()
    const { lang } = useContext(langContext)
    const { user } = useContext(UserContext)
    const { showCropper, showLoading, showToast } = useContext(DialogsContext)
    const [_, emitUpdate] = useEvent(EVENT.profileUpdate)

    const selectFile = async () => {
        const img = await chooseFile({
            accepts: ['image/png', 'image/jpeg'],
            validator: (file) => {
                if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                        showToast('Invalid file type')
                        throw new Error('invalid file')
                }
            }
        })

        const reader = new FileReader()
        reader.readAsDataURL(img[0])
        reader.onload = async () => {
            showCropper({ imgURL: reader.result as string, onConfirm: async (res: Blob, close: () => any) => {
                    close()
                    const unload = showLoading()
                    try {
                        const newImage = await solas.uploadImage({
                            file: res,
                            uploader: user.wallet || user.email || '',
                            auth_token: user.authToken || ''
                        })
                        const newProfile = await solas.setAvatar({
                            image_url: newImage,
                            auth_token: user.authToken || ''
                        })
                        emitUpdate(newProfile)
                        unload()
                        close()
                    } catch (e: any) {
                        console.log('[selectFile]: ', e)
                        unload()
                        showToast('Upload fail')
                    }
                }
            })
        }
    }



    return (<div className={css(style.wrapper)}>
        <img className={css(style.img)}
            src={ props.profile.image_url || defaultAvatar(props.profile.id)} alt=""/>
        <div className={css(style.close)} onClick={ () => { props.handleClose() } }><Delete size={25}/></div>
        <div className={css(style.showUpload)} onClick={ () => { selectFile() } }>
            { lang['Avatar_Upload_Button'] }
        </div>
    </div>)
}

export default DialogAvatar
