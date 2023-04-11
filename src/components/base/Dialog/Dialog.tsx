import {ReactNode, useEffect, useRef, useState} from 'react'
import './dialog.less'

export interface DialogProps {
    children?: (close: () => any) => ReactNode
    size?: (number | string)[]
    maxSize?: string[]
    minSize?: string[]
    noShell?: boolean
    handleClose?: (...rest: any[]) => any
    position?: 'center' | 'bottom' | ''
}

function Dialog ({ position = '', ...props }: DialogProps) {
    const { children } = props
    const dialogContent = useRef<HTMLDivElement | any>(null)
    const [contentClassName, setContentClassName] = useState('dialog-content' + ' ' + position)

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

    if (position === 'bottom') {
        sizeStyle.maxHeight = window.innerHeight + 'px'
    }

    const close = () => {
        if (props.handleClose) {
            dialogContent.current.className = contentClassName.replace('active', '')
            setTimeout(() => {
               props.handleClose!()
            }, 200)
        }
    }

    useEffect(() => {
        if (position) {
            setTimeout(()=> {
                if (dialogContent) {
                    dialogContent.current.className = contentClassName + ' active'
                }
            }, 200)
        }
    }, [])

    const height = window.innerHeight

    return (<div className='dialog' style={{height: `${height}px`}}>
        <div className={ `dialog-shell ${ props.noShell ? 'light': '' }` } onClick={ close }></div>
        <div className={ contentClassName }  style={ sizeStyle } ref={ dialogContent }>
            { children && children(close) }
        </div>
    </div>)
}

export default Dialog
