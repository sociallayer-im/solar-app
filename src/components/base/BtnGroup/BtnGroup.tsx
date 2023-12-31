import { ReactNode } from 'react'
import './BtnGroup.less'

interface BtnGroupProps {
    children?: ReactNode
    style?: any
}

function BtnGroup (props: BtnGroupProps) {
    return (<div className='btn-group' data-testid='BtnGroup' style={props.style ? props.style : {}}>
        { props.children }
    </div>)
}

export default BtnGroup
