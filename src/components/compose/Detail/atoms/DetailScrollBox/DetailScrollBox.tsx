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

        setTimeout(() => {
            div.current.addEventListener('touchstart', stopScroll)
            div.current.addEventListener('touchend', reScroll)
        }, 100)

    }, [])

    return <div ref={ div } className={ className }>
        { props.children }
    </div>
}

export default DetailScrollBox
