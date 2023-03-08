import { useStyletron, styled } from 'baseui'

function DetailWrapper () {
    const DetailWrapper = styled('div', () => {
        return {
            background: '#fff',
            width: '100%',
            height: '100%',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgb(0 0 0 / 30%)',
            paddingTop: '12px',
            paddingBottom: '24px',
            paddingLeft: '12px',
            paddingRight: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box'
        }
    })

    return DetailWrapper
}

export default DetailWrapper()
