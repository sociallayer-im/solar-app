import {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import solas, { Badge, Profile } from '../service/solas'
import DialogsContext from '../components/provider/DialogProvider/DialogsContext'
import { OpenDialogProps } from '../components/provider/DialogProvider/DialogProvider'
import DialogIssuePrefill, { BadgeBookDialogRes } from '../components/base/Dialog/DialogIssuePrefill/DialogIssuePrefill'
import UserContext from '../components/provider/UserProvider/UserContext'

export interface StartIssueBadgeProps {
    badges: Badge[]
}

function useIssueBadge () {
    const { user } = useContext(UserContext)
    const { openDialog } = useContext(DialogsContext)
    const navigate = useNavigate()

    function toIssuePage (props: BadgeBookDialogRes) {
        let path = '/issue'

        if (props.badgeId) {
            path = `/issue?badge=${props.badgeId}`
        }

        if (props.badgebookId) {
            path = `/issue?badgebook=${props.badgebookId}`
        }

        navigate(path)
    }

    return (props: StartIssueBadgeProps) => {
        if (!user.id) return () => { toIssuePage({}) }
        if (!props.badges.length) return () => { toIssuePage({}) }

        openDialog({
            content: (close: any) => <DialogIssuePrefill
                badges={ props.badges }
                profileId={ user.id! }
                onSelect= { (res) => { toIssuePage(res) } }
                handleClose={ close } />,
            position: 'bottom',
            size: [360, 'auto']
        } as OpenDialogProps)
    }
}

export default useIssueBadge
