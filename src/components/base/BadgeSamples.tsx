import { useNavigate } from 'react-router-dom'
import { useStyletron } from 'baseui'
import { useState, useContext, useEffect } from 'react'
import langContext from '../provider/LangProvider/LangContext'

//Swiper deps
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

const sample = [
    'https://ik.imagekit.io/soladata/tr:n-ik_ml_thumbnail/cvs06g2n_kARAFJMkR',
    'https://ik.imagekit.io/soladata/tr:n-ik_ml_thumbnail/w7r1n4di_QxRt8gZBb',
    'https://ik.imagekit.io/soladata/tr:n-ik_ml_thumbnail/nlo4yr8d_7q2G-EXlw',
    'https://ik.imagekit.io/soladata/tr:n-ik_ml_thumbnail/iwag5uop_tOEUTph5X',
    'https://ik.imagekit.io/soladata/tr:n-ik_ml_thumbnail/jhzcud5i_ya0y_MMjI',
    'https://ik.imagekit.io/soladata/tr:n-ik_ml_thumbnail/go5h8usy_Tw9HhUYEC',
    'https://ik.imagekit.io/soladata/tr:n-ik_ml_thumbnail/6bzj88py_Z9rQMzf7I',
    'https://ik.imagekit.io/soladata/tr:n-ik_ml_thumbnail/evmxp50g_gFnWZKlMg',
    'https://ik.imagekit.io/soladata/tr:n-ik_ml_thumbnail/vtkjvmuj_P1ZCoNa-2',
    'https://ik.imagekit.io/soladata/tr:n-ik_ml_thumbnail/5ypp629n_4fCVC1OIJ'
]

const style = {
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row' as const,
        flexWrap: 'nowrap' as const,
        alignItems: 'center'
    },
    title: {
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '22px',
        color: '#272928',
        whiteSpace: 'nowrap' as const,
        marginRight: '20px'
    },
    img: {
        width: '36px',
        height: '36px',
        cursor: 'pointer',
        borderRadius: '50px'
    },
    swiper: {
        flex: 1
    },
    swiperSlide: {
        width: '36px'
    },
    swiperSlideBtn: {
        border: '1px solid #ceced1',
        height: '36px',
        boxSizing: 'border-box' as const,
        lineHeight: '36px',
        borderRadius: '34px',
        fontWeight: 600,
        fontSize: '12px',
        color: '#272928',
        whiteSpace: 'nowrap' as const,
        padding: '0 24px',
        textDecoration: 'none' as const,
        display: 'block',
        width: '145px',
        cursor: 'pointer',
    }
}

export interface BadgeSamplesProps {
    onConfirm: (imageURL: string) => any
}

function BadgeSamples (props: BadgeSamplesProps) {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const { lang } = useContext(langContext)

    const toCanva = () => {
        window.open('https://www.canva.com/create/logos/', '_blank')
    }

    return (<div className={css(style.wrapper)}>
        <div className={css(style.title)}>{lang['Picture_Recommend_Title']}</div>
        <Swiper
            style={style.swiper}
            spaceBetween={ 16}
            freeMode={ true }
            slidesPerView={'auto'} >
            {
                sample.map((item, index) => {
                    return <SwiperSlide style={style.swiperSlide} key={index.toString()}>
                                <img onClick={ () => { props.onConfirm(item) } }
                                     className={css(style.img)}
                                     src={item}
                                     alt={item} />
                           </SwiperSlide>
                })
            }
            <SwiperSlide onClick={ toCanva } style={ style.swiperSlideBtn }>
                { lang['Picture_Recommend_Create_By_Canva'] }
            </SwiperSlide>
        </Swiper>
    </div>)
}

export default BadgeSamples
