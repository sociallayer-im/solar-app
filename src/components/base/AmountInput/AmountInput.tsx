import {useNavigate} from 'react-router-dom'
import {useStyletron} from 'baseui'
import {useState, useContext, useEffect} from 'react'
import './AmountInput.less'
import LangContext from '../../provider/LangProvider/LangContext'

export interface AmountInputProps {
    value: number | string,
    onChange: (value: number | string) => any
}

function AmountInput(props: AmountInputProps) {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const { lang } = useContext(LangContext)
    const { value, onChange } = props

    const changeValue = (val: string) => {
        if (val === 'Unlimited') {
            onChange(val)
        }

        if (/^[0-9]*$/.test(val)) {
            onChange(Number(val))
        }
    }

    return (<div className='amount-input'>
        <div className='title'>{lang['Quantity_input_label']}</div>
        <div className='row'>
            <input className='input-box' type="text"
                   value={value}
                   onChange={(e) => {changeValue(e.target.value)}} />
            <span>Badge(s)</span>
        </div>
        <div className='row'>
            <div onClick={() => { changeValue('10') }}
                className={'btn ' + (value === 10 ? 'active': '') }>10</div>
            <div onClick={() => { changeValue('30') }}
                 className={'btn ' + (value === 30 ? 'active': '') }>30</div>
            <div onClick={() => { changeValue('50') }}
                 className={'btn ' + (value === 50 ? 'active': '') }>50</div>
            <div onClick={() => { changeValue('Unlimited') }}
                 className={'btn ' + (value === 'Unlimited' ? 'active': '') }>{ lang['Quantity_Unlimited'] }</div>
        </div>
    </div>)
}

export default AmountInput
