import {useNavigate} from 'react-router-dom'
import {useStyletron} from 'baseui'
import {useState, useContext, useEffect} from 'react'
import { Profile } from '../../../service/solas'
import './ProfileSocialMediaList.less'

interface ProfileSocialMediaListProps {
    profile: Profile | any
}

function ProfileSocialMediaList(props: ProfileSocialMediaListProps) {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const [active, setActive] = useState(false)

    useEffect(() => {
        // 判断是否只有一个社交媒体，是的话直接展开，否则收起
        const isOnlyOne =
            (
                props.profile.twitter
                && !props.profile.telegram
                && !props.profile.github
                && !props.profile.website
            )
            || (
                !props.profile.twitter
                && props.profile.telegram
                && !props.profile.github
                && !props.profile.website
            )
            || (
                !props.profile.twitter
                && !props.profile.telegram
                && props.profile.github
                && !props.profile.website
            )
            || (
                !props.profile.twitter
                && !props.profile.telegram
                && !props.profile.github
                && props.profile.website
            )
        // setActive(isOnlyOne)
        setActive(false)

    }, [props.profile])

    return (<div className={ active ? 'profile-social-media-list active' : 'profile-social-media-list'} onClick={() => { setActive(true)}}>
        { !!props.profile.twitter &&
            <div className='list-item' >
                <i className='icon-twitter'></i>
                <a href={`https://twitter.com/${ props.profile.twitter }`} target='_blank'>@{props.profile.twitter }</a>
            </div>
        }
        { !!props.profile.twitter &&
            <div className='list-item' >
                <i className='icon-tg'></i>
                <a href={`https://twitter.com/${ props.profile.twitter }`} target='_blank'>@{ props.profile.twitter }</a>
            </div>
        }
        { !!props.profile.twitter &&
            <div className='list-item'>
                <i className='icon-github'></i>
                <a href={`https://twitter.com/${ props.profile.twitter }`} target='_blank'>@{ props.profile.twitter }</a>
            </div>
        }
        { !!props.profile.twitter &&
            <div className='list-item'>
                <i className='icon-web'></i>
                <a href={`https://twitter.com/${ props.profile.twitter }`} target='_blank'>@{ props.profile.twitter }</a>
            </div>
        }
    </div>)
}

export default ProfileSocialMediaList
