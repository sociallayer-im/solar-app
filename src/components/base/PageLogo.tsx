import { styled, useStyletron } from 'baseui'
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const Logo = styled('div', ({ $theme }) => ({
    width: '102px',
    height: '32px',
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: $theme.colors.contentPrimary,
    flexDirection: 'row',
}))

function PageLogo () {
    const [css] = useStyletron()
    const imgStyle = {
        width: '102px',
        height: '32px',
        display: 'block',
        marginRight: '8px',
    }

    const svgStyle = {
        minWidth: '39px',
    }

    const splitStyle = {
        minWidth: '1px',
        height: '12px',
        backgroundColor: '#999',
        marginRight: '8px',
    }

    const home = import.meta.env.VITE_SOLAS_HOME
    const navigate = useNavigate()
    return (<Logo>
        <Link to={'/'}><img className={css(imgStyle)} src="/images/logo.svg" alt=""/></Link>
        <div className={css(splitStyle)}></div>
        <a href="https://event.sola.day" style={{height: '20px'}}>
            <svg width="47" height="20" viewBox="0 0 47 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-inside-1_1400_23700" fill="white">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17 17.1414C15.1963 18.9097 12.7255 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C12.7255 0 15.1963 1.09032 17 2.85857C18.8038 1.09032 21.2745 0 24 0C26.4815 0 28.752 0.903899 30.5 2.40041C32.248 0.903899 34.5185 0 37 0C42.5228 0 47 4.47715 47 10C47 15.5228 42.5228 20 37 20C34.5185 20 32.248 19.0961 30.5 17.5996C28.752 19.0961 26.4815 20 24 20C21.2745 20 18.8038 18.9097 17 17.1414Z"/>
                </mask>
                <path d="M17 17.1414L17.49 16.6416L17 16.1612L16.51 16.6416L17 17.1414ZM17 2.85857L16.51 3.35844L17 3.83882L17.49 3.35844L17 2.85857ZM30.5 2.40041L30.0448 2.93216L30.5 3.3219L30.9552 2.93216L30.5 2.40041ZM30.5 17.5996L30.9552 17.0678L30.5 16.6781L30.0448 17.0678L30.5 17.5996ZM16.51 16.6416C14.8318 18.2867 12.5349 19.3 10 19.3V20.7C12.916 20.7 15.5607 19.5326 17.49 17.6413L16.51 16.6416ZM10 19.3C4.86375 19.3 0.7 15.1362 0.7 10H-0.7C-0.7 15.9094 4.09055 20.7 10 20.7V19.3ZM0.7 10C0.7 4.86375 4.86375 0.7 10 0.7V-0.7C4.09055 -0.7 -0.7 4.09055 -0.7 10H0.7ZM10 0.7C12.5349 0.7 14.8318 1.71326 16.51 3.35844L17.49 2.3587C15.5607 0.467374 12.916 -0.7 10 -0.7V0.7ZM17.49 3.35844C19.1682 1.71326 21.4651 0.7 24 0.7V-0.7C21.084 -0.7 18.4393 0.467375 16.51 2.3587L17.49 3.35844ZM24 0.7C26.3084 0.7 28.4188 1.54012 30.0448 2.93216L30.9552 1.86867C29.0852 0.267679 26.6547 -0.7 24 -0.7V0.7ZM30.9552 2.93216C32.5812 1.54012 34.6916 0.7 37 0.7V-0.7C34.3453 -0.7 31.9148 0.267679 30.0448 1.86867L30.9552 2.93216ZM37 0.7C42.1362 0.7 46.3 4.86375 46.3 10H47.7C47.7 4.09055 42.9094 -0.7 37 -0.7V0.7ZM46.3 10C46.3 15.1362 42.1362 19.3 37 19.3V20.7C42.9094 20.7 47.7 15.9094 47.7 10H46.3ZM37 19.3C34.6916 19.3 32.5812 18.4599 30.9552 17.0678L30.0448 18.1313C31.9148 19.7323 34.3453 20.7 37 20.7V19.3ZM30.0448 17.0678C28.4188 18.4599 26.3084 19.3 24 19.3V20.7C26.6547 20.7 29.0852 19.7323 30.9552 18.1313L30.0448 17.0678ZM24 19.3C21.4651 19.3 19.1682 18.2867 17.49 16.6416L16.51 17.6413C18.4393 19.5326 21.084 20.7 24 20.7V19.3Z" fill="#272928" mask="url(#path-1-inside-1_1400_23700)"/>
                <path d="M14.7928 11.3797C14.5578 10.7366 14.4752 10.1583 14.4476 9.72363C14.5932 9.57906 14.6827 9.37844 14.6827 9.15717C14.6827 8.71659 14.3257 8.35862 13.8841 8.35862C13.4435 8.35862 13.0856 8.71561 13.0856 9.15717C13.0856 9.39909 13.1937 9.61643 13.3639 9.76198C13.414 10.2881 13.5261 10.9519 13.7691 11.6895C13.9943 12.374 14.2726 12.9375 14.5263 13.3722C13.6953 13.2797 12.9676 13.1037 12.3657 12.9109C12.1759 12.7477 11.9222 12.5048 11.6694 12.1724C10.9555 11.2352 10.7755 10.2832 10.6732 9.70888C10.4618 8.51401 10.6152 7.49911 10.7755 6.84906C10.7765 6.84217 10.7794 6.8343 10.7804 6.82742C10.8148 6.81267 10.8433 6.79596 10.8679 6.77727C10.8925 6.75563 10.9161 6.73302 10.9378 6.70941C11.1158 6.52354 11.2249 6.27178 11.2249 5.99544C11.2249 5.42407 10.7627 4.96185 10.1913 4.96185C9.61996 4.96185 9.15676 5.42407 9.15676 5.99544C9.15676 6.40947 9.40065 6.76645 9.75174 6.93265C9.76255 8.19734 9.73108 9.227 9.69863 9.96654C9.67306 10.5556 9.65143 10.8162 9.54915 11.1339C9.20692 12.194 8.30904 12.8165 7.72783 13.1361C7.25382 13.2384 6.8634 13.3122 6.54181 13.3663C6.78079 12.6995 7.00305 11.9383 7.17613 11.0906C7.2607 10.6746 7.32463 10.2753 7.3738 9.89573H7.37478C7.66588 9.77673 7.87043 9.49154 7.87043 9.15717C7.87043 8.71659 7.51345 8.35862 7.07189 8.35862C6.66671 8.35862 6.33136 8.66054 6.28121 9.05293C6.27826 9.07358 6.27629 9.09522 6.27432 9.11587V9.11685C6.27432 9.12472 6.27334 9.13259 6.27334 9.14045V9.15717C6.27334 9.35976 6.34808 9.54464 6.47396 9.68527C6.43659 10.1504 6.3471 10.7208 6.14844 11.3463C5.81998 12.3818 5.32728 13.1509 4.94767 13.6465C4.94669 13.6475 4.94669 13.6475 4.9457 13.6485C4.92309 13.68 4.90047 13.7075 4.87883 13.737L4.87785 13.738C4.76476 13.913 4.72148 14.153 4.76279 14.3664C4.84736 14.807 5.29286 15.0391 5.61936 15.0519C5.96651 15.0666 6.23203 14.8375 6.33628 14.7519C7.18891 14.0615 8.46541 13.9425 9.4213 13.8521C10.449 13.7557 11.219 13.9544 12.4847 14.2809C13.3816 14.512 14.1044 14.7863 14.606 14.9978C15.0947 14.4766 15.5845 13.9553 16.0732 13.4341C15.7025 13.0466 15.1527 12.3661 14.7928 11.3797ZM9.43704 12.847C9.63176 12.6818 9.85893 12.4507 10.0527 12.135C10.1127 12.0386 10.1628 11.9442 10.2051 11.8537C10.3251 12.0632 10.4814 12.2953 10.684 12.5313C10.7725 12.6336 10.8601 12.726 10.9466 12.8106C10.4441 12.8224 9.94055 12.8342 9.43704 12.847Z" fill="#272928"/>
                <path d="M20.7685 5.0921C20.5256 5.09604 18.9787 5.14521 18.3994 6.17486C18.3129 6.32828 18.0198 6.85048 18.2637 7.235C18.4594 7.5438 18.9246 7.64313 19.256 7.52806C19.5373 7.4307 19.6877 7.15338 19.9778 6.60266C20.3358 5.92704 20.6102 5.39893 20.7685 5.0921Z" fill="#272928"/>
                <path d="M20.6731 12.2435C20.203 12.3045 18.5607 12.569 17.9598 13.7383C17.8477 13.9567 17.5979 14.4415 17.8241 14.7985C18.0198 15.1073 18.485 15.2066 18.8164 15.0915C19.1793 14.9657 19.3228 14.6106 19.5382 14.1661C19.7693 13.6951 20.1263 13.0313 20.6731 12.2435Z" fill="#272928"/>
                <path d="M20.4528 8.79272C20.2099 8.84288 18.8086 9.1448 18.1851 9.97678C18.0897 10.1046 17.8999 10.3643 17.8802 10.733C17.8743 10.8393 17.8507 11.2808 18.128 11.4667C18.4614 11.6889 18.9738 11.3693 18.9964 11.3536C19.3907 11.0999 19.4419 10.7222 19.7526 10.0338C19.8913 9.72698 20.1116 9.29231 20.4528 8.79272Z" fill="#272928"/>
                <path d="M23.9301 4.99377C23.7688 5.1403 23.4994 5.04491 23.0844 4.99377C22.7441 4.95148 22.273 4.93575 21.6889 5.04491C21.5886 5.08523 21.4204 5.16784 21.2739 5.33207C20.9995 5.64087 20.8333 6.20142 21.0959 6.4994C21.1372 6.54562 21.2631 6.67052 21.5443 6.69413C21.6535 6.66167 21.8108 6.61545 22.0016 6.56726C23.4325 6.20339 24.6274 6.21027 25.2165 6.23683C25.8675 6.26731 26.7368 6.36566 27.7291 6.65184C27.8068 6.4758 27.9081 6.2801 28.0419 6.07653C28.3044 5.67725 28.5985 5.39107 28.8374 5.19635C28.3349 5.1403 27.8157 5.09211 27.2807 5.05278C26.5244 4.99771 25.7957 4.96525 25.0975 4.95148C25.1594 4.60531 25.005 4.26209 24.7169 4.09688C24.3471 3.88544 23.9626 4.08409 23.939 4.09688C24.0442 4.42928 24.118 4.82265 23.9301 4.99377Z" fill="#272928"/>
                <path d="M27.6555 13.7108C27.3969 13.5407 27.1619 13.3686 26.9504 13.1975C27.3399 12.9172 27.7283 12.6369 28.1187 12.3566C28.1571 12.3104 28.2594 12.1708 28.2535 11.979C28.2515 11.9102 28.2358 11.8531 28.22 11.8098C28.1777 11.74 28.1354 11.6702 28.0932 11.6014C27.7804 11.2621 27.4677 10.9248 27.154 10.5855C27.5356 10.2708 27.8375 10.0298 28.0932 9.84101C28.1738 9.78102 28.3164 9.67776 28.338 9.51156C28.3557 9.36896 28.2771 9.24702 28.2259 9.18211C27.1992 8.35701 26.1735 7.53093 25.1468 6.70583C25.1124 6.6842 25.0298 6.63797 24.9167 6.63699C24.8301 6.63601 24.7633 6.66157 24.7269 6.67829C24.3768 6.83072 24.0237 6.98611 23.6687 7.14542C22.8859 7.49749 22.1247 7.85448 21.3842 8.2154C21.3212 8.26359 21.2426 8.34325 21.2091 8.46519C21.2072 8.47404 21.2052 8.47994 21.2042 8.48486C21.1875 8.55566 21.1521 8.74547 21.2091 8.99034C21.3006 9.38175 21.6084 9.83511 21.8523 10.022C21.8867 10.0485 21.9929 10.1252 22.0047 10.2422C22.0106 10.3062 21.986 10.3603 21.9683 10.3927C21.7913 10.553 21.2318 11.0654 20.9279 11.4922C20.8453 11.6073 20.7538 11.7567 20.801 11.8984C20.8345 11.9977 20.922 12.0547 20.979 12.0852C21.0508 12.1216 21.276 12.2366 21.3763 12.2888C21.7795 12.4953 22.0323 12.6271 22.2221 12.8552C22.2791 12.9241 22.3371 13.0096 22.3322 13.1168C22.3273 13.2181 22.2703 13.2938 22.2388 13.3283C22.0205 13.4856 21.6468 13.7147 21.1305 13.8446C20.625 13.9724 20.1942 13.9537 19.9287 13.9203C20.0743 14.1986 20.3998 14.7316 20.9525 15.0119C21.1905 15.1319 21.3419 15.1417 21.4265 15.1388C21.5465 15.1358 21.6969 15.1034 22.1365 14.8005C22.4473 14.5861 22.5938 14.4484 22.9577 14.1652C23.1583 14.0098 23.3235 13.8868 23.4317 13.8101C23.5517 13.9537 23.6726 14.0973 23.7956 14.2409C24.0267 14.5123 24.2588 14.7778 24.4889 15.0365C24.5292 15.065 24.6256 15.127 24.7642 15.1378C24.9236 15.1496 25.0406 15.0866 25.0819 15.062C25.2776 14.8801 25.4782 14.6824 25.6828 14.47C25.8382 14.3068 25.9847 14.1455 26.1224 13.9881C26.2758 14.3186 26.5423 14.7788 27.0025 15.2066C27.2012 15.3905 27.3989 15.5351 27.5778 15.6472C28.1728 15.2912 28.7668 14.9362 29.3608 14.5811C28.8494 14.3845 28.2643 14.1091 27.6555 13.7108ZM23.8221 12.1413L23.4268 12.5366C23.3284 12.634 23.1701 12.634 23.0718 12.5366L22.3116 11.7764C22.2132 11.6781 22.2132 11.5187 22.3116 11.4214L22.7069 11.026C22.8043 10.9277 22.9636 10.9277 23.0619 11.026L23.8221 11.7862C23.9195 11.8846 23.9195 12.0429 23.8221 12.1413ZM24.127 10.4094L24.5223 10.0151C24.6207 9.91673 24.779 9.91673 24.8773 10.0151L25.2727 10.4094C25.37 10.5078 25.37 10.6671 25.2727 10.7645L24.8773 11.1598C24.779 11.2581 24.6207 11.2581 24.5223 11.1598L24.127 10.7645C24.0296 10.6671 24.0296 10.5078 24.127 10.4094ZM25.3769 13.5633L24.9816 13.9577C24.8832 14.056 24.7249 14.056 24.6266 13.9577L24.2312 13.5633C24.1339 13.465 24.1339 13.3056 24.2312 13.2083L24.6266 12.8129C24.7249 12.7146 24.8832 12.7146 24.9816 12.8129L25.3769 13.2083C25.4743 13.3066 25.4743 13.465 25.3769 13.5633ZM24.9835 8.88118C24.9688 8.8566 24.9354 8.81234 24.8773 8.78874C24.7888 8.75137 24.6797 8.77694 24.598 8.85168C24.1093 9.13983 23.6195 9.42699 23.1308 9.71513C22.9685 9.54991 22.8062 9.3847 22.644 9.22047C22.6371 9.21457 22.5889 9.17326 22.5909 9.10836C22.5928 9.06902 22.6105 9.0405 22.6184 9.02968C23.0196 8.76219 23.4484 8.49371 23.9047 8.22818C24.1732 8.0728 24.4358 7.92627 24.6944 7.78761C24.7485 7.76007 24.8232 7.73549 24.9029 7.75122C24.9855 7.76696 25.0386 7.82006 25.0553 7.83579C25.1714 7.94594 25.8391 8.52223 26.7645 9.31684C26.7685 9.31979 26.8167 9.36503 26.8068 9.43092C26.7999 9.48107 26.7616 9.52336 26.7105 9.53615C26.5738 9.65809 26.4361 9.77905 26.3004 9.90002C26.1892 9.82036 26.0781 9.73873 25.966 9.65514C25.6208 9.39748 25.2933 9.13884 24.9835 8.88118ZM26.4223 12.6585C26.324 12.7569 26.1647 12.7569 26.0663 12.6585L25.672 12.2632C25.5736 12.1658 25.5736 12.0065 25.672 11.9082L26.3063 11.2739C26.4046 11.1755 26.5639 11.1755 26.6613 11.2739L27.0566 11.6682C27.155 11.7666 27.155 11.9259 27.0566 12.0242L26.4223 12.6585Z" fill="#272928"/>
                <path d="M36.6915 12.1819C36.5617 12.6097 36.3384 13.3444 36.0473 14.2894C35.8103 15.0565 35.6874 15.443 35.4583 15.5787C35.1878 15.74 34.8082 15.6004 34.6489 15.1696C34.4493 14.6336 34.6882 13.9059 34.759 13.6915C35.2321 12.2567 36.4928 12.1878 36.6915 12.1819Z" fill="#272928"/>
                <path d="M37.7074 14.5608C37.5697 14.8244 37.2727 15.0152 37.0426 14.9119C36.7554 14.7831 36.7112 14.2619 36.6984 14.1085C36.6119 13.0778 37.4488 12.1829 37.5815 12.0443C37.615 12.3432 37.672 12.8585 37.7408 13.5223C37.7989 14.0632 37.8244 14.3376 37.7074 14.5608Z" fill="#272928"/>
                <path d="M39.1767 14.2088C39.0822 14.5048 38.8167 14.788 38.5679 14.7733C38.2571 14.7536 38.1263 14.2796 38.088 14.14C37.8284 13.2047 38.5168 12.0698 38.6269 11.8938C38.7105 12.1623 38.8541 12.6255 39.035 13.2244C39.1845 13.7102 39.2563 13.958 39.1767 14.2088Z" fill="#272928"/>
                <path d="M40.4747 14.134C40.2761 14.3524 39.9535 14.3317 39.7686 14.1586C39.6113 14.0121 39.5798 13.7416 39.5237 13.2076C39.4549 12.5497 39.4038 12.0383 39.3752 11.7404C39.5306 11.7994 40.5111 12.1918 40.639 13.1998C40.6567 13.3502 40.7225 13.8616 40.4747 14.134Z" fill="#272928"/>
                <path d="M42.841 10.0046C42.8685 9.91808 42.8931 9.82564 42.9157 9.72729C42.9865 9.41358 43.0042 9.1274 42.9993 8.88548C42.601 8.97595 41.9992 9.092 41.2577 9.14806C40.4758 9.20706 39.9487 9.14412 39.3596 9.15101C38.3467 9.16379 37.3613 9.19526 36.4064 9.24345C36.4044 9.19034 36.4113 9.11364 36.4516 9.03693C36.4664 9.00841 36.547 8.86778 36.8184 8.79402C37.5806 8.58848 40.6627 8.558 40.6627 8.558C40.9607 8.55505 41.4317 8.54029 42.0178 8.4744C42.2155 8.28755 42.4466 7.99941 42.5332 7.60014C42.544 7.55097 42.5489 7.51261 42.5538 7.48311C42.5853 7.26872 42.6128 6.86256 42.4358 6.44461C42.3817 6.31774 42.3306 6.18793 42.2086 6.06696C41.8684 5.72965 41.3206 5.76112 41.0413 5.77685C40.6489 5.79849 40.2585 5.83586 39.869 5.87716C39.3301 5.93617 38.7912 5.99419 38.2533 6.0532C38.1579 6.05516 38.0644 6.05713 37.973 6.06008C38.2798 5.75718 38.3447 5.2871 38.1185 4.9252C37.8835 4.54855 37.3849 4.38136 36.9414 4.54166C36.9483 4.73441 36.9335 4.99306 36.8509 5.28415C36.7427 5.66572 36.5578 5.95584 36.3985 6.15548C36.0789 6.19088 35.9078 6.23907 35.7524 6.36888C35.4859 6.59113 35.3944 6.92255 35.3679 7.19594C35.3679 7.19693 35.3679 7.19693 35.3679 7.19791C35.3659 7.2225 35.3639 7.2461 35.362 7.26872C35.3698 7.39853 35.3777 7.53031 35.3836 7.66406C35.4013 8.05055 35.4131 8.44982 35.4161 8.86188C35.418 9.05168 35.418 9.23853 35.4171 9.42342C35.4112 9.7037 35.4043 9.98496 35.3984 10.2652C35.3895 10.5465 35.3748 10.8219 35.359 11.0903H35.361C35.359 11.1218 35.358 11.1543 35.359 11.1867C35.3698 11.4857 35.5498 11.7502 35.7967 11.8082C36.3592 11.7138 36.9591 11.6361 37.5973 11.587C38.983 11.4778 40.2388 11.525 41.3294 11.642C41.3698 13.0129 41.2704 14.0131 41.1632 14.0957C41.0344 14.194 40.8682 14.3012 40.8682 14.3012C40.7099 14.3809 40.5683 14.4055 40.468 14.4114C40.4729 14.4507 40.5683 15.3083 41.1632 15.6446C41.7071 15.9534 42.1909 15.5551 42.2342 15.5177C42.1496 14.0947 42.2745 12.9972 42.4112 12.238C42.5046 11.7168 42.7161 10.7373 42.3768 10.5229C42.2647 10.4521 42.0306 10.4422 41.5655 10.4403C41.4366 10.4393 41.3294 10.4403 41.2577 10.4423C40.8161 10.4334 40.3676 10.4275 39.9133 10.4275C39.6124 10.4275 39.3075 10.4295 38.9997 10.4354C38.1146 10.4501 37.2541 10.4836 36.4182 10.5327C36.4172 10.5052 36.4172 10.4649 36.4172 10.4167C36.4182 10.2446 36.431 10.101 36.4339 10.0823C36.5018 9.67026 39.3645 9.91513 39.3645 9.91513C40.2123 9.98594 41.3963 10.0499 42.841 10.0046ZM36.4772 7.22053C37.1725 7.08776 37.9799 6.96976 38.8787 6.90485C39.6517 6.84978 40.3598 6.84093 40.9892 6.85961C41.1564 6.89305 41.2852 6.99729 41.3226 7.13104C41.3422 7.20283 41.3353 7.27658 41.3039 7.34444C41.2704 7.41722 41.2085 7.48114 41.1259 7.52834C40.4562 7.50769 39.7019 7.51261 38.8777 7.5667C38.0399 7.62374 37.2787 7.72011 36.61 7.83223C36.5677 7.80174 36.4595 7.71028 36.4221 7.55981C36.4152 7.53326 36.4123 7.50671 36.4103 7.48212C36.4103 7.48114 36.4103 7.48114 36.4103 7.48114C36.4034 7.35329 36.4575 7.25396 36.4772 7.22053Z" fill="#272928"/>
                <path d="M35.4151 9.42233C35.4102 9.70261 35.4053 9.98387 35.3994 10.2641C35.3246 10.449 35.2214 10.5326 35.1909 10.5552C35.0984 10.6231 35.0404 10.6054 34.7375 10.5641C34.2979 10.5041 34.2094 10.5139 34.1189 10.6103C34.1012 10.629 33.9891 10.7519 33.936 10.986C33.9105 11.1001 33.9173 11.1601 33.9144 11.3784C33.9085 11.7403 33.8249 12.2133 33.936 12.353C33.9636 12.3864 34.0147 12.4149 34.1189 12.351C34.296 12.2526 34.4789 12.1415 34.6667 12.0176C34.7818 11.9419 34.8939 11.8642 35.0021 11.7865C34.9912 12.2192 34.9804 12.6519 34.9686 13.0856C34.8536 13.2292 34.6657 13.4406 34.412 13.6098C33.8436 13.9914 33.4473 13.8271 32.8523 13.9451C32.5563 14.0022 32.1226 14.1477 31.6033 14.5539C31.5473 14.545 31.4578 14.5175 31.3771 14.4132C31.1618 14.1389 31.1972 13.5852 31.206 13.4672C31.2355 13.0266 31.3919 12.7365 31.4548 12.6332C31.6299 12.646 31.8138 12.6529 32.0075 12.6519C32.3399 12.65 32.6477 12.6244 32.927 12.586C33.0136 12.2428 33.0617 11.9478 33.0903 11.7245C33.1286 11.4236 33.1296 11.2663 33.0903 11.0932C33.0529 10.9289 32.9909 10.8041 32.9418 10.7224C32.8129 10.7932 32.6644 10.8601 32.5002 10.9093C32.3891 10.9427 32.2858 10.9624 32.1904 10.9752C32.156 10.9634 31.9102 10.8739 31.798 10.4884C31.684 10.0989 31.7685 9.61705 31.9308 9.40757C32.0586 9.24236 32.2189 9.26695 32.2957 9.27678C32.51 9.3053 32.7244 9.30432 32.9388 9.29153C32.9978 9.24629 33.0608 9.1804 33.105 9.08206C33.1512 8.98175 33.168 8.87161 33.164 8.55199C33.163 8.43005 33.1581 8.27958 33.1473 8.10748C32.9821 7.93931 32.8759 7.67772 32.8759 7.38368C32.8759 6.87721 33.1916 6.46515 33.581 6.46515C33.9704 6.46515 34.2861 6.87721 34.2861 7.38368C34.2861 7.67576 34.1819 7.93538 34.0196 8.10355C34.0216 8.40251 34.0167 8.62378 34.0029 8.76933C33.9999 8.80867 33.9891 8.91881 34.0314 9.02207C34.0589 9.08796 34.1012 9.13516 34.1465 9.1686C34.1553 9.16762 34.1642 9.16664 34.174 9.16664C34.3913 9.15779 34.7051 9.13123 35.0857 9.05453C35.1122 9.06141 35.305 9.11353 35.4151 9.42233Z" fill="#272928"/>
            </svg>

        </a>
    </Logo>)
}

export default PageLogo
