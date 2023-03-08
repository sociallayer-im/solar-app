import {useContext, useState, useRef, useEffect} from 'react'
import { useStyletron } from 'baseui'
import solas, { EmailLoginRes } from '../../../service/solas'
import DialogsContext from '../../provider/DialogProvider/DialogsContext'

export interface CodeInputFormProps {
    onConfirm: (loginRes: EmailLoginRes) => any
    loginEmail: string
}

const style = {
    wrapper : {
        width: '280px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        'flex-direction': 'row',
        'flex-warp': 'nowarp',
        justifyContent: 'space-between',
        position: 'relative' as const
    },
    codeInput: {
        width: '36px',
        height: '44px',
        border: '1px solid #7B7C7B',
        borderRadius: '8px',
        'font-size': '24px',
        'text-align': 'center',
        lineHeight: '44px',
        fontWeight: 600,
        boxSizing: 'border-box' as const
    },
    input: {
        width: '280px',
        height: '44px',
        position: 'absolute' as const,
        left: '0',
        top: '0',
        opacity: 0
    }
}

function CodeInputForm (props: CodeInputFormProps) {
    const [code, setCode] = useState('')
    const [codeLength, ] = useState(new Array(5).fill(''))
    const [ loading, setLoading ] = useState(false)
    const [css] = useStyletron()
    const { showLoading, showToast } = useContext(DialogsContext)

    const inputRef = useRef<HTMLInputElement | null>(null)


    const showCode = (value: string) => {
        if (loading) return
        if (value.length > codeLength.length) return
        if (value !== '' && !/^[a-zA-Z0-9]+$/.test(value)) return
        setCode(value.toUpperCase())
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    useEffect(() => {
        async function login () {
            if (code.length === codeLength.length) {
                setLoading(true)
                const unload = showLoading(10000)
                console.log('unload', unload)
                try {
                    const loginRes = await solas.emailLogin(props.loginEmail, code)
                    props.onConfirm(loginRes)
                } catch (e: any) {
                    console.log(e)
                    showToast('Invalid code')
                } finally {
                    setLoading(false)
                    unload()
                }
            }
        }
        login()
    }, [code])

    return <>
        <div className={css(style.wrapper)}>
            <input
                ref={ inputRef }
                value={code}
                className={css(style.input)}
                onChange={(e) => { showCode(e.target.value) } }
                type="text" />
            {
                codeLength.map((item, index) => {
                    return <input
                        readOnly
                        value={ code[index] || '' }
                        key={ index.toString() }
                        className={css(code.length === index ? {...style.codeInput, borderColor: '#00b879' } : style.codeInput)} />
                })
            }
        </div>
    </>
}

export default CodeInputForm
