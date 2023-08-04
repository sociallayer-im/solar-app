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
        <a href="https://solar-activity.vercel.app" style={{height: '15px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="39" height="12" viewBox="0 0 39 12" fill="none">
                <path d="M10.7928 7.37973C10.5578 6.73656 10.4752 6.1583 10.4476 5.72363C10.5932 5.57906 10.6827 5.37844 10.6827 5.15717C10.6827 4.71659 10.3257 4.35862 9.88412 4.35862C9.44354 4.35862 9.08557 4.71561 9.08557 5.15717C9.08557 5.39909 9.19375 5.61643 9.36388 5.76198C9.41403 6.28812 9.52614 6.95193 9.76905 7.68951C9.99426 8.37397 10.2726 8.93749 10.5263 9.37216C9.6953 9.27972 8.96756 9.10369 8.3657 8.91093C8.17589 8.74768 7.92217 8.50477 7.66943 8.17237C6.95546 7.23516 6.77549 6.2832 6.67321 5.70888C6.46177 4.51401 6.61519 3.49911 6.77549 2.84906C6.77647 2.84217 6.77942 2.8343 6.78041 2.82742C6.81483 2.81267 6.84334 2.79596 6.86793 2.77727C6.89252 2.75563 6.91612 2.73302 6.93776 2.70941C7.11576 2.52354 7.22492 2.27178 7.22492 1.99544C7.22492 1.42407 6.7627 0.961853 6.19133 0.961853C5.61996 0.961853 5.15676 1.42407 5.15676 1.99544C5.15676 2.40947 5.40065 2.76645 5.75174 2.93265C5.76255 4.19734 5.73108 5.227 5.69863 5.96654C5.67306 6.55561 5.65143 6.81622 5.54915 7.13387C5.20692 8.19401 4.30904 8.81652 3.72783 9.13614C3.25382 9.23841 2.8634 9.31217 2.54181 9.36626C2.78079 8.6995 3.00305 7.93832 3.17613 7.0906C3.2607 6.67461 3.32463 6.27533 3.3738 5.89573H3.37478C3.66588 5.77673 3.87043 5.49154 3.87043 5.15717C3.87043 4.71659 3.51345 4.35862 3.07189 4.35862C2.66671 4.35862 2.33136 4.66054 2.28121 5.05293C2.27826 5.07358 2.27629 5.09522 2.27432 5.11587V5.11685C2.27432 5.12472 2.27334 5.13259 2.27334 5.14045V5.15717C2.27334 5.35976 2.34808 5.54464 2.47396 5.68527C2.43659 6.15044 2.3471 6.72083 2.14844 7.34629C1.81998 8.38184 1.32728 9.15089 0.947673 9.64654C0.946689 9.64752 0.946687 9.64752 0.945704 9.64851C0.923085 9.67998 0.900467 9.70751 0.878831 9.73701L0.87785 9.738C0.764755 9.91305 0.721483 10.153 0.762787 10.3664C0.847362 10.807 1.29286 11.0391 1.61936 11.0519C1.96651 11.0666 2.23203 10.8375 2.33628 10.7519C3.18891 10.0615 4.46541 9.94255 5.4213 9.85207C6.44899 9.7557 7.21901 9.95435 8.48469 10.2809C9.38158 10.512 10.1044 10.7863 10.606 10.9978C11.0947 10.4766 11.5845 9.95533 12.0732 9.43411C11.7025 9.04664 11.1527 8.36611 10.7928 7.37973ZM5.43704 8.84701C5.63176 8.68179 5.85893 8.45069 6.05267 8.135C6.11266 8.03863 6.16281 7.94422 6.2051 7.85374C6.32508 8.06321 6.48144 8.2953 6.68403 8.53132C6.77254 8.6336 6.86006 8.72605 6.94661 8.81062C6.44407 8.82242 5.94055 8.83422 5.43704 8.84701Z" fill="#272928"/>
                <path d="M16.7685 1.0921C16.5256 1.09604 14.9787 1.14521 14.3994 2.17486C14.3129 2.32828 14.0198 2.85048 14.2637 3.235C14.4594 3.5438 14.9246 3.64313 15.256 3.52806C15.5373 3.4307 15.6877 3.15338 15.9778 2.60266C16.3358 1.92704 16.6102 1.39893 16.7685 1.0921Z" fill="#272928"/>
                <path d="M16.6731 8.24353C16.203 8.3045 14.5607 8.56905 13.9598 9.73835C13.8477 9.95667 13.5979 10.4415 13.8241 10.7985C14.0198 11.1073 14.485 11.2066 14.8164 11.0915C15.1793 10.9657 15.3228 10.6106 15.5382 10.1661C15.7693 9.69507 16.1263 9.03126 16.6731 8.24353Z" fill="#272928"/>
                <path d="M16.4528 4.79272C16.2099 4.84288 14.8086 5.1448 14.1851 5.97678C14.0897 6.10463 13.8999 6.36425 13.8802 6.73304C13.8743 6.83925 13.8507 7.28081 14.128 7.46668C14.4614 7.68893 14.9738 7.36932 14.9964 7.35358C15.3907 7.09986 15.4419 6.72222 15.7526 6.03382C15.8913 5.72698 16.1116 5.29231 16.4528 4.79272Z" fill="#272928"/>
                <path d="M19.9301 0.993768C19.7688 1.1403 19.4994 1.04491 19.0844 0.993768C18.7441 0.95148 18.273 0.935747 17.6889 1.04491C17.5886 1.08523 17.4204 1.16784 17.2739 1.33207C16.9995 1.64087 16.8333 2.20142 17.0959 2.4994C17.1372 2.54562 17.2631 2.67052 17.5443 2.69413C17.6535 2.66167 17.8108 2.61545 18.0016 2.56726C19.4325 2.20339 20.6274 2.21027 21.2165 2.23683C21.8675 2.26731 22.7368 2.36566 23.7291 2.65184C23.8068 2.4758 23.9081 2.2801 24.0419 2.07653C24.3044 1.67725 24.5985 1.39107 24.8374 1.19635C24.3349 1.1403 23.8157 1.09211 23.2807 1.05278C22.5244 0.997705 21.7957 0.965249 21.0975 0.951481C21.1594 0.605313 21.005 0.262095 20.7169 0.0968784C20.3471 -0.114559 19.9626 0.0840938 19.939 0.0968784C20.0442 0.429278 20.118 0.822651 19.9301 0.993768Z" fill="#272928"/>
                <path d="M23.6555 9.71081C23.3969 9.54068 23.1619 9.36858 22.9504 9.19747C23.3399 8.91719 23.7283 8.6369 24.1187 8.35663C24.1571 8.31041 24.2594 8.17076 24.2535 7.97899C24.2515 7.91015 24.2358 7.85311 24.22 7.80984C24.1777 7.74002 24.1354 7.67019 24.0932 7.60135C23.7804 7.26207 23.4677 6.92476 23.154 6.58547C23.5356 6.27077 23.8375 6.02983 24.0932 5.84101C24.1738 5.78102 24.3164 5.67776 24.338 5.51156C24.3557 5.36896 24.2771 5.24702 24.2259 5.18211C23.1992 4.35701 22.1735 3.53093 21.1468 2.70583C21.1124 2.6842 21.0298 2.63797 20.9167 2.63699C20.8301 2.63601 20.7633 2.66157 20.7269 2.67829C20.3768 2.83072 20.0237 2.98611 19.6687 3.14542C18.8859 3.49749 18.1247 3.85448 17.3842 4.2154C17.3212 4.26359 17.2426 4.34325 17.2091 4.46519C17.2072 4.47404 17.2052 4.47994 17.2042 4.48486C17.1875 4.55566 17.1521 4.74547 17.2091 4.99034C17.3006 5.38175 17.6084 5.83511 17.8523 6.02196C17.8867 6.04851 17.9929 6.12522 18.0047 6.24225C18.0106 6.30617 17.986 6.36026 17.9683 6.39272C17.7913 6.55302 17.2318 7.06538 16.9279 7.49219C16.8453 7.60725 16.7538 7.75674 16.801 7.89835C16.8345 7.99768 16.922 8.05472 16.979 8.0852C17.0508 8.12159 17.276 8.23665 17.3763 8.28877C17.7795 8.49529 18.0323 8.62707 18.2221 8.85523C18.2791 8.92407 18.3371 9.00963 18.3322 9.11682C18.3273 9.21812 18.2703 9.29384 18.2388 9.32826C18.0205 9.48561 17.6468 9.71475 17.1305 9.84456C16.625 9.97241 16.1942 9.95372 15.9287 9.92029C16.0743 10.1986 16.3998 10.7316 16.9525 11.0119C17.1905 11.1319 17.3419 11.1417 17.4265 11.1388C17.5465 11.1358 17.6969 11.1034 18.1365 10.8005C18.4473 10.5861 18.5938 10.4484 18.9577 10.1652C19.1583 10.0098 19.3235 9.88685 19.4317 9.81014C19.5517 9.95372 19.6726 10.0973 19.7956 10.2409C20.0267 10.5123 20.2588 10.7778 20.4889 11.0365C20.5292 11.065 20.6256 11.127 20.7642 11.1378C20.9236 11.1496 21.0406 11.0866 21.0819 11.062C21.2776 10.8801 21.4782 10.6824 21.6828 10.47C21.8382 10.3068 21.9847 10.1455 22.1224 9.98814C22.2758 10.3186 22.5423 10.7788 23.0025 11.2066C23.2012 11.3905 23.3989 11.5351 23.5778 11.6472C24.1728 11.2912 24.7668 10.9362 25.3608 10.5811C24.8494 10.3845 24.2643 10.1091 23.6555 9.71081ZM19.8221 8.14125L19.4268 8.5366C19.3284 8.63396 19.1701 8.63396 19.0718 8.5366L18.3116 7.77641C18.2132 7.67806 18.2132 7.51875 18.3116 7.42139L18.7069 7.02605C18.8043 6.9277 18.9636 6.9277 19.0619 7.02605L19.8221 7.78624C19.9195 7.88458 19.9195 8.04291 19.8221 8.14125ZM20.127 6.40943L20.5223 6.01508C20.6207 5.91673 20.779 5.91673 20.8773 6.01508L21.2727 6.40943C21.37 6.50778 21.37 6.66709 21.2727 6.76445L20.8773 7.15979C20.779 7.25814 20.6207 7.25814 20.5223 7.15979L20.127 6.76445C20.0296 6.66709 20.0296 6.50778 20.127 6.40943ZM21.3769 9.5633L20.9816 9.95766C20.8832 10.056 20.7249 10.056 20.6266 9.95766L20.2312 9.5633C20.1339 9.46496 20.1339 9.30564 20.2312 9.20828L20.6266 8.81294C20.7249 8.7146 20.8832 8.7146 20.9816 8.81294L21.3769 9.20828C21.4743 9.30663 21.4743 9.46496 21.3769 9.5633ZM20.9835 4.88118C20.9688 4.8566 20.9354 4.81234 20.8773 4.78874C20.7888 4.75137 20.6797 4.77694 20.598 4.85168C20.1093 5.13983 19.6195 5.42699 19.1308 5.71513C18.9685 5.54991 18.8062 5.3847 18.644 5.22047C18.6371 5.21457 18.5889 5.17326 18.5909 5.10836C18.5928 5.06902 18.6105 5.0405 18.6184 5.02968C19.0196 4.76219 19.4484 4.49371 19.9047 4.22818C20.1732 4.0728 20.4358 3.92627 20.6944 3.78761C20.7485 3.76007 20.8232 3.73549 20.9029 3.75122C20.9855 3.76696 21.0386 3.82006 21.0553 3.83579C21.1714 3.94594 21.8391 4.52223 22.7645 5.31684C22.7685 5.31979 22.8167 5.36503 22.8068 5.43092C22.7999 5.48107 22.7616 5.52336 22.7105 5.53615C22.5738 5.65809 22.4361 5.77905 22.3004 5.90002C22.1892 5.82036 22.0781 5.73873 21.966 5.65514C21.6208 5.39748 21.2933 5.13884 20.9835 4.88118ZM22.4223 8.65854C22.324 8.75688 22.1647 8.75688 22.0663 8.65854L21.672 8.26321C21.5736 8.16585 21.5736 8.00653 21.672 7.90818L22.3063 7.27387C22.4046 7.17553 22.5639 7.17553 22.6613 7.27387L23.0566 7.66822C23.155 7.76657 23.155 7.92588 23.0566 8.02423L22.4223 8.65854Z" fill="#272928"/>
                <path d="M32.6915 8.18195C32.5617 8.60974 32.3384 9.34436 32.0473 10.2894C31.8103 11.0565 31.6874 11.443 31.4583 11.5787C31.1878 11.74 30.8082 11.6004 30.6489 11.1696C30.4493 10.6336 30.6882 9.90591 30.759 9.69152C31.2321 8.25669 32.4928 8.18785 32.6915 8.18195Z" fill="#272928"/>
                <path d="M33.7074 10.5608C33.5697 10.8244 33.2727 11.0152 33.0426 10.9119C32.7554 10.7831 32.7112 10.2619 32.6984 10.1085C32.6119 9.07784 33.4488 8.18291 33.5815 8.04425C33.615 8.34321 33.672 8.85853 33.7408 9.52235C33.7989 10.0632 33.8244 10.3376 33.7074 10.5608Z" fill="#272928"/>
                <path d="M35.1767 10.2088C35.0822 10.5048 34.8167 10.788 34.5679 10.7733C34.2571 10.7536 34.1263 10.2796 34.088 10.14C33.8284 9.20472 34.5168 8.06983 34.6269 7.8938C34.7105 8.16228 34.8541 8.62547 35.035 9.22438C35.1845 9.7102 35.2563 9.95802 35.1767 10.2088Z" fill="#272928"/>
                <path d="M36.4747 10.134C36.2761 10.3524 35.9535 10.3317 35.7686 10.1586C35.6113 10.0121 35.5798 9.74164 35.5237 9.20764C35.4549 8.54972 35.4038 8.03834 35.3752 7.74036C35.5306 7.79936 36.5111 8.19175 36.639 9.19977C36.6567 9.35024 36.7225 9.86162 36.4747 10.134Z" fill="#272928"/>
                <path d="M38.841 6.00462C38.8685 5.91808 38.8931 5.82564 38.9157 5.72729C38.9865 5.41358 39.0042 5.1274 38.9993 4.88548C38.601 4.97595 37.9992 5.092 37.2577 5.14806C36.4758 5.20706 35.9487 5.14412 35.3596 5.15101C34.3467 5.16379 33.3613 5.19526 32.4064 5.24345C32.4044 5.19034 32.4113 5.11364 32.4516 5.03693C32.4664 5.00841 32.547 4.86778 32.8184 4.79402C33.5806 4.58848 36.6627 4.558 36.6627 4.558C36.9607 4.55505 37.4317 4.54029 38.0178 4.4744C38.2155 4.28755 38.4466 3.99941 38.5332 3.60014C38.544 3.55097 38.5489 3.51261 38.5538 3.48311C38.5853 3.26872 38.6128 2.86256 38.4358 2.44461C38.3817 2.31774 38.3306 2.18793 38.2086 2.06696C37.8684 1.72965 37.3206 1.76112 37.0413 1.77685C36.6489 1.79849 36.2585 1.83586 35.869 1.87716C35.3301 1.93617 34.7912 1.99419 34.2533 2.0532C34.1579 2.05516 34.0644 2.05713 33.973 2.06008C34.2798 1.75718 34.3447 1.2871 34.1185 0.925202C33.8835 0.548548 33.3849 0.381362 32.9414 0.541661C32.9483 0.734414 32.9335 0.993055 32.8509 1.28415C32.7427 1.66572 32.5578 1.95584 32.3985 2.15548C32.0789 2.19088 31.9078 2.23907 31.7524 2.36888C31.4859 2.59113 31.3944 2.92255 31.3679 3.19594C31.3679 3.19693 31.3679 3.19693 31.3679 3.19791C31.3659 3.2225 31.3639 3.2461 31.362 3.26872C31.3698 3.39853 31.3777 3.53031 31.3836 3.66406C31.4013 4.05055 31.4131 4.44982 31.4161 4.86188C31.418 5.05168 31.418 5.23853 31.4171 5.42342C31.4112 5.7037 31.4043 5.98496 31.3984 6.26524C31.3895 6.5465 31.3748 6.82186 31.359 7.09034H31.361C31.359 7.12181 31.358 7.15426 31.359 7.18671C31.3698 7.48567 31.5498 7.75022 31.7967 7.80824C32.3592 7.71383 32.9591 7.63614 33.5973 7.58697C34.983 7.47781 36.2388 7.52501 37.3294 7.64204C37.3698 9.01294 37.2704 10.0131 37.1632 10.0957C37.0344 10.194 36.8682 10.3012 36.8682 10.3012C36.7099 10.3809 36.5683 10.4055 36.468 10.4114C36.4729 10.4507 36.5683 11.3083 37.1632 11.6446C37.7071 11.9534 38.1909 11.5551 38.2342 11.5177C38.1496 10.0947 38.2745 8.99721 38.4112 8.238C38.5046 7.71678 38.7161 6.73728 38.3768 6.52289C38.2647 6.45209 38.0306 6.44225 37.5655 6.44028C37.4366 6.4393 37.3294 6.44028 37.2577 6.44225C36.8161 6.4334 36.3676 6.4275 35.9133 6.4275C35.6124 6.4275 35.3075 6.42947 34.9997 6.43537C34.1146 6.45012 33.2541 6.48355 32.4182 6.53273C32.4172 6.50519 32.4172 6.46487 32.4172 6.41668C32.4182 6.24458 32.431 6.101 32.4339 6.08232C32.5018 5.67026 35.3645 5.91513 35.3645 5.91513C36.2123 5.98594 37.3963 6.04986 38.841 6.00462ZM32.4772 3.22053C33.1725 3.08776 33.9799 2.96976 34.8787 2.90485C35.6517 2.84978 36.3598 2.84093 36.9892 2.85961C37.1564 2.89305 37.2852 2.99729 37.3226 3.13104C37.3422 3.20283 37.3353 3.27658 37.3039 3.34444C37.2704 3.41722 37.2085 3.48114 37.1259 3.52834C36.4562 3.50769 35.7019 3.51261 34.8777 3.5667C34.0399 3.62374 33.2787 3.72011 32.61 3.83223C32.5677 3.80174 32.4595 3.71028 32.4221 3.55981C32.4152 3.53326 32.4123 3.50671 32.4103 3.48212C32.4103 3.48114 32.4103 3.48114 32.4103 3.48114C32.4034 3.35329 32.4575 3.25396 32.4772 3.22053Z" fill="#272928"/>
                <path d="M31.4151 5.42233C31.4102 5.70261 31.4053 5.98387 31.3994 6.26415C31.3246 6.44903 31.2214 6.53263 31.1909 6.55524C31.0984 6.6231 31.0404 6.6054 30.7375 6.56409C30.2979 6.5041 30.2094 6.51394 30.1189 6.61032C30.1012 6.629 29.9891 6.75193 29.936 6.98599C29.9105 7.10007 29.9173 7.16005 29.9144 7.37838C29.9085 7.74028 29.8249 8.21331 29.936 8.35295C29.9636 8.38639 30.0147 8.41491 30.1189 8.35099C30.296 8.25265 30.4789 8.14152 30.6667 8.01761C30.7818 7.94188 30.8939 7.86419 31.0021 7.7865C30.9912 8.21921 30.9804 8.65192 30.9686 9.08561C30.8536 9.22919 30.6657 9.44063 30.412 9.60978C29.8436 9.99135 29.4473 9.82712 28.8523 9.94513C28.5563 10.0022 28.1226 10.1477 27.6033 10.5539C27.5473 10.545 27.4578 10.5175 27.3771 10.4132C27.1618 10.1389 27.1972 9.5852 27.206 9.46718C27.2355 9.02661 27.3919 8.7365 27.4548 8.63324C27.6299 8.64602 27.8138 8.6529 28.0075 8.65192C28.3399 8.64995 28.6477 8.62438 28.927 8.58603C29.0136 8.24281 29.0617 7.94778 29.0903 7.72455C29.1286 7.42362 29.1296 7.26626 29.0903 7.09318C29.0529 6.92895 28.9909 6.80405 28.9418 6.72243C28.8129 6.79324 28.6644 6.86011 28.5002 6.90928C28.3891 6.94271 28.2858 6.96238 28.1904 6.97517C28.156 6.96336 27.9102 6.87388 27.798 6.48837C27.684 6.09893 27.7685 5.61705 27.9308 5.40757C28.0586 5.24236 28.2189 5.26695 28.2957 5.27678C28.51 5.3053 28.7244 5.30432 28.9388 5.29153C28.9978 5.24629 29.0608 5.1804 29.105 5.08206C29.1512 4.98175 29.168 4.87161 29.164 4.55199C29.163 4.43005 29.1581 4.27958 29.1473 4.10748C28.9821 3.93931 28.8759 3.67772 28.8759 3.38368C28.8759 2.87721 29.1916 2.46515 29.581 2.46515C29.9704 2.46515 30.2861 2.87721 30.2861 3.38368C30.2861 3.67576 30.1819 3.93538 30.0196 4.10355C30.0216 4.40251 30.0167 4.62378 30.0029 4.76933C29.9999 4.80867 29.9891 4.91881 30.0314 5.02207C30.0589 5.08796 30.1012 5.13516 30.1465 5.1686C30.1553 5.16762 30.1642 5.16664 30.174 5.16664C30.3913 5.15779 30.7051 5.13123 31.0857 5.05453C31.1122 5.06141 31.305 5.11353 31.4151 5.42233Z" fill="#272928"/>
            </svg>
        </a>
    </Logo>)
}

export default PageLogo
