import React, {useState, useEffect, useRef } from 'react'
import { useSwiper } from 'swiper/react'
import Swiper from 'swiper'

interface SliderProps {
    position: 'left' | 'right'
}

function Slider (props: SliderProps) {
    const [swiper, setSwiper] = useState<Swiper>(useSwiper())
    const [hide, setHide] = useState(true)

    const timer = useRef<any>(null)

    const checkHide = () => {
        const condition = swiper.isEnd && swiper.isBeginning
            || props.position === 'left' && swiper.isBeginning
            || props.position === 'right' && swiper.isEnd

        if (condition) {
            // 延迟隐藏，防止不小心点开弹窗
            clearTimeout(timer.current)
            timer.current = setTimeout(() => {
                setHide(true)
            }, 400)
        } else {
            setHide(false)
        }
    }

    useEffect(() => {
        const a = setInterval(() => {
            checkHide()
        }, 600)

        return () => {
            clearInterval(a)
        }
    }, [])

    const handleClick = () => {
        if (props.position === 'left') {
            swiper.slidePrev()
        } else {
            swiper.slideNext()
        }
    }

    return hide
        ? null
        : <div className={ props.position === 'left' ? 'left-size-gradient' : 'right-size-gradient'}>
            <img src='/images/slide.png' onClick={ () => { handleClick() }}  alt='' />
        </div>
}

export default Slider
