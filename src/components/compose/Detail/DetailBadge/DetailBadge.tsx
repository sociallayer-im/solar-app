import LangContext from '../../../provider/LangProvider/LangContext'
import UserContext from '../../../provider/UserProvider/UserContext'
import { useContext, useEffect, useRef, useState } from 'react'
import DetailWrapper from '../atoms/DetailWrapper/DetailWrapper'
import usePicture from '../../../../hooks/pictrue'
import DetailHeader from '../atoms/DetailHeader'
import solas, { Badge, Badgelet  } from '../../../../service/solas'
import DetailCover from '../atoms/DetailCover'
import DetailName from '../atoms/DetailName'
import DetailArea from '../atoms/DetailArea'
import AppButton, { BTN_KIND } from '../../../base/AppButton/AppButton'
import BtnGroup from '../../../base/BtnGroup/BtnGroup'
import DetailScrollBox from '../atoms/DetailScrollBox/DetailScrollBox'
import { useNavigate } from 'react-router-dom'
import useTime from '../../../../hooks/formatTime'
import DetailCreator from '../atoms/DetailCreator/DetailCreator'
import ReasonText from '../../../base/ReasonText/ReasonText'
import DetailDes from '../atoms/DetailDes/DetailDes'
import { useStyletron } from 'styletron-react'
import './DetailBadge.less'
import SwiperPagination from '../../../base/SwiperPagination/SwiperPagination'

//AppSwiper deps
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

export interface DetailBadgeProps {
    badge: Badge,
    handleClose: () => void
}

function DetailBadge (props: DetailBadgeProps ) {
    const [ css ] = useStyletron()
    const { lang } = useContext(LangContext)
    const { user } = useContext(UserContext)
    const { defaultAvatar } = usePicture()
    const navigate = useNavigate()
    const [badgelets, setBadgelets] = useState<Badgelet[]>([])
    const swiper = useRef<any>(null)
    const formatTime = useTime()
    const [swiperIndex, setSwiperIndex] = useState(0)

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
        }

        getBadgelet()
    }, [])

    const handleIssue= async () => {
        navigate(`/create-badge?badge=${props.badge.id}`)
        props.handleClose()
    }

    const loginUserIsSender = user.id === props.badge.sender.id

    return (
        <DetailWrapper>
            <DetailHeader title={ lang['BadgeletDialog_title'] } onClose={ props.handleClose }/>
            <DetailCover src={ props.badge.image_url }></DetailCover>
            <DetailName> { props.badge.name } </DetailName>
            <DetailCreator profile={ props.badge.sender }></DetailCreator>


            { badgelets.length > 0 ?

                <div style={{ width:'100%'}}>
                    <Swiper
                        ref={ swiper }
                        loop
                        modules={ [Pagination] }
                        pagination
                        spaceBetween={ 12 }
                        className='badge-detail-swiper'
                        slidesPerView={'auto'}>
                        {
                            badgelets.map((badgelet, index) =>
                                <SwiperSlide className='badge-detail-swiper-slide' key={ badgelet.id }>
                                    <DetailScrollBox>
                                        <DetailDes>
                                            <ReasonText text={badgelet.content} />
                                        </DetailDes>
                                        <DetailArea
                                            onClose={ props.handleClose }
                                            title={ lang['BadgeDialog_Label_Issuees'] }
                                            content={ badgelet.receiver.domain! }
                                            navigate={ `/profile/${badgelet.receiver.domain?.split('.')[0]}` }
                                            image={ badgelet.receiver.image_url || defaultAvatar(badgelet.receiver.id) } />

                                        <DetailArea
                                            title={ lang['BadgeDialog_Label_Token'] }
                                            content={ props.badge.domain } />

                                        <DetailArea
                                            title={ lang['BadgeDialog_Label_Creat_Time'] }
                                            content={ formatTime(badgelet.created_at ) } />
                                    </DetailScrollBox>
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </div>

                : <DetailScrollBox >
                    <DetailDes>
                        <ReasonText text={props.badge.content} />
                    </DetailDes>

                    <DetailArea
                        title={ lang['BadgeDialog_Label_Token'] }
                        content={ props.badge.domain } />

                    <DetailArea
                        title={ lang['BadgeDialog_Label_Creat_Time'] }
                        content={ formatTime(props.badge.created_at ) } />

                </DetailScrollBox>
            }

            <BtnGroup>
                { loginUserIsSender &&
                    <AppButton onClick={ () => { handleIssue() } } kind={ BTN_KIND.primary }>
                        { lang['BadgeDialog_Btn_Issue'] }
                    </AppButton>
                }
            </BtnGroup>
        </DetailWrapper>
    )
}

export default DetailBadge
