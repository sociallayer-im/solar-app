import {ReactNode, useContext} from 'react'
import './DetailDes.less'
import LangContext from '../../../../provider/LangProvider/LangContext'

interface DetailDesProp {
    children: ReactNode
}

function DetailDes (props: DetailDesProp) {
    const { lang } = useContext(LangContext)
    return <div className='dialog-badge-reason'>
        <div className='label'>{ lang['BadgeletDialog_Reason'] }</div>
        <div className='content'>
            { props.children }
        </div>
    </div>
}

export default DetailDes
