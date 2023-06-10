import {useState, useContext, useRef, useEffect} from 'react'
import LangContext from '../../provider/LangProvider/LangContext'
import './ReasonInput.less'
import ReasonText from '../ReasonText/ReasonText'

export interface ReasonInputProps {
    value: string,
    onChange: (value: string) => any
}

function ReasonInput(props: ReasonInputProps) {
    const [value, setValue] = useState(props.value || '')
    const textarea = useRef<HTMLTextAreaElement | null>(null)
    const { lang } = useContext(LangContext)

    const mapInput = (value: string) => {
        const newString = value.substr(0, 200)
        setValue(newString)
        props.onChange(newString)
    }

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    const addTag = () => {
        mapInput(value ? value + ' #': '#')

        textarea!.current!.focus()
    }

    const addLink = () => {
        const link = value.match(/@[^@#\s,。，]+/)
        if (!link) {
            mapInput(value ? value + ' @': '@')
        }

        textarea!.current!.focus()
    }

    return (<div className='reason-input'>
        <ReasonText text={ value } className={'editor'} />
        <textarea
            ref={ textarea }
            value={ value }
            className='editor textarea'
            onChange={ (e) => { mapInput(e.target.value) } }/>

       <div className='action-bar'>
           <div className='btns'>
               <div className='btn' onClick={() => { addTag() }}>
                   <i className='icon icon-hash'></i>
                   { lang['IssueBadge_Eventbtn'] }
               </div>
               <div className='btn' onClick={() => { addLink() }}>
                   <i className='icon icon-link'></i>
                   { lang['IssueBadge_linkbtn'] }
               </div>
           </div>
           <div>{ value ? value.length : 0 }/200</div>
       </div>
    </div>)
}

export default ReasonInput
