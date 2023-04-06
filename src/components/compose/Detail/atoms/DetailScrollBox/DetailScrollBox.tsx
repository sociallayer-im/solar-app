import { styled } from 'baseui'
import './DetailScrollBox.less'
import {createRef, ReactNode, useEffect, useState} from "react";

interface DetailScrollBoxProp {
    children: ReactNode
}

function DetailScrollBox (props: DetailScrollBoxProp) {
    const [className, setClassName] = useState('detail-scroll-box')
    const div = createRef<any>()

    useEffect(() => {
        const stopScroll = () => {
            setClassName('detail-scroll-box stop-scroll')
        }
        const reScroll = () => {
            setClassName('detail-scroll-box')
        }

        div.current.addEventListener('touchstart', stopScroll, false)
        div.current.addEventListener('touchend', reScroll, false)

        return () => {
            div.current.removeEventListener('touchstart', stopScroll)
            div.current.removeEventListener('touchend', reScroll)
        }
    }, [])

    return <div ref={ div } className={ className }>
        { props.children }
    </div>
}

export default DetailScrollBox
