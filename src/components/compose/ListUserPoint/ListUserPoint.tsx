import React, {useContext, useEffect} from 'react'
import './ListUserPoint.less'
import ListUserAssets, {ListUserAssetsMethods} from "../../base/ListUserAssets/ListUserAssets";
import {Profile, queryNftpass, queryNftPasslet, queryPoint, queryPointItems} from "../../../service/solas";
import CardNftpass from "../../base/Cards/CardNftpass/CardNftpass";
import UserContext from "../../provider/UserProvider/UserContext";
import CardBadgelet from "../../base/Cards/CardBadgelet/CardBadgelet";
import CardNftpasslet from "../../base/Cards/CardNftpasslet/CardNftpasslet";
import CardPoint from "../../base/Cards/CardPoint/CardPoint";
import CardPointItem from "../../base/Cards/CardPointItem/CardPointItem";

interface ListUserPointProps {
    profile: Profile
}

function ListUserPoint(props: ListUserPointProps) {
    const {user} = useContext(UserContext)

    const getPoint = async (page: number) => {
        if (page > 1) return []
        const queryProps = props.profile.is_group
            ? {group_id: props.profile.id}
            : {sender_id: props.profile.id}

        return await queryPoint(queryProps)
    }

    const getPointItems= async (page: number) => {
        if (page > 1) return []
        return await queryPointItems({
            owner_id: props.profile.id,
        })
    }

    const listWrapperRefBadge = React.createRef<ListUserAssetsMethods>()
    const listWrapperRefBadgeLet = React.createRef<ListUserAssetsMethods>()

    useEffect(() => {
        !!listWrapperRefBadge.current && listWrapperRefBadge.current!.refresh()
        !!listWrapperRefBadgeLet.current && listWrapperRefBadgeLet.current!.refresh()
    }, [props.profile])

    return (<div className={'list-user-point'}>
        <div className={'list-title'}>Collected</div>
        <ListUserAssets
            queryFcn={getPointItems}
            onRef={listWrapperRefBadgeLet}
            child={(item, key) => <CardPointItem pointitem={item} key={key}/>}/>

        <div className={'list-title margin'}>Created</div>
        <ListUserAssets
            queryFcn={getPoint}
            onRef={listWrapperRefBadge}
            child={(item, key) => <CardPoint point={item} key={key}/>}/>
    </div>)
}

export default ListUserPoint
