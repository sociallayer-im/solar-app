import LangContext from '../../provider/LangProvider/LangContext'
import UserContext from '../../provider/UserProvider/UserContext'
import {useContext, useEffect, useRef, useState} from 'react'
import DetailWrapper from './atoms/DetailWrapper'
import usePicture from '../../../hooks/pictrue'
import DetailHeader from './atoms/DetailHeader'
import solas, { Badge, Badgelet, ProfileSimple } from '../../../service/solas'
import DetailCover from './atoms/DetailCover'
import DetailName from './atoms/DetailName'
import DetailArea from './atoms/DetailArea'
import AppButton, { BTN_KIND } from '../../base/AppButton'
import BtnGroup from '../../base/BtnGroup/BtnGroup'
import DetailReceivers from './atoms/DetailReceivers'
import DetailScrollBox from './atoms/DetailScrollBox'
import DetailBadgelet from './DetailBadgelet'

//Swiper deps
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

export interface DetailBadgeProps {
    badge: Badge,
    handleClose: () => void
}

function DetailBadge (props: DetailBadgeProps ) {
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const { defaultAvatar } = usePicture()
    const [receivers, setReceivers] = useState<ProfileSimple[]>([])
    const [badgelets, setBadgelets] = useState<Badgelet[]>([])
    const swiper = useRef<any>(null)

    useEffect(() => {
        async function getBadgelet () {
            const badgeWithBadgelets = await solas.queryBadgeDetail({ id: props.badge.id })
            let badgelets = badgeWithBadgelets.badgelets.filter(item => {
                return item.status === 'accepted'
            })
            badgelets = badgelets.map(item => {
                item.badge = props.badge
                return item
            })
            setBadgelets(badgelets)

            const receivers = badgelets.map(item => {
                return item.receiver
            })
            setReceivers(receivers)
        }

        if (swiper) {
            swiper && swiper.current && swiper.current.click()
        }

        getBadgelet()
    }, [])

    const handleIssue= async () => {

    }

    const loginUserIsSender = user.id === props.badge.sender.id

    const slideSize = {
        width: '340px',
        height: badgelets.length ? '520px': 'auto'
    }

    const swiperSize = {
        height: badgelets.length ? '550px': 'auto'
    }

    return (
        <Swiper
            ref={ swiper }
            pagination={ {dynamicBullets: true } }
            modules={ [Pagination] }
            spaceBetween={ 12 }
            freeMode={ true }
            slidesPerView={'auto'}
            centeredSlides={ true }
            style={ swiperSize }
            className="mySwiper">
            <SwiperSlide style={ slideSize }>
                <DetailWrapper>
                    <DetailHeader onClose={ props.handleClose }/>
                    <DetailCover src={ props.badge.image_url }></DetailCover>
                    <DetailName> { props.badge.name } </DetailName>

                    <DetailScrollBox>
                        <DetailArea
                            onClose={ props.handleClose }
                            title={ lang['BadgeDialog_Label_Creator'] }
                            content={ props.badge.sender.domain! }
                            navigate={ `/profile/${props.badge.domain?.split('.')[0]}` }
                            image={ props.badge.sender.image_url || defaultAvatar(props.badge.sender.id) } />

                        <DetailReceivers
                            length={20}
                            receivers={ receivers }
                            title={ lang['BadgeDialog_Label_Issuees']} />

                        <DetailArea
                            title={ lang['BadgeDialog_Label_Token'] }
                            content={ props.badge.domain } />
                    </DetailScrollBox>

                    <BtnGroup>
                        { loginUserIsSender &&
                            <AppButton onClick={ () => { handleIssue() } } kind={ BTN_KIND.primary }>
                                { lang['BadgeDialog_Btn_Issue'] }
                            </AppButton>
                        }
                    </BtnGroup>
                </DetailWrapper>
            </SwiperSlide>
            {
                badgelets.map((item, index) => {
                    return (
                        <SwiperSlide style={ slideSize } key={ index.toString() }>
                            <DetailBadgelet badgelet={item} handleClose={props.handleClose} />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

export default DetailBadge
