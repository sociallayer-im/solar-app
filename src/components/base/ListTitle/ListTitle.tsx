import './ListTitle.less'
import {ReactNode} from "react";

interface ListTitleProps {
    title: string
    uint?: string
    action?: ReactNode
    count?: number
}
function ListTitle (props: ListTitleProps) {

    return (<div className='list-title'>
        <div className='label'>
            <div className='text'>{ props.title }</div>
            {
                !!props.action && <div className='action'>{ props.action }</div>
            }
        </div>

        {/*<div className='amount'>*/}
        {/*    { props.count }*/}
        {/*   <div> { props.uint } </div>*/}
        {/*</div>*/}
    </div>)
}

export default ListTitle
