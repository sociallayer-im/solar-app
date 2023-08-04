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
        boxSizing: 'border-box' as const,
        padding: '0'
    },
    input: {
        width: '280px',
        height: '44px',
        position: 'absolute' as const,
        left: '0',
        top: '0',
        opacity: '0',
        background: 'none',
        outline: 'none',
        border: '0',
        caretColor:'rgba(0,0,0,0)',
        color:'rgba(0,0,0,0)',
        touchCallout: 'none',
        '-webkit-touch-callout': 'none'
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
        if (value.length > codeLength.length) {
            setCode(code)
            return
        }

        if (value !== '' && !/^[a-zA-Z0-9]+$/.test(value)) {
            setCode('')
            return
        }

        setCode(value.toUpperCase())
    }

    useEffect(() => {
        const isIos = () => {
            const userAgent = navigator.userAgent.toLowerCase()
            return /iphone|ipad|ipod/.test(userAgent)
        }


        // 如果是iso, 监听软键盘弹出事件，若软键盘弹出，则将页面向上移动
        if (!isIos()) {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }
    }, [])

    useEffect(() => {
        async function login () {
            if (code.length === codeLength.length) {
                setLoading(true)
                const unload = showLoading()
                console.log('unload', unload)
                const inputs = document.querySelectorAll('input')
                inputs.forEach((item) => {
                    item.blur()
                })

                try {
                    const loginRes = await solas.emailLogin(props.loginEmail, code)
                    props.onConfirm(loginRes)
                } catch (e: any) {
                    console.log(e)
                    showToast('Invalid code')
                } finally {
                    setLoading(false)
                    unload()
                    if (inputRef.current) {
                        inputRef.current.focus()
                    }
                }
            }
        }
        login()
    }, [code])

    return <>
        <div className={css(style.wrapper)}>
            <input
                pattern="[0-9]*"
                onFocus={e => {
                   setTimeout(() => {
                       e.target.selectionStart = 100; // Set cursor to the end of the input text
                       e.target.selectionEnd = 100; // Set cursor to the end of the input text
                       window.scrollTo(0, 90)
                   },300)
                }}
                ref={ inputRef }
                value={code}
                className={css(style.input)}
                onChange={(e) => { showCode(e.target.value) } }
                type="number" />
            {
                codeLength.map((item, index) => {
                    return <input
                        readOnly
                        value={ code[index] || '' }
                        key={ index.toString() }
                        className={css((code.length === index  || (code.length===5 && index ===4))?
                            {...style.codeInput, borderColor: '#00b879', borderWidth: '2px' } : style.codeInput)} />
                })
            }
        </div>
    </>
}

export default CodeInputForm
