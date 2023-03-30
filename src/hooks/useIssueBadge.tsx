import {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { Profile } from '../service/solas'
import DialogsContext from '../components/provider/DialogProvider/DialogsContext'
import { OpenDialogProps } from '../components/provider/DialogProvider/DialogProvider'
import DialogIssuePrefill, { BadgeBookDialogRes } from '../components/base/Dialog/DialogIssuePrefill/DialogIssuePrefill'
import UserContext from '../components/provider/UserProvider/UserContext'

function toIssuePage (props: BadgeBookDialogRes) {
    const navigate = useNavigate()

    let path = '/badge-create'

    if (props.badgeId) {
        path = `/issue?badge=${props.badgeId}`
    }

    if (props.badgebookId) {
        path = `/issue?badgebook=${props.badgebookId}`
    }

    navigate(path)
}

function useIssueBadge () {
    const { user } = useContext(UserContext)
    const { openDialog } = useContext(DialogsContext)
    return () => {
        openDialog({
            content: (close: any) => <DialogIssuePrefill
                profileId={ user.id! }
                onSelect= { toIssuePage }
                handleClose={ close } />,
            position: 'bottom',
            size: [360, 'auto']
        } as OpenDialogProps)
    }
}

export default useIssueBadge
