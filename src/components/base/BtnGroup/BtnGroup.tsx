import { ReactNode } from 'react'
import './BtnGroup.less'

interface BtnGroupProps {
    children?: ReactNode
}
function BtnGroup (props: BtnGroupProps) {
    return (<div className='btn-group'>
        { props.children }
    </div>)
}

export default BtnGroup
