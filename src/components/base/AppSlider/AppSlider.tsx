import { useState } from 'react'
import { Slider } from 'baseui/slider'
import './AppSlider.less'

const overrides = {
    InnerThumb: () => null,
    ThumbValue: () => null,
    TickBar: () => null,
    InnerTrack: {
        style: {
            height: '4px',
            borderRadius: '2px',
            background: '#ECF2EE'
        }
    },
    Thumb: {
        style: () => ({
            height: '20px',
            width: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
            borderBottomLeftRadius: '20px',
            borderLeftStyle: 'solid',
            borderRightStyle: 'solid',
            borderTopStyle: 'solid',
            borderBottomStyle: 'solid',
            borderLeftWidth: '3px',
            borderTopWidth: '3px',
            borderRightWidth: '3px',
            borderBottomWidth: '3px',
            borderLeftColor: `#fff`,
            borderTopColor: `#fff`,
            borderRightColor: `#fff`,
            borderBottomColor: `#fff`,
            boxShadow: '0px 1.9878px 18px rgba(0, 0, 0, 0.2)',
            background: 'linear-gradient(88.02deg, #BAFFAD -2.09%, #A1F4E6 62.09%, #80F8C0 97.29%)',
        }),
    }}

interface AppSliderProp {
    value: number[]
    range:number
    step: number
    onChange?: (res: number[]) => any
    onFinalChange?: (res: number[]) => any

}

function AppSlider(props: AppSliderProp) {
    const [initScale, _] = useState(props.value[0])

    return <div className='app-slider'>
        <img className='icon-1' src="/images/image_icon.png" alt=""/>
        <Slider
            overrides={ overrides }
            value={ props.value }
            min={ initScale - props.range }
            max={ initScale + props.range }
            step={ props.step }
            onChange={({ value }) => value && props.onChange && props.onChange(value) }
            onFinalChange={({ value }) => value && props.onFinalChange && props.onFinalChange(value) }
        />
        <img className='icon-2' src="/images/image_icon.png" alt=""/>
    </div>
}

export default AppSlider
