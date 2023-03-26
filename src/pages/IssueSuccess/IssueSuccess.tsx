import { useNavigate } from 'react-router-dom'
import { useContext} from 'react'
import { Badgelet } from '../../service/solas'
import LangContext from '../../components/provider/LangProvider/LangContext'
import UserContext from '../../components/provider/UserProvider/UserContext'
import AppButton, { BTN_KIND } from '../../components/base/AppButton/AppButton'

interface IssueSuccessProps {
    badgelet: Badgelet
    desText: string
    whatsAppShare: () => any
    systemShare: () => any
    handleCopy: () => any
}

function IssueSuccess (props: IssueSuccessProps) {
    const { badgelet, desText, whatsAppShare, handleCopy, systemShare } = props
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <div>
            <div className='bg-box'></div>
            <div className='inner'>
                <div className='title'>{ lang['PresendFinish_Title'] }</div>
                <img className='cover' src={badgelet.badge.image_url} />
                <div className='badgelet-name'>{badgelet.badge.title}</div>
                <div className='des' dangerouslySetInnerHTML={{__html: desText}} />
                <div className='share'>
                    <div className="share-split"><span>{lang['IssueFinish_GoAndInform']}</span></div>
                    <div className='actions'>
                        <AppButton style={{ width: '36px'}} onClick={ whatsAppShare }>
                            <i className='icon icon-whatsapp'></i>
                        </AppButton>
                        <AppButton style={{ width: '36px'}} onClick={ systemShare }>
                            <span className="icon-more"></span>
                        </AppButton>
                        <AppButton style={{ width: '110px'}} onClick={ handleCopy }>
                            <span className='icon-copy'></span>
                            { lang['IssueFinish_CopyLink'] }
                        </AppButton>
                    </div>
                </div>
                <AppButton kind={BTN_KIND.primary} onClick={ () => { navigate(`/profile/${user.userName}`) } }>
                    { lang['IssueFinish_BackToProfile'] }
                </AppButton>
            </div>
        </div>
    )
}

export default IssueSuccess
