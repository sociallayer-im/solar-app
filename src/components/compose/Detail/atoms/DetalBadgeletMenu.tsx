import { useNavigate } from 'react-router-dom'
import { useStyletron } from 'baseui'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import { Overflow } from 'baseui/icon'
import { useState, useContext } from 'react'
import { Badgelet } from '../../../../service/solas'
import MenuItem from '../../../base/MenuItem'
import LangContext from '../../../provider/LangProvider/LangContext'

export interface DetalBadgeletMenuProps {
    badgelet: Badgelet
}

function DetailBadgeletMenu (props: DetalBadgeletMenuProps) {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const [a, seta] = useState('')
    const { lang } = useContext(LangContext)

    const MenuContent = () => <>
        {
            props.badgelet.hide
                ? <MenuItem onClick={ () => {  } }>{ lang['BadgeDialog_Label_action_public'] }</MenuItem>
                : <MenuItem onClick={ () => {  } }>{ lang['BadgeDialog_Label_action_hide'] }</MenuItem>
        }
        {
            props.badgelet.top
                ? <MenuItem onClick={ () => {  } }>{ lang['BadgeDialog_Label_action_untop'] }</MenuItem>
                : <MenuItem onClick={ () => {  } }>{ lang['BadgeDialog_Label_action_top'] }</MenuItem>
        }
    </>

    const overridesStyle = {
        Body : {
            style: {
                'z-index': 999,
                position: 'fixed',
                height: '24px'
            }
        },
        Inner: {
            style: {
                background: 'red'
            }
        }
    }

    return (
        <StatefulPopover
            overrides={ overridesStyle }
            placement={ PLACEMENT.bottomRight }
            content={ ({close}) => MenuContent() }
            returnFocus
        >
            <Overflow style={ { cursor: 'pointer', display: 'block' } } size={ 24 } />
        </StatefulPopover>
    )
}

export default DetailBadgeletMenu
