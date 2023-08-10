import PageHeader from '../compose/PageHeader'

import { useStyletron, styled } from 'baseui'
import {useEffect, useState, useContext} from 'react'
import usePageHeight from '../../hooks/pageHeight'
import userContext from "../provider/UserProvider/UserContext";
import {useNavigate} from "react-router-dom";



function Layout(props?: any) {
    const [css] = useStyletron()
    const { windowHeight, heightWithoutNav } = usePageHeight()
    const { user } = useContext(userContext)
    const navigate = useNavigate()

    const wrapper = {
        width: '100%',
        maxHeight: 'fill-available',
        display: 'flex',
        flexDirection: 'column' as const,
        overflow: 'hidden',
        height: `${windowHeight}px`
    }

    const content: any = {
        width: '100%',
        flex: 1,
        overflowX: 'hidden',
        height: `${heightWithoutNav}px`,
        touchAction: 'pan-y' as const
    }

    useEffect(() => {
        const watchSoftKeyboard = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
            window.scroll(0, scrollTop)
        }

        window.addEventListener('focusout', watchSoftKeyboard)
        window.addEventListener('orientationchange', watchSoftKeyboard)

        return () => {
            window.removeEventListener('focusout', watchSoftKeyboard)
            window.removeEventListener('orientationchange', watchSoftKeyboard)
        }
    }, [])

    // 如果用户已经登录，离开注册域名页面，将会被强制回到注册页面
    useEffect(() => {
        if (!user.domain && user.authToken && !window.location.href.includes('regist')) {
            navigate('/regist')
        }
    })

    return (
        <div className={ css(wrapper) }>
            <PageHeader />
            <div className={ css(content)} >
                {props.children}
            </div>
        </div>
    )
}

export default Layout
