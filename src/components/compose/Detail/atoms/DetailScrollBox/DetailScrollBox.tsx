import { styled } from 'baseui'
import './DetailScrollBox.less'
import {ReactNode} from "react";

interface DetailScrollBoxProp {
    children: ReactNode
    className?: string
}

function DetailScrollBox (props: DetailScrollBoxProp) {
    return <div className={'detail-scroll-box ' + props.className || ''}>
        { props.children }
    </div>
}

export default DetailScrollBox
