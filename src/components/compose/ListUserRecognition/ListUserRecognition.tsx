import React, {useContext, useEffect} from 'react'
import './ListUserRecognition.less'
import ListUserAssets, {ListUserAssetsMethods} from "../../base/ListUserAssets/ListUserAssets";
import solas, {Profile} from "../../../service/solas";
import CardBadge from "../../base/Cards/CardBadge/CardBadge";
import UserContext from "../../provider/UserProvider/UserContext";
import CardBadgelet from "../../base/Cards/CardBadgelet/CardBadgelet";
import CardInvite from "../../base/Cards/CardInvite/CardInvite";

interface ListUserRecognitionProps {
    profile: Profile
}

function ListUserRecognition(props: ListUserRecognitionProps) {
    const {user} = useContext(UserContext)

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
        <div className={'list-title'}>Collected</div>
        <ListUserAssets
            queryFcn={getBadgelet}
            onRef={listWrapperRefBadgeLet}
            child={(item, key) => <CardBadgelet badgelet={item} key={key}/>}/>

        <div className={'list-title margin'}>Created</div>
        <ListUserAssets
            queryFcn={getBadge}
            onRef={listWrapperRefBadge}
            child={(item, key) => <CardBadge badge={item} key={key}/>}/>

        {props.profile.is_group && props.profile.group_owner_id === user.id &&
            <>
                <div className={'list-title margin'}>Invite</div>
                <ListUserAssets
                    queryFcn={getInvite}
                    onRef={listWrapperRefInvite}
                    child={(item, key) => <CardInvite
                        invite={item}
                        groupName={props.profile.username || ''}
                        groupCover={props.profile.image_url || ''} key={key}/>}/>
            </>
        }
    </div>)
}

export default ListUserRecognition
