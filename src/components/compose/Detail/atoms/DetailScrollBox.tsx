import { styled } from 'baseui'

 const DetailScrollBox = styled('div', () => {
    return {
        display: "flex",
        width: 'calc(100% + 6px)',
        paddingRight: '3px',
        flexDirection: 'column',
        overflowY: 'auto',
        marginBottom: '12px',
        flex: 1
    }
})

export default DetailScrollBox
