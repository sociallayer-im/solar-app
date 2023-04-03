import PageHeader from '../compose/PageHeader'
import { useStyletron } from 'baseui'
import {useEffect, useState} from "react";



function Layout(props?: any) {
    const [css] = useStyletron()
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    const wrapper = {
        width: '100%',
        maxHeight: 'fill-available',
        display: 'flex',
        flexDirection: 'column' as const,
        overflow: 'hidden',
        height: `${windowHeight}px`
    }

    const content = {
        width: '100%',
        flex: 1,
        overflow: 'auto'
    }

    useEffect(() => {
        const watchSoftKeyboard = () => {
            setWindowHeight(window.innerHeight)
        }

        window.addEventListener('resize', watchSoftKeyboard)

        return () => { window.removeEventListener('resize', watchSoftKeyboard) }
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
