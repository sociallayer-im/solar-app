import { useStyletron } from 'baseui'
import { Invite } from '../../../../service/solas'
import DialogsContext from '../../../provider/DialogProvider/DialogsContext'
import { useContext } from 'react'
import UserContext from '../../../provider/UserProvider/UserContext'
import usePicture from '../../../../hooks/pictrue'
import LangContext from '../../../provider/LangProvider/LangContext'

const style = {
    wrapper: {
        position: 'relative' as const,
        display: 'flex',
        flexDirection: 'column' as const,
        width: '162px',
        height: '182px',
        borderRadius: '15px',
        background: '#fff',
        boxShadow: '0 1.9878px 11.9268px rgb(0 0 0 / 10%)',
        padding: '10px',
        cursor: 'pointer' as const,
        alignItems: 'center',
        marginBottom: '10px',
        boxSizing: 'border-box' as const,
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
        fontSize: '14px'
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
    },
    hideMark: {
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        position: 'absolute' as const,
        background: 'rgba(0,0,0,0.3)',
        top: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px'
    },
    coverBg: {
        width: '142px',
        height: '132px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, rgba(247, 247, 247, 0.82) 0%, #EBF2F1 100%);',
        borderRadius: '6px',
        marginBottom: '8px'
    }
}

export interface CardInviteProps {
    invite: Invite,
    groupCover?: string
    groupName?: string
}

function CardInvite(props: CardInviteProps) {
    const [css] = useStyletron()
    const { showInvite } = useContext(DialogsContext)
    const { defaultAvatar } = usePicture()
    const { user } = useContext(UserContext)
    const { lang } = useContext(LangContext)

    const isOwner = user.id === props.invite.receiver_id

    return (<div data-testid='CardInvite' className={ css(style.wrapper) } onClick={ () => { showInvite(props.invite) }}>
                <div className={ css(style.coverBg) }>
                    <img className={ css(style.img) } src={ props.groupCover || defaultAvatar(props.invite.group_id) } alt=""/>
                </div>
                <div className={ css(style.name) }>{ lang['Group_invite_badge_name']([props.groupName]) || '' }</div>
                { isOwner && props.invite.status === 'new' && <div className={ css(style.pendingMark) }>Pending</div> }
            </div>)
}

export default CardInvite
