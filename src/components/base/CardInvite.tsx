import { useStyletron } from 'baseui'
import { Invite } from '../../service/solas'
import DialogsContext from '../provider/DialogProvider/DialogsContext'
import { useContext } from 'react'
import UserContext from '../provider/UserProvider/UserContext'
import usePicture from '../../hooks/pictrue'
import LangContext from '../provider/LangProvider/LangContext'

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
        fontSize: '13px',
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
    invite: Invite,
    groupCover?: string
    groupName?: string
}

function CardInvite(props: CardBadgeletProps) {
    const [css] = useStyletron()
    const { showInvite } = useContext(DialogsContext)
    const { defaultAvatar } = usePicture()
    const { user } = useContext(UserContext)
    const { lang } = useContext(LangContext)

    const isOwner = user.id === props.invite.receiver_id

    return (<div className={ css(style.wrapper) } onClick={ () => { showInvite(props.invite) }}>
                <img className={ css(style.img) } src={ props.groupCover || defaultAvatar(props.invite.group_id) } alt=""/>
                <div className={ css(style.name) }>{ lang['Group_invite_badge_name']([props.groupName]) || '' }</div>
                { isOwner && props.invite.status === 'new' && <div className={ css(style.pendingMark) }>Pending</div> }
            </div>)
}

export default CardInvite
