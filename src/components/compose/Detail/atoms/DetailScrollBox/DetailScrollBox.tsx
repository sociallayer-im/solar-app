import './DetailScrollBox.less'
import { createRef, ReactNode } from "react";

interface DetailScrollBoxProp {
    children: ReactNode
}

function DetailScrollBox (props: DetailScrollBoxProp) {
    const div = createRef<any>()

    return <div ref={ div } className='detail-scroll-box'>
        { props.children }
    </div>
}

export default DetailScrollBox
