import { useContext, useEffect } from 'react'
import UserContext from '../provider/UserProvider/UserContext'
import DialogsContext from '../provider/DialogProvider/DialogsContext'
import solas from "../../service/solas";

function Subscriber () {
    const { user } = useContext(UserContext)
    const { showBadgelet, showPresend } = useContext(DialogsContext)

    useEffect(() => {
        if (!user.id) return

        async function showPendingBadgelets () {
            const badgelets = await solas.queryBadgelet({ receiver_id: user.id!, page: 1 })
            const pendingBadgelets = badgelets.filter((item) => item.status === 'pending')
            pendingBadgelets.forEach((item) => {
                showBadgelet(item)
            })
        }
        showPendingBadgelets()
    }, [ user.id ])

    return (<></>)
}

export default Subscriber
