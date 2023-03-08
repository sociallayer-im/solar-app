import {useNavigate} from 'react-router-dom'
import {useStyletron} from 'baseui'
import {useState, useContext, useEffect} from 'react'

function ErrorPage() {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const [a, seta] = useState('')

    useEffect(() => {

    }, [])

    return (<div>Error</div>)
}

export default ErrorPage
