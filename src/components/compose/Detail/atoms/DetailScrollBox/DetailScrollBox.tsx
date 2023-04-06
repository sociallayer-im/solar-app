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
            window.document.querySelectorAll('.detail-scroll-box').forEach((item: any) => {
                item.style.overflow = 'hidden'
            })
        }
        const reScroll = () => {
            window.document.querySelectorAll('.detail-scroll-box').forEach((item: any) => {
                item.style.overflow = 'auto'
            })
        }

        window.document.addEventListener('touchstart', stopScroll)
        window.document.addEventListener('touchend', reScroll)

        return () => {
            window.document.removeEventListener('touchstart', stopScroll)
            window.document.removeEventListener('touchend', reScroll)
        }

    }, [])

    return <div ref={ div } className='detail-scroll-box'>
        { props.children }
    </div>
}

export default DetailScrollBox
