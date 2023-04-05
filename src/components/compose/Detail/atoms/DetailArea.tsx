import { useNavigate } from 'react-router-dom'
import { useStyletron } from 'baseui'

export interface DetailAreaProps {
    title: string,
    content: string,
    link?: string,
    image?: string,
    navigate?: string,
    onClose?: () => void
}

const style = {
    wrapper: {
        width: '100%',
        marginBottom: '14px'
    },
    title: {
        fontSize: '14px',
        lineHeight: '22px',
        color: '#272928',
        fontWeight:'600',
    },
    content: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        borderRadius: '50px',
        color: '#272928',
        fontSize: '14px',
        paddingTop: '0'
    },
    textLink: {
        cursor: 'pointer',
        overflow: 'hidden',
        whiteSpace: 'nowrap' as const,
        textOverflow: 'ellipsis'
    },
    text: {
        overflow: 'hidden',
        whiteSpace: 'nowrap' as const,
        textOverflow: 'ellipsis'
    },
    img: {
        width:'24px',
        height: '24px',
        borderRadius: '50%',
    },
    link: {
        color: '#3c3e3d',
        textDecoration: 'none'
    }
}

function DetailArea (props: DetailAreaProps ) {
    const [css] = useStyletron()
    const navigate = useNavigate()

    const handleNavigate = () => {
        if (props.navigate) {
            props.onClose && props.onClose()
            navigate(props.navigate)
        }
    }

    return (<div className={ css(style.wrapper) }>
        <div className={ css(style.title) }> { props.title } </div>
        <div className={ css(style.content) }>
            { props.image && <img className={ css(style.img) } src={ props.image } alt=""/> }

            <div className={ props.navigate ? css(style.textLink) : css(style.text) } onClick={ handleNavigate }> { props.content } </div>

            { props.link &&
                <a className={ css(style.link) } target='_blank' href={ props.link }>
                    <i className='icon icon-icon_share'></i>
                </a>
            }
        </div>
    </div>)
}

export default DetailArea
