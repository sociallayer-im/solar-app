import './PageHeader.less'
import LangSwitch from './LangSwitch'
import PageLogo from '../../base/PageLogo'
import LoginBtn from '../../base/LoginBtn'
import ProfileMenu from './ProfileMenu'
import { useContext } from 'react'
import UserContext from '../../provider/UserProvider/UserContext'

function PageHeader () {
    const { user } = useContext(UserContext)

    return (
        <header className="pager-header">
            <PageLogo />
            <div className='pager-header-right-menu'>

                <div className="header-search">
                    <i className='icon-search'></i>
                </div>

                <div className='split'></div>

                <LangSwitch />

                <div className='split'></div>

                { !user.id ? <LoginBtn /> : <ProfileMenu />}
            </div>
        </header>
    )
}

export default PageHeader
