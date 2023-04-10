import PageHeader from '../compose/PageHeader'
import { useStyletron } from 'baseui'
import {useEffect, useState} from 'react'
import usePageHeight from '../../hooks/pageHeight'



function Layout(props?: any) {
    const [css] = useStyletron()
    const { windowHeight, heightWithoutNav } = usePageHeight()

    const wrapper = {
        width: '100%',
        maxHeight: 'fill-available',
        display: 'flex',
        flexDirection: 'column' as const,
        overflow: 'hidden',
        //height: `${windowHeight}px`
        height: `100vh`
    }

    const content = {
        width: '100%',
        flex: 1,
        overflow: 'auto',
        // height: `${heightWithoutNav}px`
        height: `calc(100vh - 48px)`
    }

    useEffect(() => {
        const watchSoftKeyboard = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
            window.scroll(0, scrollTop)
        }

        window.addEventListener('focusout', watchSoftKeyboard)

        return () => { window.removeEventListener('focusout', watchSoftKeyboard) }
    }, [])

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
