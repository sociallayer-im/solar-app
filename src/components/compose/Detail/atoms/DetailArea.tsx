import { useNavigate } from 'react-router-dom'
import { useStyletron } from 'baseui'
import { useState, useContext, useEffect } from 'react'


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
        marginBottom: '18px'
    },
    title: {
        fontSize: '14px',
        lineHeight: '22px',
        color: '#7b7c7b',
        marginBottom: '8px',
        paddingLeft: '10px'
    },
    content: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        background: '#f8f9f8',
        borderRadius: '50px',
        color: '#3c3e3d',
        fontSize: '14px'
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
        marginRight: '8px'
    },
    link: {
        marginLeft: '8px',
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
