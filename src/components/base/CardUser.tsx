import { useStyletron } from 'baseui'
import { Profile } from '../../service/solas'
import { useNavigate } from 'react-router-dom'
import usePicture from '../../hooks/pictrue'

const style = {
    wrapper: {
        position: 'relative' as const,
        display: 'flex',
        flexDirection: 'row' as const,
        borderRadius: '12px',
        background: '#fff',
        boxShadow: '0 1.9878px 11.9268px rgb(0 0 0 / 10%)',
        padding: '10px',
        cursor: 'pointer' as const,
        alignItems: 'center',
        marginBottom: '10px',
        boxSizing: 'border-box' as const,
        width: '100%'
    },
    img:  {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        marginRight: '10px'
    },
    name: {
        fontWeight: 400,
        color: '#272928',
        fontSize: '14px'
    }
}

export interface CardBadgeletProps {
    profile: Profile
}

function CardUser (props: CardBadgeletProps) {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const { defaultAvatar } = usePicture()

    return (<div className={ css(style.wrapper) } onClick={ () => { navigate(`/profile/${props.profile.username}`) }}>
                <img className={ css(style.img) } src={ props.profile.image_url || defaultAvatar(props.profile.id)} alt=""/>
                <div className={ css(style.name) }>{ props.profile.domain }</div>
            </div>)
}

export default CardUser
