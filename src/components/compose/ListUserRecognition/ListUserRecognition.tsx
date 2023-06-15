import React, {useContext, useEffect} from 'react'
import './ListUserRecognition.less'
import ListUserAssets, {ListUserAssetsMethods} from "../../base/ListUserAssets/ListUserAssets";
import solas, {Profile} from "../../../service/solas";
import CardBadge from "../../base/Cards/CardBadge/CardBadge";
import UserContext from "../../provider/UserProvider/UserContext";
import CardBadgelet from "../../base/Cards/CardBadgelet/CardBadgelet";
import LangContext from "../../provider/LangProvider/LangContext";

interface ListUserRecognitionProps {
    profile: Profile
}

function ListUserRecognition(props: ListUserRecognitionProps) {
    const {user} = useContext(UserContext)
    const {lang} = useContext(LangContext)

    const getBadge = async (page: number) => {
        const queryProps = props.profile.is_group
            ? {group_id: props.profile.id, page}
            : {sender_id: props.profile.id, page}

        return await solas.queryBadge(queryProps)
    }

    const getBadgelet = async (page: number) => {
        return await solas.queryBadgelet({
            show_hidden: user.id === props.profile.id ? 1 : undefined,
            receiver_id: props.profile.id,
            page
        })
    }

    const getInvite = async (page: number) => {
        return await solas.queryGroupInvites({
            group_id: props.profile.id,
            page
        })
    }


    const listWrapperRefBadge = React.createRef<ListUserAssetsMethods>()
    const listWrapperRefBadgeLet = React.createRef<ListUserAssetsMethods>()
    const listWrapperRefInvite = React.createRef<ListUserAssetsMethods>()

    useEffect(() => {
        !!listWrapperRefBadge.current && listWrapperRefBadge.current!.refresh()
        !!listWrapperRefBadgeLet.current && listWrapperRefBadgeLet.current!.refresh()
        !!listWrapperRefInvite.current && listWrapperRefInvite.current!.refresh()
    }, [props.profile])

    return (<div className={'list-user-recognition'}>
        <div className={'list-title'}>{lang['Badgelet_List_Title']}</div>
        <ListUserAssets
            queryFcn={getBadgelet}
            onRef={listWrapperRefBadgeLet}
            child={(item, key) => <CardBadgelet badgelet={item} key={key}/>}/>

        <div className={'list-title margin'}>{lang['Created_List_Title']}</div>
        <ListUserAssets
            queryFcn={getBadge}
            onRef={listWrapperRefBadge}
            child={(item, key) => <CardBadge badge={item} key={key}/>}/>
    </div>)
}

export default ListUserRecognition
