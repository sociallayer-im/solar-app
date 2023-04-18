import {useNavigate} from 'react-router-dom'
import { useStyletron } from 'baseui'
import { useState, useContext, useEffect } from 'react'
import { Presend } from '../../../../service/solas'
import DialogsContext from '../../../provider/DialogProvider/DialogsContext'

const style = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column' as const,
        height: '162px',
        borderRadius: '15px',
        background: '#fff',
        boxShadow: '0 1.9878px 11.9268px rgb(0 0 0 / 10%)',
        padding: '10px',
        cursor: 'pointer' as const,
        position: 'relative' as const,
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
        fontSize: '14px'
    }
}

export interface CardPresendProps {
    presend: Presend
}

function CardPresend (props: CardPresendProps) {
    const [css] = useStyletron()
    const { showPresend } = useContext(DialogsContext)


    return (<div
        data-testid='CardPresend'
        onClick={ () => { showPresend(props.presend, props.presend.code) } }
        className={ css(style.wrapper) } >
                <img className={ css(style.img) } src={ props.presend.badge.image_url } alt=""/>
                <div className={ css(style.name) }>{ props.presend.badge.name }</div>
            </div>)
}

export default CardPresend
