import './DetailScrollBox.less'
import { createRef, ReactNode } from "react";

interface DetailScrollBoxProp {
    children: ReactNode
}

function DetailScrollBox (props: DetailScrollBoxProp) {
    const div = createRef<any>()

    let startScroll:number, touchStart:number, touchCurrent:number

    const touchStartCb = (e: any) => {
        startScroll = e.target.scrollTop;
        touchStart = e.targetTouches[0].pageY;
    }

    const touchMoveCb = (e: any) => {
        touchCurrent = e.targetTouches[0].pageY;
        const touchesDiff = touchCurrent - touchStart;
        // @ts-ignore
        const slide: any = e.currentTarget
        const onlyScrolling =
            (slide.scrollHeight > slide.offsetHeight) &&
            (
                (touchesDiff < 0 && startScroll === 0) ||
                (touchesDiff > 0 && startScroll === (slide.scrollHeight - slide.offsetHeight)) ||
                (startScroll > 0 && startScroll < (slide.scrollHeight - slide.offsetHeight))
            );
        if (onlyScrolling) {
            e.stopPropagation();
        }
    }

    return <div
        onTouchStart={ touchStartCb }
        onTouchMove={ touchMoveCb }
        ref={ div } className='detail-scroll-box'>
        { props.children }
    </div>
}

export default DetailScrollBox
