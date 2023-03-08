import { useStyletron, styled } from 'baseui'
import { ReactNode } from 'react'
import { Delete } from 'baseui/icon'

const Wrapper = styled('div', () => {
    return {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
        width: '100%'
    }
})

const Slot = styled('div', () => {
    return {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center'
    }
})

export interface DetailHeaderProps {
    onClose?: () => void,
    slotLeft?: ReactNode,
    slotRight?: ReactNode,
}

export default function DetailHeader (props?: DetailHeaderProps) {
    return <Wrapper>
        <Slot>
            { props && props.slotLeft }
        </Slot>
        <Slot>
            <div>{ props && props.slotRight }</div>
            <Delete
                onClick={ () => props && props.onClose && props.onClose() }
                size={ 24 }
                style={ { cursor: 'pointer' } } />
        </Slot>
    </Wrapper>
}
