import { useContext, useEffect, useRef } from 'react'
import UserContext from '../provider/UserProvider/UserContext'
import DialogsContext from '../provider/DialogProvider/DialogsContext'
import solas, {queryPendingInvite} from '../../service/solas'

const Pusher = (window as any).Pusher
let pusher: any = null
if (Pusher) {
    Pusher.logToConsole = true
    pusher = new Pusher('f88b7452d706ba1a2494', { cluster: 'ap3' } )
}

function Subscriber () {
    const { user } = useContext(UserContext)
    const { showBadgelet, showInvite } = useContext(DialogsContext)
    const SubscriptionDomain = useRef('')

    // 实时接受badgelet
    useEffect(() => {
        if (!pusher) return
        if (!user.domain) {
            if (SubscriptionDomain.current) {
                pusher.unsubscribe(SubscriptionDomain.current)
            }
            return
        }

        const channel = pusher.subscribe(user.domain)
        SubscriptionDomain.current = user.domain
        channel.bind('send_badge', async (data: any) => {
            const badgeletId = data.message
            const badgelet = await solas.queryBadgeletDetail({ id: Number(badgeletId) })
            showBadgelet(badgelet)
        })

    }, [ user.domain ])

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


        async function showPendingInvite () {
            const invites = await solas.queryPendingInvite(user.id!)
            invites.forEach((item) => {
                showInvite(item)
            })
        }
        showPendingInvite()
    }, [ user.id ])

    return (<></>)
}

export default Subscriber
