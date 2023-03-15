import { ReactNode } from 'react'
import './dialog.less'

export interface DialogProps {
    children?: ReactNode
    size?: (number | string)[]
    maxSize?: string[]
    minSize?: string[]
    noShell?: boolean
    handleClose?: (...rest: any[]) => any
}


function Dialog (props: DialogProps) {
    const { children } = props

    let sizeStyle = { width: 'auto', height: 'auto', maxWidth: 'initial', maxHeight: 'initial', minWidth:'initial',  minHeight: 'initial' }

    if (props.size) {
        sizeStyle.width = typeof props.size[0] === 'string' ? props.size[0] :`${props.size[0]}px`
        sizeStyle.height = typeof props.size[1] === 'string' ?  props.size[1] : `${props.size[1]}px`
    }

    if (props.maxSize) {
        sizeStyle.maxWidth =  props.maxSize[0]
        sizeStyle.maxHeight =  props.maxSize[1]
    }

    if (props.minSize) {
        sizeStyle.maxWidth =  props.minSize[0]
        sizeStyle.maxHeight =  props.minSize[1]
    }

    const close = () => {
        if (props.handleClose) {
            props.handleClose()
        }
    }

    return (<div className='dialog'>
        <div className={ `dialog-shell ${ props.noShell ? 'light': '' }` } onClick={ close }></div>
        <div className='dialog-content'  style={ sizeStyle }>
            { children }
        </div>
    </div>)
}

export default Dialog
