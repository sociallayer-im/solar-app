import PageHeader from '../compose/PageHeader'
import { useStyletron } from 'baseui'
import {useEffect, useState} from "react";

function Layout(props?: any) {
    const [css] = useStyletron()
    const [flag, setFlag] = useState('')
    const wrapper = {
        width: '100%',
        maxHeight: 'fill-available',
        display: 'flex',
        flexDirection: 'column' as const,
        overflow: 'hidden'
    }
    const content = {
        width: '100%',
        flex: 1,
        overflow: 'auto'
    }

    const innerHeight = window.innerHeight
    const el = document.documentElement || document.body
    const originHeight = el.clientHeight;

    useEffect(() => {
        /**
         * 通过强制重新渲染解决软键盘
         * 收起后页面底部留白的问题，
         * 有更好的方法？
         */
        const watchSoftKeyboard = () => {
            setFlag(Date.parse(new Date().toString()).toString())
        }

        window.addEventListener('resize', watchSoftKeyboard)

        return () => { window.removeEventListener('resize', watchSoftKeyboard) }
    }, [])

    return (
        <div className={ css(wrapper) } style={{height: `${innerHeight}px`}} data-flag={ flag }>
            <PageHeader />
            <div className={ css(content)} >
                {props.children}
            </div>
        </div>
    )
}

export default Layout
