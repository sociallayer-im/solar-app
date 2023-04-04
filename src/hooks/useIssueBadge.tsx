import {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import solas, { Badge, Profile } from '../service/solas'
import DialogsContext from '../components/provider/DialogProvider/DialogsContext'
import { OpenDialogProps } from '../components/provider/DialogProvider/DialogProvider'
import DialogIssuePrefill, { BadgeBookDialogRes } from '../components/base/Dialog/DialogIssuePrefill/DialogIssuePrefill'
import UserContext from '../components/provider/UserProvider/UserContext'

export interface StartIssueBadgeProps {
    badges: Badge[]
    to?: string
}

interface UseIssueBadgeProp {
    senderGroup?: number
}

function useIssueBadge (useIssueBadgeProps?: UseIssueBadgeProp) {
    const { user } = useContext(UserContext)
    const { openDialog } = useContext(DialogsContext)
    const navigate = useNavigate()

    function toIssuePage (props: BadgeBookDialogRes, to?: string) {
        let path = '/create-badge'

        if (useIssueBadgeProps && useIssueBadgeProps.senderGroup) {
            path = `/create-badge?group=${useIssueBadgeProps.senderGroup}`
        }

        const split = (path: string) => path.includes('?') ? '&' : '?'

        if (to) {
            path = path + split(path) + `to=${to}`
        }

        if (props.badgeId) {
            path = path + split(path) + `badge=${props.badgeId}`
        }

        if (props.badgebookId) {
            path = path + split(path) + `badgebook=${props.badgeId}`
        }

        navigate(path)
    }

    return (props: StartIssueBadgeProps) => {
        if (!user.id) return () => { toIssuePage({}, props.to) }
        if (!props.badges.length) return () => { toIssuePage({}, props.to) }

        openDialog({
            content: (close: any) => <DialogIssuePrefill
                badges={ props.badges }
                profileId={ user.id! }
                onSelect= { (res) => { toIssuePage(res, props.to) } }
                handleClose={ close } />,
            position: 'bottom',
            size: [360, 'auto']
        } as OpenDialogProps)
    }
}

export default useIssueBadge
