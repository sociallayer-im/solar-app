import { useContext, useState } from 'react'
import langContext from '../../provider/LangProvider/LangContext'
import AppInput from '../../base/AppInput'
import AppButton from '../../base/AppButton'
import { KIND } from 'baseui/button'
import { useStyletron } from 'baseui'
import solas from "../../../service/solas";

export interface EmailLoginFormProps {
    onConfirm: (email: string) => any
}

function EmailLoginForm (props: EmailLoginFormProps) {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { lang } = useContext(langContext)
    const [css] = useStyletron()

    const verifyAndSetEmail = (value: string) => {
        setError(value && value.match(/^\w+\.*\w+@+\w+\.\w+$/i) ? '' : 'Invalid email address')
        setEmail(value)
    }

    const sendEmail  = async () => {
        setLoading(true)
        try {
            const requestEmailLoginCode = await solas.requestEmailCode(email)
            props.onConfirm(email)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return <>
        <AppInput
            clearable={ true }
            errorMsg={ error }
            value={email}
            readOnly = { loading }
            onChange={ (e) => { verifyAndSetEmail(e.target.value) } }
            placeholder={ lang['Login_Placeholder'] }></AppInput>
        <div className={css({ marginTop: '34px' })}>
            <AppButton
                onClick={ sendEmail }
                kind={ KIND.primary }
                disabled={ !!error || !email }
                isLoading={ loading }>
                { lang['Login_continue'] }
            </AppButton>
        </div>
    </>
}

export default EmailLoginForm
