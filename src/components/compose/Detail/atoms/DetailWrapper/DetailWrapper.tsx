import { useStyletron, styled } from 'baseui'
import { ReactNode } from 'react'
import './DetailWrapper.less'

interface DetailWrapperProp {
    children?: ReactNode
}

// todo: invite 样式， badge 样式

function DetailWrapper (props: DetailWrapperProp) {
    const DetailWrapper = styled('div', () => {
        return {
            width: '100%',
            height: '660px',
            boxShadow: '0px 2px 18px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            borderRadius: '12px'
        }
    })

    return (
        <DetailWrapper>
            <div className='badge-detail-bg'>
                <div className='ball1'></div>
                <div className='ball2'></div>
                <div className='ball1'></div>
            </div>
            <div className='container'>
                { props.children }
            </div>
        </DetailWrapper>
    )
}

export default DetailWrapper
