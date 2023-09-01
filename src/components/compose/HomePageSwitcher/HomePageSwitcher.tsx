import {useContext, useEffect, useState} from 'react'
import langContext from "../../provider/LangProvider/LangContext";
import './HomePageSwitcher.less'
import TriangleDown from "baseui/icon/triangle-down";
import {getEventGroup, Profile, queryUserGroup} from "../../../service/solas";
import userContext from "../../provider/UserProvider/UserContext";
import DialogsContext from "../../provider/DialogProvider/DialogsContext";
import {useLocation, useNavigate, useParams} from "react-router-dom";

function HomePageSwitcher() {
    const {lang} = useContext(langContext)
    const [showList, setShowList] = useState(false)
    const {user} = useContext(userContext)
    const {showToast, showLoading} = useContext(DialogsContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [groupList, setGroupList] = useState<Profile[]>([])
    const [availableList, setAvailableList] = useState<Profile[]>([])

    useEffect(() => {
        async function getAvailableList() {
            if (groupList.length) {
                if (user.id) {
                    const userGroup = await queryUserGroup({profile_id: user.id})
                    const res = groupList.filter(g => {
                        return g.group_event_visibility !== 'private' ||
                            userGroup.find(ug => ug.id === g.id)
                    })
                    setAvailableList(res as Profile[])
                } else {
                    const res = groupList.filter(g => {
                        return g.group_event_visibility !== 'private'
                    })
                    setAvailableList(res as Profile[])
                }
            }
        }

        getAvailableList()
    }, [groupList])

    useEffect(() => {
        const getEventGroupList = async () => {
            const eventGroup: any = await getEventGroup()
            setGroupList(eventGroup)
        }
        getEventGroupList()
    }, [])


    const switchList = () => {
        if (showList) {
            document.querySelector('body')!.style.overflow = 'auto'
        } else {
            document.querySelector('body')!.style.overflow = 'hidden'
        }
        setShowList(!showList)
    }

    const setSelect = async (group: Profile) => {
        window.location.href = `https://event.sola.day/${group.username}`
    }

    return (<div className={'home-page-switcher'}>
        <a href={'/'} className={'badge-page'}>{lang['Nav_Badge_Page']}</a>
        <div className={ 'group-page' } onClick={switchList}>
            <div>{lang['Nav_Event_Page']}</div>
            <TriangleDown/>
        </div>
        {showList &&
            <div className={'group-list'}>
                <div className={'shell'} onClick={switchList}/>
                <div className={'list-content'}>
                    {
                        availableList.map((group, index) => {
                            return <div className={'list-item'}
                                        key={index}
                                        onClick={() => {
                                            setSelect(group)
                                            switchList()
                                        }}>
                                {group.nickname || group.username}
                            </div>
                        })
                    }
                </div>
            </div>
        }
    </div>)
}

export default HomePageSwitcher
