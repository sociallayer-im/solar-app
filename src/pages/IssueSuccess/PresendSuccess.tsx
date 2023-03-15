import { useNavigate } from 'react-router-dom'
import { useStyletron } from 'baseui'
import { useState, useContext, useEffect } from 'react'
import solas, { PresendWithBadgelets, Profile } from '../../service/solas'
import LangContext from '../../components/provider/LangProvider/LangContext'
import UserContext from '../../components/provider/UserProvider/UserContext'
import usePicture from '../../hooks/pictrue'
import PageBack from '../../components/base/PageBack'
import QRcode from '../../components/base/QRcode'
import AppButton, { BTN_KIND } from '../../components/base/AppButton'
import html2canvas from 'html2canvas'
import copy from '../../utils/copy'

//Swiper deps
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

const themes = [
    {
        themeColor: '#6CD7B2',
        bgImg: '/images/presned_success/new_year_3.png',
        bg: 'linear-gradient(180deg, #9EFEDD 0%, #FFFFFF 100%)'
    },
    {
        themeColor: '#FB7B44',
        bgImg: '/images/presned_success/new_year_0.png',
        bg: 'linear-gradient(180deg, #FFE4D5 0%, #FFFFFF 100%)'
    },
    {
        themeColor: '#FF4670',
        bgImg: '/images/presned_success/new_year_1.png',
        bg: 'linear-gradient(180deg, #FFCCD8 0%, #FFFFFF 100%)'
    },
    {
        themeColor: '#E45035',
        bgImg: '/images/presned_success/new_year_2.png',
        bg: 'linear-gradient(180deg, #FFE4D5 0%, #FFFFFF 100%)'
    }
]

interface PresendSuccessProps {
    presend: PresendWithBadgelets
}

function PresendSuccess(props: PresendSuccessProps) {
    const [css] = useStyletron()
    const navigate = useNavigate()
    const [selectTheme, setSelectTheme] = useState(0)
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const { defaultAvatar } = usePicture()
    const [sender, setSender] = useState<Profile | null >(null)
    const presendLink = `https://${window.location.host}/presend/${props.presend.id}_${props.presend.code}`

    useEffect(() => {
        async function getOwner () {
            const owner = await solas.getProfile( {id: props.presend.sender_id })
            setSender(owner)
        }
        getOwner()
    }, [])


    const saveCard = () => {
        const target = document.querySelector(`#card_${selectTheme}`) as HTMLDivElement
        html2canvas(target, {
            useCORS: true, // 【重要】开启跨域配置
            scale: 2,
            allowTaint: true,
            width: 321,
            height: 526,
            backgroundColor: null
        }).then((canvas: HTMLCanvasElement) => {
            canvas.style.background = 'transparent'
            const imgData = canvas.toDataURL('image/png')
            const link = document.createElement('a')
            link.download = `${props.presend.badge.title}.png`
            link.href = imgData
            link.click()
        })
            .catch(function (e: any) {
                console.error('oops, something went wrong!', e)
            })
    }

    const handleCopy = () => {
        copy(lang['presend_share_link']
            .replace('#1', sender?.username!)
            .replace('#2', props.presend.badge.title || '')
            .replace('#3', presendLink))
    }



    return (<div className='presned-success' style={{background: themes[selectTheme].bg}}>
        <div className='center'>
            <PageBack
                title={lang['PresendFinish_Title']}
                to={`/profile/${user.userName}`}
            />
        </div>
        <Swiper
            onSlideChange={(swiper) => {
                setSelectTheme(swiper.activeIndex)
            }}
            spaceBetween={ 16 }
            freeMode={ true }
            centeredSlides={true}
            slidesPerView={'auto'} >
            {
                themes.map((item, index) => {
                    return  <SwiperSlide style={{width: '321px'}} key={ index.toString() }>
                        <div className="presned-share-card" style={{backgroundImage: `url(${item.bgImg})`}} id={`card_${index}`}>
                            <img src={ item.bgImg } alt="" className="card-bg" />
                            <img className="cover" alt="" src={props.presend.badge.image_url} />
                            <div className="title">{ props.presend.badge.name }</div>
                            <div className="text-2">{ lang['New_Year_2'] }</div>
                            <div className="reason">{ props.presend.message }</div>
                            <div className="creator">
                                <img src={user.avatar || defaultAvatar(user.id)} alt="" />
                                <div>
                                    <div className="domain">{ sender ? sender.domain : '' }</div>
                                    <div className="text-3" dangerouslySetInnerHTML={{__html: lang['New_Year_3']}}></div>
                                </div>
                            </div>
                            { !!props.presend.code &&
                                <QRcode className='qrcode' text={presendLink} size={[150, 150]} />
                            }
                        </div>
                    </SwiperSlide>
                })
            }
        </Swiper>
        <div className='btns'>
            <AppButton
                onClick={ saveCard }
                style={{background: themes[selectTheme].themeColor + '!important', color: '#fff'}}>
                <i className='icon-download'></i>
                { lang['Save_Card'] }
            </AppButton>
            {!!props.presend.code &&
                <AppButton onClick={ handleCopy }>
                    { lang['IssueFinish_CopyLink'] }
                </AppButton>}
        </div>
    </div>)
}

export default PresendSuccess
