import './ListTitle.less'

interface ListTitleProps {
    title: string
    uint?: string
    count?: number
}
function ListTitle (props: ListTitleProps) {

    return (<div className='list-title'>
        <div className='label'>{ props.title }</div>
        {/*<div className='amount'>*/}
        {/*    { props.count }*/}
        {/*   <div> { props.uint } </div>*/}
        {/*</div>*/}
    </div>)
}

export default ListTitle
