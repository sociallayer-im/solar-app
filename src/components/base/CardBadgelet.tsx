import { useStyletron } from 'baseui'
import { Badgelet } from '../../service/solas'
import DialogsContext from '../provider/DialogProvider/DialogsContext'
import { useContext } from 'react'
import UserContext from '../provider/UserProvider/UserContext'

const style = {
    wrapper: {
        position: 'relative' as const,
        display: 'flex',
        flexDirection: 'column' as const,
        height: '162px',
        borderRadius: '15px',
        background: '#fff',
        boxShadow: '0 1.9878px 11.9268px rgb(0 0 0 / 10%)',
        padding: '10px',
        cursor: 'pointer' as const,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px',
        minWidth: 'calc(50% - 5px)',
        maxWidth: 'calc(50% - 5px)',
        boxSizing: 'border-box' as const,
        marginRight: '10px',
        ':nth-child(2n)': {
            marginRight: '0'
        },
        '@media (min-width: 850px)': {
            minWidth: 'calc((850px - 50px) / 6)',
            maxWidth: 'calc((850px - 50px) / 6)',
            ':nth-child(2n)': {
                marginRight: '10px'
            },
            ':nth-child(6n)': {
                marginRight: '0'
            }
        }
    },
    img:  {
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        marginBottom: '10px'
    },
    name: {
        fontWeight: 600,
        maxWidth: '90%',
        whiteSpace: 'nowrap' as const,
        overflow: 'hidden' as const,
        textOverflow: 'ellipsis' as const,
    },
    pendingMark: {
        position: 'absolute' as const,
        fontWeight: 600,
        fontSize: '12px',
        color: '#272928',
        padding: '0 10px',
        background: '#ffdc62',
        height: '28px',
        boxSizing: 'border-box' as const,
        lineHeight: '28px',
        borderRadius: '28px',
        top: '5px',
        left: '5px'
    }
}

export interface CardBadgeletProps {
    badgelet: Badgelet
}

function CardBadgelet (props: CardBadgeletProps) {
    const [css] = useStyletron()
    const { showBadgelet } = useContext(DialogsContext)
    const { user } = useContext(UserContext)

    const isOwner = user.id === props.badgelet.receiver.id

    return (<div className={ css(style.wrapper) } onClick={ () => { showBadgelet(props.badgelet) }}>
                <img className={ css(style.img) } src={ props.badgelet.badge.image_url } alt=""/>
                <div className={ css(style.name) }>{ props.badgelet.badge.name }</div>
                { isOwner && props.badgelet.status === 'pending' && <div className={ css(style.pendingMark) }>Pending</div> }
            </div>)
}

export default CardBadgelet
