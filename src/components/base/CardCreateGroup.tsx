import {useNavigate} from 'react-router-dom'
import { useStyletron } from 'baseui'
import { useState, useContext, useEffect } from 'react'
import { ellipsisText } from 'baseui/styles/util'
import { Group, Profile } from '../../service/solas'
import usePicture from '../../hooks/pictrue'
import LangContext from '../provider/LangProvider/LangContext'
import { Plus } from 'baseui/icon'

const style = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column' as const,
        height: '185px',
        borderRadius: '15px',
        background: '#fff',
        boxShadow: '0 1.9878px 11.9268px rgb(0 0 0 / 10%)',
        padding: '10px',
        cursor: 'pointer' as const,
        position: 'relative' as const,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px',
        width: '100%',
        boxSizing: 'border-box' as const,
        '@media (min-width: 850px)': {
            minWidth: 'calc((850px - 10px) / 2)',
            maxWidth: 'calc((850px - 10px) / 6)',
            marginRight: '10px',
            ':nth-child(2n)': {
                marginRight: '0'
            }
        }
    },
    img:  {
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        marginBottom: '10px',
        background: '#f5f8f6',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontWeight: 600,
        maxWidth: '90%',
        whiteSpace: 'nowrap' as const,
        overflow: 'hidden' as const,
        textOverflow: 'ellipsis' as const,
        lineHeight: 'auto'
    },
    des: {
        fontSize: '12px',
        color: '#c3c7c3',
        textAlign: 'center' as const,
        whiteSpace: 'pre' as const,
        lineHeight: '16px'
    }
}

function CardCreateGroup () {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const { defaultAvatar } = usePicture()
    const { lang } = useContext(LangContext)

    return (
        <div className={ css(style.wrapper) } onClick={() => { navigate('/create-group')}}>
            <div className={ css(style.img) }><Plus size={28}/></div>
            <div className={ css(style.name) }>{ lang['Group_regist_confirm'] }</div>
            <div className={ css(style.des) }>{ lang['Group_regist_des'] }</div>
        </div>
    )
}

export default CardCreateGroup
