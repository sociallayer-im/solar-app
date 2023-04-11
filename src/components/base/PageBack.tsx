import { useNavigate } from 'react-router-dom'
import { useStyletron, styled } from 'baseui'
import LangContext from '../provider/LangProvider/LangContext'
import {useState, useContext, useEffect, ReactNode} from 'react'
import { ArrowLeft } from 'baseui/icon'

const Wrapper = styled('div', ({$theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '20px',
    position: 'relative'
}))

const BackBtn = styled('div', ({$theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#7b7c7b',
    fontSize: '14px',
    cursor: "pointer"
}))

const Title = styled('div', ({$theme}) => ({
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)',
    fontSize: '14px',
    fontWeight: '600'
}))

interface PageBackProp {
    to?: string
    title?: string,
    backBtnLabel?: string,
    menu?: () => ReactNode | string,
    onClose?: () => any
    historyReplace?: boolean
}

function PageBack (props: PageBackProp) {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const { lang } = useContext(LangContext)

    const handleBack = () => {
        if (props.to) {
            props.historyReplace ? navigate(props.to, { replace: true }) : navigate(props.to)
        } else if (props.onClose) {
            props.onClose()
        } else {
            window.history.back()
        }
    }

    return (
        <Wrapper>
            <BackBtn onClick={handleBack} >
                { !props.backBtnLabel && <ArrowLeft size={18}/> }
                { props.backBtnLabel ? props.backBtnLabel : lang['Page_Back'] }
            </BackBtn>
            <Title>{ props.title }</Title>
            { !!props.menu && props.menu() }
        </Wrapper>
    )
}

export default PageBack
