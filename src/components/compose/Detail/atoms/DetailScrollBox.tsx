import { styled } from 'baseui'

 const DetailScrollBox = styled('div', () => {
    return {
        display: "flex",
        width: 'calc(100% + 6px)',
        paddingRight: '3px',
        flexDirection: 'column',
         maxHeight: 'initial',
        overflowY: 'auto',
        marginBottom: '12px'
    }
})

export default DetailScrollBox
