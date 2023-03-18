import {useNavigate} from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import AppInput from '../AppInput'
import './HeaderSearch.less'
import LangContext from '../../provider/LangProvider/LangContext'

interface HeaderSearchProps {
    onClose?: () => any
}


function HeaderSearch(props: HeaderSearchProps) {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')
    const { lang } = useContext(LangContext)

    useEffect(() => {
        const history = window.localStorage.getItem('search')
        if (history) {
            setKeyword(history)
        }
    }, [])

    const onConfirm = () => {
        window.localStorage.setItem('search', keyword)
        navigate(`/search/${keyword}`)
    }


    const ConfirmBtn = <div className='search-confirm-btn' onClick={ onConfirm }>
        <i className='icon-search'></i>
    </div>

    return (<div className='header-search'>
        <AppInput
            autoFocus={ true }
            value={ keyword }
            endEnhancer={ () => ConfirmBtn }
            onChange={ (e) => { setKeyword(e.target.value) } }
        />
        <div className='search-cancel-btn' onClick={ ()=>{ !!props.onClose && props.onClose() } }>{ lang['Search_Cancel'] }</div>
    </div>)
}

export default HeaderSearch
