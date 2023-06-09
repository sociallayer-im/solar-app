import React, {useContext, useEffect} from 'react'
import './ListUserNftpass.less'
import ListUserAssets, {ListUserAssetsMethods} from "../../base/ListUserAssets/ListUserAssets";
import {Profile, queryNftpass, queryNftPasslet} from "../../../service/solas";
import CardNftpass from "../../base/Cards/CardNftpass/CardNftpass";
import UserContext from "../../provider/UserProvider/UserContext";
import CardBadgelet from "../../base/Cards/CardBadgelet/CardBadgelet";
import CardNftpasslet from "../../base/Cards/CardNftpasslet/CardNftpasslet";

interface ListUserNftpassProps {
    profile: Profile
}

function ListUserNftpass(props: ListUserNftpassProps) {
    const {user} = useContext(UserContext)

    const getNftpass = async (page: number) => {
        const queryProps = props.profile.is_group
            ? {group_id: props.profile.id, page}
            : {sender_id: props.profile.id, page}

        return await queryNftpass(queryProps)
    }

    const getNftpasslet= async (page: number) => {
        return await queryNftPasslet({
            show_hidden: user.id === props.profile.id ? 1 : undefined,
            receiver_id: props.profile.id,
            page
        })
    }

    const listWrapperRefBadge = React.createRef<ListUserAssetsMethods>()
    const listWrapperRefBadgeLet = React.createRef<ListUserAssetsMethods>()

    useEffect(() => {
        !!listWrapperRefBadge.current && listWrapperRefBadge.current!.refresh()
        !!listWrapperRefBadgeLet.current && listWrapperRefBadgeLet.current!.refresh()
    }, [props.profile])

    return (<div className={'list-user-nftpass'}>
        <div className={'list-title'}>Collected</div>
        <ListUserAssets
            queryFcn={getNftpasslet}
            onRef={listWrapperRefBadgeLet}
            child={(item, key) => <CardNftpasslet nftpasslet={item} key={key}/>}/>

        <div className={'list-title margin'}>Created</div>
        <ListUserAssets
            queryFcn={getNftpass}
            onRef={listWrapperRefBadge}
            child={(item, key) => <CardNftpass nftpass={item} key={key}/>}/>
    </div>)
}

export default ListUserNftpass
