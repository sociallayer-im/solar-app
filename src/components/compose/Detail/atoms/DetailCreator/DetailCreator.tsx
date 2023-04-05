import { useContext, useEffect} from 'react'
import {Group, Profile, ProfileSimple} from '../../../../../service/solas'
import usePicture from '../../../../../hooks/pictrue'
import langContext from '../../../../provider/LangProvider/LangContext'
import './DetailCreator.less'

interface DetailCreatorProp {
    profile: Profile | ProfileSimple | Group
}
function DetailCreator(props: DetailCreatorProp) {
    const { profile } = props
    const { defaultAvatar } = usePicture()
    const { lang } = useContext(langContext)
    useEffect(() => {

    }, [])

    return (<div className='badge-creator-tag'>
        <div className='label'>{ lang['BadgeDialog_Label_Creator'] }</div>
        <img src={ profile.image_url || defaultAvatar(profile.id) } alt=""/>
        <div className='username'>{ profile.domain?.split('.')[0] }</div>
    </div>)
}

export default DetailCreator
