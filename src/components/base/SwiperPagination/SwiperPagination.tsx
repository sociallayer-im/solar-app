import {useNavigate} from 'react-router-dom'
import {useStyletron} from 'baseui'
import {useState, useContext, useEffect} from 'react'
import './SwiperPagination.less'

interface SwiperPaginationProps {
    index: number,
    total: number,
    showNumber?: number
}

function SwiperPagination({ index, total, showNumber = 3 }: SwiperPaginationProps) {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const [amount, setamount] = useState(0)

    useEffect(() => {

    }, [amount])

    return (<div className='swiper-pagination' style={{width: (showNumber * 20 + (showNumber - 1) * 8) + 'px'}}>
        {
            Array.from({ length: amount }).map((item, i) => {
                return <div className='swiper-pagination-dot'></div>
            })
        }
    </div>)
}

export default SwiperPagination
