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
    const [mainIndex, setMainIndex] = useState(0)

    useEffect(() => {
        if (total === 1) {
            setamount(0)
            return
        }

        if (total < showNumber) {
            setamount(total)
            return
        }

        setamount(showNumber)
    }, [total])

    useEffect(() => {
        if (index < showNumber - 1) {
            setMainIndex(index)
            return
        }

        if (index > total - showNumber) {
            setMainIndex(total % index)
            return
        }
    }, [index])

    return (
        <div className='swiper-pagination-custom' style={{width: (showNumber * 20 + (showNumber - 1) * 8) + 'px'}}>
        {
            new Array(amount).fill('1').map((item, i) => {
                return <div key={ i } className={ mainIndex === i ? 'swiper-pagination-dot active' : 'swiper-pagination-dot'}></div>
            })
        }
    </div>
    )
}

export default SwiperPagination
