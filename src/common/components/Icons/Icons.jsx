import React from 'react';

const icons = {
    home: (
        <svg width="30" height="30" viewBox="0 0 24 27" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.457436 8.625C0 9.61957 0 10.751 0 13.014V20.0813C0 23.224 0 24.7953 0.976311 25.7716C1.91926 26.7146 3.41729 26.7468 6.35 26.7479V18.4147C6.35 16.8591 7.61106 15.598 9.16667 15.598H14.1667C15.7223 15.598 16.9833 16.8591 16.9833 18.4147V26.7479C19.916 26.7468 21.4141 26.7146 22.357 25.7716C23.3333 24.7953 23.3333 23.224 23.3333 20.0813V13.014C23.3333 10.751 23.3333 9.61957 22.8759 8.625C22.4185 7.63044 21.5594 6.89409 19.8412 5.42139L18.1746 3.99282C15.0691 1.33094 13.5163 0 11.6667 0C9.81705 0 8.26428 1.33094 5.15875 3.99282L3.49209 5.42139C1.77394 6.89409 0.914871 7.63044 0.457436 8.625ZM14.6833 26.7479V18.4147C14.6833 18.1294 14.452 17.898 14.1667 17.898H9.16667C8.88132 17.898 8.65 18.1294 8.65 18.4147V26.7479H14.6833Z" fill="currentColor"/>
        </svg>
    ),
    marklist: (
        <svg width="26" height="30" viewBox="0 0 24 26" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9.25C1 5.36091 1 3.41637 2.20818 2.20818C3.41637 1 5.36091 1 9.25 1H14.75C18.6391 1 20.5836 1 21.7918 2.20818C23 3.41637 23 5.36091 23 9.25V18.638C23 22.3275 23 24.1722 21.8391 24.7365C20.6782 25.3007 19.2276 24.161 16.3265 21.8815L15.398 21.152C13.7668 19.8703 12.9511 19.2295 12 19.2295C11.0489 19.2295 10.2332 19.8703 8.60198 21.152L7.67351 21.8815C4.77238 24.161 3.32181 25.3007 2.1609 24.7365C1 24.1722 1 22.3275 1 18.638V9.25Z" fill="currentColor" strokeWidth="2"/>
        </svg> 
    ),
    marklist_fill: (
        <svg width="26" height="30" viewBox="0 0 24 26" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9.25C1 5.36091 1 3.41637 2.20818 2.20818C3.41637 1 5.36091 1 9.25 1H14.75C18.6391 1 20.5836 1 21.7918 2.20818C23 3.41637 23 5.36091 23 9.25V18.638C23 22.3275 23 24.1722 21.8391 24.7365C20.6782 25.3007 19.2276 24.161 16.3265 21.8815L15.398 21.152C13.7668 19.8703 12.9511 19.2295 12 19.2295C11.0489 19.2295 10.2332 19.8703 8.60198 21.152L7.67351 21.8815C4.77238 24.161 3.32181 25.3007 2.1609 24.7365C1 24.1722 1 22.3275 1 18.638V9.25Z" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
        </svg>
    ),
    marklist_Unfill: (
        <svg width="26" height="30" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9.25C1 5.36091 1 3.41637 2.20818 2.20818C3.41637 1 5.36091 1 9.25 1H14.75C18.6391 1 20.5836 1 21.7918 2.20818C23 3.41637 23 5.36091 23 9.25V18.638C23 22.3275 23 24.1722 21.8391 24.7365C20.6782 25.3007 19.2276 24.161 16.3265 21.8815L15.398 21.152C13.7668 19.8703 12.9511 19.2295 12 19.2295C11.0489 19.2295 10.2332 19.8703 8.60198 21.152L7.67351 21.8815C4.77238 24.161 3.32181 25.3007 2.1609 24.7365C1 24.1722 1 22.3275 1 18.638V9.25Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
    ),
    training: (
        <svg width="33" height="33" viewBox="0 0 28 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.7986 0.687019C14.8448 -0.229006 12.6551 -0.229006 10.7012 0.687018L1.50096 5.00031C0.0214537 5.69394 -0.364283 7.64984 0.34375 9.00166L0.34375 15.8125C0.34375 16.382 0.805456 16.8438 1.375 16.8438C1.94454 16.8438 2.40625 16.382 2.40625 15.8125V10.549L10.7014 14.438C12.6552 15.354 14.8449 15.354 16.7988 14.438L25.999 10.1247C28.0003 9.18644 28.0003 5.93862 25.9991 5.00038L16.7986 0.687019Z" fill="currentColor"/>
            <path d="M4.125 13.6328V18.735C4.125 20.121 4.81732 21.4187 6.02983 22.0902C8.04884 23.2083 11.2805 24.75 13.75 24.75C16.2195 24.75 19.4512 23.2083 21.4702 22.0902C22.6827 21.4187 23.375 20.121 23.375 18.735V13.6328L17.6743 16.3054C15.1657 17.4815 12.3344 17.4815 9.82585 16.3054L4.125 13.6328Z" fill="currentColor"/>
        </svg>
    ),
    statistic: (
        <svg width="31" height="31" viewBox="0 0 31 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.0714 3.32143C11.0714 1.48772 12.5592 0 14.3929 0H16.6071C18.4408 0 19.9286 1.48772 19.9286 3.32143V27.6786C19.9286 29.5123 18.4408 31 16.6071 31H14.3929C12.5592 31 11.0714 29.5123 11.0714 27.6786V3.32143ZM0 16.6071C0 14.7734 1.48772 13.2857 3.32143 13.2857H5.53571C7.36942 13.2857 8.85714 14.7734 8.85714 16.6071V27.6786C8.85714 29.5123 7.36942 31 5.53571 31H3.32143C1.48772 31 0 29.5123 0 27.6786V16.6071ZM25.4643 4.42857H27.6786C29.5123 4.42857 31 5.91629 31 7.75V27.6786C31 29.5123 29.5123 31 27.6786 31H25.4643C23.6306 31 22.1429 29.5123 22.1429 27.6786V7.75C22.1429 5.91629 23.6306 4.42857 25.4643 4.42857Z" fill="currentColor"/>
        </svg>
    ),
    profile: (
        <svg width="33" height="33" viewBox="0 0 39 39" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="19.5" cy="9.75" r="6.5" fill="currentColor"/>
            <ellipse cx="19.5" cy="27.625" rx="11.375" ry="6.5" fill="currentColor"/>
        </svg>
    ),
    pagination: (
        <svg width="20" height="20" viewBox="0 0 23 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect width="10" height="10" rx="3.5" fill="currentColor"/>
            <rect x="13" width="10" height="10" rx="3.5" fill="currentColor"/>
            <rect x="13" y="13" width="10" height="10" rx="3.5" fill="currentColor"/>
            <rect y="13" width="10" height="10" rx="3.5" fill="currentColor"/>
        </svg>
    ),
    words: (
        <svg width="33" height="33" viewBox="0 0 39 39" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.47619 23.9134L5.31735 27.0526C6.29926 30.7171 6.79021 32.5494 7.90321 33.7377C8.78202 34.676 9.91933 35.3327 11.1713 35.6246C12.757 35.9943 14.5892 35.5034 18.2537 34.5215L18.2537 34.5215C21.9182 33.5396 23.7505 33.0486 24.9388 31.9356C25.0375 31.8432 25.133 31.748 25.2253 31.6501C24.6822 31.6045 24.1345 31.5171 23.5778 31.4064C22.4466 31.1815 21.1025 30.8213 19.513 30.3954L19.3394 30.3489L19.2992 30.3381C17.5696 29.8747 16.1246 29.4867 14.9707 29.0699C13.7574 28.6316 12.6549 28.0912 11.7187 27.2143C10.4285 26.006 9.52563 24.4422 9.12423 22.7207C8.83296 21.4715 8.91623 20.2465 9.14333 18.9765C9.36095 17.7595 9.75178 16.301 10.22 14.5536L10.22 14.5536L11.0884 11.3127L11.119 11.1987C7.99809 12.0394 6.35539 12.5368 5.25991 13.5629C4.32161 14.4417 3.66498 15.579 3.37306 16.831C3.00334 18.4166 3.49429 20.2489 4.47619 23.9134Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M33.8475 17.4126L33.0064 20.5518C32.0245 24.2163 31.5335 26.0486 30.4205 27.2369C29.5417 28.1752 28.4044 28.8318 27.1524 29.1238C26.996 29.1602 26.8371 29.1883 26.6744 29.2084C25.1874 29.3918 23.373 28.9057 20.07 28.0206C16.4055 27.0387 14.5732 26.5478 13.3849 25.4348C12.4466 24.556 11.79 23.4187 11.4981 22.1667C11.1283 20.581 11.6193 18.7488 12.6012 15.0843L13.4424 11.945C13.5835 11.4181 13.7147 10.9288 13.8388 10.4741C14.5783 7.76681 15.0753 6.27735 16.0282 5.25991C16.907 4.32161 18.0443 3.66498 19.2963 3.37306C20.882 3.00334 22.7142 3.49429 26.3787 4.47619C30.0432 5.45809 31.8755 5.94905 33.0638 7.06205C34.0021 7.94086 34.6587 9.07817 34.9507 10.3302C35.3204 11.9158 34.8294 13.7481 33.8475 17.4126ZM17.9602 15.9346C18.1344 15.2844 18.8027 14.8986 19.4528 15.0728L27.301 17.1757C27.9511 17.3499 28.337 18.0182 28.1628 18.6683C27.9885 19.3185 27.3203 19.7043 26.6701 19.5301L18.822 17.4272C18.1718 17.253 17.786 16.5847 17.9602 15.9346ZM16.6978 20.6429C16.872 19.9928 17.5403 19.6069 18.1904 19.7812L22.8993 21.0429C23.5495 21.2171 23.9353 21.8854 23.7611 22.5356C23.5869 23.1857 22.9186 23.5715 22.2685 23.3973L17.5596 22.1356C16.9094 21.9614 16.5236 21.2931 16.6978 20.6429Z" fill="currentColor"/>
        </svg>
    ),
    books: (
        <svg width="33" height="33" viewBox="0 0 39 39" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.15381 3.52881C3.25 5.43261 3.25 8.49674 3.25 14.625V21.125C3.25 27.2533 3.25 30.3174 5.15381 32.2212C7.05761 34.125 10.1217 34.125 16.25 34.125H22.75C28.8783 34.125 31.9424 34.125 33.8462 32.2212C35.75 30.3174 35.75 27.2533 35.75 21.125V14.625C35.75 8.49674 35.75 5.43261 33.8462 3.52881C31.9424 1.625 28.8783 1.625 22.75 1.625H16.25C10.1217 1.625 7.05761 1.625 5.15381 3.52881ZM20.3246 25.5487L20.3125 25.555V11.8345L20.3481 11.8144C21.2473 11.2942 22.6988 10.5195 23.8875 10.19C24.7657 9.9466 25.9034 9.83445 26.9047 9.78526C28.2131 9.72101 29.25 10.7988 29.25 12.1088V20.9801C29.25 22.3335 28.1461 23.4245 26.7964 23.5251C25.9739 23.5864 25.086 23.6897 24.375 23.8634C23.0156 24.1956 21.3158 25.0264 20.3246 25.5487ZM9.75 12.1818V20.9801C9.75 22.3335 10.8539 23.4245 12.2036 23.5251C13.0261 23.5864 13.914 23.6897 14.625 23.8634C15.9844 24.1956 17.6842 25.0264 18.6754 25.5487L18.6875 25.555V11.8803C18.6682 11.871 18.649 11.8614 18.63 11.8514C17.6328 11.328 15.9638 10.5172 14.625 10.19C13.9034 10.0137 12.9995 9.90996 12.1666 9.84898C10.8313 9.7512 9.75 10.8428 9.75 12.1818Z" fill="currentColor"/>
        </svg>
    ),
    recognize: (
        <svg width="33" height="33" viewBox="0 0 39 39" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4375 3.25C14.0913 3.25 13 4.34131 13 5.6875V7.3125C13 8.65869 14.0913 9.75 15.4375 9.75H23.5625C24.9087 9.75 26 8.65869 26 7.3125V5.6875C26 4.34131 24.9087 3.25 23.5625 3.25H15.4375Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M10.5625 6.5595C8.5184 6.67419 7.22797 6.99991 6.30285 7.92503C4.875 9.35289 4.875 11.651 4.875 16.2472V25.9972C4.875 30.5934 4.875 32.8915 6.30285 34.3193C7.73071 35.7472 10.0288 35.7472 14.625 35.7472H24.375C28.9712 35.7472 31.2693 35.7472 32.6971 34.3193C34.125 32.8915 34.125 30.5934 34.125 25.9972V16.2472C34.125 11.651 34.125 9.35289 32.6971 7.92503C31.772 6.99991 30.4816 6.67419 28.4375 6.5595V7.3125C28.4375 10.0049 26.2549 12.1875 23.5625 12.1875H15.4375C12.7451 12.1875 10.5625 10.0049 10.5625 7.3125V6.5595ZM25.2066 20.391C25.6987 19.9317 25.7252 19.1605 25.266 18.6684C24.8067 18.1764 24.0355 18.1498 23.5434 18.609L17.4107 24.3329L15.4566 22.509C14.9645 22.0498 14.1933 22.0764 13.734 22.5684C13.2748 23.0605 13.3014 23.8317 13.7934 24.291L16.5791 26.891C17.0474 27.328 17.774 27.328 18.2423 26.891L25.2066 20.391Z" fill="currentColor"/>
        </svg>
    ),
    reproduce: (
        <svg width="33" height="33" viewBox="0 0 39 39" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.8432 26.8146C27.1276 26.5928 27.3855 26.3349 27.9013 25.819L34.3321 19.3883C34.4876 19.2328 34.4164 18.965 34.2087 18.893C33.4496 18.6296 32.4622 18.1352 31.5385 17.2115C30.6148 16.2878 30.1204 15.3004 29.8571 14.5413C29.785 14.3336 29.5172 14.2624 29.3617 14.4179L22.9309 20.8487C22.4151 21.3645 22.1572 21.6224 21.9354 21.9068C21.6737 22.2423 21.4494 22.6052 21.2664 22.9893C21.1112 23.3149 20.9958 23.6609 20.7652 24.353L20.4671 25.2472L19.9931 26.6692L19.5487 28.0025C19.4351 28.343 19.5238 28.7185 19.7776 28.9724C20.0315 29.2262 20.407 29.3149 20.7475 29.2013L22.0808 28.7569L23.5028 28.2829L24.397 27.9848C25.0891 27.7542 25.4351 27.6388 25.7607 27.4836C26.1448 27.3006 26.5077 27.0763 26.8432 26.8146Z" fill="currentColor"/>
            <path d="M36.3456 17.3748C37.7181 16.0023 37.7181 13.7769 36.3456 12.4044C34.9731 11.0319 32.7477 11.0319 31.3752 12.4044L31.1685 12.6111C30.969 12.8106 30.8786 13.0893 30.9284 13.367C30.9598 13.5417 31.0179 13.7971 31.1236 14.1019C31.3351 14.7113 31.7344 15.5114 32.4865 16.2635C33.2386 17.0156 34.0387 17.4149 34.6481 17.6264C34.9529 17.7321 35.2083 17.7902 35.383 17.8216C35.6607 17.8714 35.9393 17.781 36.1388 17.5815L36.3456 17.3748Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M6.77881 5.15381C4.875 7.05761 4.875 10.1217 4.875 16.25V22.75C4.875 28.8783 4.875 31.9424 6.77881 33.8462C8.68261 35.75 11.7467 35.75 17.875 35.75H21.125C27.2533 35.75 30.3174 35.75 32.2212 33.8462C34.0945 31.9729 34.1245 28.9763 34.125 23.0426L29.5453 27.6224C29.1069 28.0611 28.7479 28.4203 28.3424 28.7366C27.8673 29.1072 27.3533 29.4248 26.8094 29.684C26.3452 29.9053 25.8633 30.0657 25.2749 30.2616L21.5184 31.5138C20.302 31.9192 18.9608 31.6026 18.0541 30.6959C17.1474 29.7893 16.8308 28.4481 17.2363 27.2317L17.6807 25.8984L18.4528 23.5822L18.4884 23.4753C18.6843 22.8868 18.8448 22.4049 19.066 21.9406C19.3252 21.3968 19.6429 20.8828 20.0134 20.4077C20.3297 20.0022 20.689 19.6431 21.1277 19.2047L27.6382 12.6943L29.445 10.8876L29.6517 10.6808C30.8142 9.5183 32.338 8.93719 33.8617 8.9375C33.6158 7.26286 33.1405 6.07307 32.2212 5.15381C30.3174 3.25 27.2533 3.25 21.125 3.25H17.875C11.7467 3.25 8.68261 3.25 6.77881 5.15381ZM11.7812 14.625C11.7812 13.9519 12.3269 13.4062 13 13.4062H23.5625C24.2356 13.4062 24.7812 13.9519 24.7812 14.625C24.7812 15.2981 24.2356 15.8438 23.5625 15.8438H13C12.3269 15.8438 11.7812 15.2981 11.7812 14.625ZM11.7812 21.125C11.7812 20.4519 12.3269 19.9062 13 19.9062H17.0625C17.7356 19.9062 18.2812 20.4519 18.2812 21.125C18.2812 21.7981 17.7356 22.3438 17.0625 22.3438H13C12.3269 22.3438 11.7812 21.7981 11.7812 21.125ZM11.7812 27.625C11.7812 26.9519 12.3269 26.4062 13 26.4062H15.4375C16.1106 26.4062 16.6562 26.9519 16.6562 27.625C16.6562 28.2981 16.1106 28.8438 15.4375 28.8438H13C12.3269 28.8438 11.7812 28.2981 11.7812 27.625Z" fill="currentColor"/>
        </svg>
    ),
    trash: (
        <svg width="33" height="33" viewBox="0 0 39 39" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.46875 10.0208C4.46875 9.27297 5.02999 8.66669 5.72232 8.66669L10.0517 8.66597C10.9119 8.64242 11.6708 8.05157 11.9635 7.17748C11.9712 7.1545 11.98 7.12615 12.0118 7.02329L12.1983 6.41864C12.3125 6.0479 12.4119 5.72492 12.5511 5.43622C13.1009 4.29567 14.1181 3.50367 15.2936 3.30089C15.5912 3.24957 15.9063 3.24978 16.268 3.25003H21.9198C22.2815 3.24978 22.5966 3.24957 22.8941 3.30089C24.0697 3.50367 25.0869 4.29567 25.6367 5.43622C25.7759 5.72492 25.8753 6.0479 25.9895 6.41864L26.176 7.02329C26.2078 7.12615 26.2166 7.1545 26.2243 7.17748C26.517 8.05157 27.4264 8.64314 28.2866 8.66669H32.4652C33.1575 8.66669 33.7188 9.27297 33.7188 10.0208C33.7188 10.7687 33.1575 11.375 32.4652 11.375H5.72232C5.02999 11.375 4.46875 10.7687 4.46875 10.0208Z" fill="currentColor"/>
            <path d="M18.861 35.7497H20.1398C24.5394 35.7497 26.7393 35.7497 28.1696 34.347C29.5999 32.9443 29.7462 30.6434 30.0389 26.0415L30.4606 19.4107C30.6194 16.9138 30.6988 15.6653 29.9812 14.8742C29.2637 14.0831 28.052 14.0831 25.6286 14.0831H13.3722C10.9488 14.0831 9.73706 14.0831 9.01952 14.8742C8.30198 15.6653 8.38138 16.9138 8.54018 19.4107L8.96188 26.0415C9.25454 30.6434 9.40087 32.9443 10.8312 34.347C12.2615 35.7497 14.4613 35.7497 18.861 35.7497Z" fill="currentColor"/>
        </svg>
    ),
    settings: (
        <svg width="25" height="25" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
    ),
    voice_min: (
        <svg width="25" height="25" viewBox="0 0 26 27" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.00448547 13.0199C0.060492 9.91113 0.0884951 8.35676 1.0064 7.02612C1.17393 6.78325 1.41975 6.49468 1.62578 6.29899C2.75458 5.22689 4.24492 5.22689 7.2256 5.22689C8.29051 5.22689 8.82296 5.22689 9.33053 5.07013C9.436 5.03755 9.54036 5 9.64336 4.95755C10.139 4.75326 10.5836 4.40162 11.4728 3.69834C14.9808 0.923705 16.7348 -0.463615 18.207 0.139059C18.4892 0.254608 18.7624 0.421399 19.0065 0.627113C20.2792 1.70006 20.3759 4.1964 20.5693 9.18907C20.6409 11.0377 20.6896 12.6199 20.6896 13.5C20.6896 14.3801 20.6409 15.9623 20.5693 17.8109C20.3759 22.8036 20.2792 25.2999 19.0065 26.3729C18.7624 26.5786 18.4892 26.7454 18.207 26.8609C16.7348 27.4636 14.9808 26.0763 11.4728 23.3017C10.5836 22.5984 10.139 22.2467 9.64336 22.0425C9.54036 22 9.436 21.9624 9.33053 21.9299C8.82296 21.7731 8.29051 21.7731 7.2256 21.7731C4.24492 21.7731 2.75458 21.7731 1.62578 20.701C1.41975 20.5053 1.17393 20.2167 1.0064 19.9739C0.0884954 18.6432 0.0604921 17.0889 0.00448549 13.9801C0.00154386 13.8168 0 13.6566 0 13.5C0 13.3434 0.00154386 13.1831 0.00448547 13.0199Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M23.6357 7.45192C24.1351 7.11908 24.7649 7.33494 25.0424 7.93405L24.1381 8.53672C25.0424 7.93406 25.0424 7.93405 25.0424 7.93405L25.0434 7.93622L25.0445 7.93853L25.0468 7.94357L25.0521 7.95535L25.0654 7.98571C25.0754 8.009 25.0876 8.03837 25.1017 8.07396C25.13 8.14515 25.1658 8.24112 25.2064 8.36281C25.2875 8.60631 25.3877 8.95203 25.485 9.40741C25.6798 10.319 25.8622 11.6638 25.8622 13.5006C25.8622 15.3374 25.6798 16.6822 25.485 17.5938C25.3877 18.0492 25.2875 18.3949 25.2064 18.6384C25.1658 18.7601 25.13 18.856 25.1017 18.9272C25.0876 18.9628 25.0754 18.9922 25.0654 19.0155L25.0521 19.0458L25.0468 19.0576L25.0445 19.0626L25.0434 19.065C25.0434 19.065 25.0424 19.0671 24.1381 18.4645L25.0424 19.0671C24.7649 19.6662 24.1351 19.8821 23.6357 19.5493C23.1405 19.2192 22.9594 18.4737 23.2268 17.8771L23.2337 17.8601C23.2432 17.8363 23.2613 17.7888 23.2854 17.7166C23.3335 17.5723 23.4058 17.3286 23.4809 16.9773C23.6308 16.2757 23.7933 15.1385 23.7933 13.5006C23.7933 11.8627 23.6308 10.7255 23.4809 10.0239C23.4058 9.67262 23.3335 9.42888 23.2854 9.28458C23.2613 9.21237 23.2432 9.16485 23.2337 9.14103L23.2268 9.12409C22.9594 8.52747 23.1405 7.78194 23.6357 7.45192Z" fill="currentColor"/>
        </svg>
    ),
    voice_max: (
        <svg width="29" height="25" viewBox="0 0 31 27" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.00448547 13.0199C0.060492 9.91113 0.0884951 8.35676 1.0064 7.02612C1.17393 6.78325 1.41975 6.49468 1.62578 6.29899C2.75458 5.22689 4.24492 5.22689 7.2256 5.22689C8.29051 5.22689 8.82296 5.22689 9.33053 5.07013C9.436 5.03755 9.54036 5 9.64336 4.95755C10.139 4.75326 10.5836 4.40162 11.4728 3.69834C14.9808 0.923705 16.7348 -0.463615 18.207 0.139059C18.4892 0.254608 18.7624 0.421399 19.0065 0.627113C20.2792 1.70006 20.3759 4.1964 20.5693 9.18907C20.6409 11.0377 20.6896 12.6199 20.6896 13.5C20.6896 14.3801 20.6409 15.9623 20.5693 17.8109C20.3759 22.8036 20.2792 25.2999 19.0065 26.3729C18.7624 26.5786 18.4892 26.7454 18.207 26.8609C16.7348 27.4636 14.9808 26.0763 11.4728 23.3017C10.5836 22.5984 10.139 22.2467 9.64336 22.0425C9.54036 22 9.436 21.9624 9.33053 21.9299C8.82296 21.7731 8.29051 21.7731 7.2256 21.7731C4.24492 21.7731 2.75458 21.7731 1.62578 20.701C1.41975 20.5053 1.17393 20.2167 1.0064 19.9739C0.0884954 18.6432 0.0604921 17.0889 0.00448549 13.9801C0.00154386 13.8168 0 13.6566 0 13.5C0 13.3434 0.00154386 13.1831 0.00448547 13.0199Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M27.0343 2.90698C27.4732 2.46822 28.1255 2.53936 28.4912 3.06587L27.6965 3.86032C28.4912 3.06587 28.4912 3.06587 28.4912 3.06587L28.4928 3.06815L28.4946 3.07071L28.4987 3.07668L28.509 3.09202C28.5169 3.10376 28.5266 3.11854 28.5381 3.13639C28.5611 3.17209 28.5912 3.22007 28.6272 3.28057C28.6993 3.40158 28.7953 3.57267 28.9069 3.79579C29.1301 4.24224 29.4155 4.89609 29.6965 5.77267C30.2596 7.52884 30.8 10.1618 30.8 13.7881C30.8 17.4143 30.2596 20.0473 29.6965 21.8034C29.4155 22.68 29.1301 23.3339 28.9069 23.7803C28.7953 24.0034 28.6993 24.1745 28.6272 24.2955C28.5912 24.356 28.5611 24.404 28.5381 24.4397C28.5266 24.4576 28.5169 24.4724 28.509 24.4841L28.4987 24.4994L28.4946 24.5054L28.4928 24.508C28.4928 24.508 28.4912 24.5102 27.6965 23.7158L28.4912 24.5102C28.1255 25.0368 27.4732 25.1079 27.0343 24.6691C26.5975 24.2325 26.5366 23.4553 26.8966 22.9289C26.8966 22.9289 26.899 22.9252 26.9014 22.9216C26.9087 22.9102 26.9231 22.8875 26.9436 22.8529C26.9847 22.7839 27.0504 22.668 27.1327 22.5034C27.2974 22.1742 27.5293 21.6491 27.7655 20.9125C28.2369 19.4421 28.731 17.1113 28.731 13.7881C28.731 10.4649 28.2369 8.13399 27.7655 6.66364C27.5293 5.92697 27.2974 5.4019 27.1327 5.07274C27.0504 4.90806 26.9847 4.79217 26.9436 4.72316C26.9231 4.68865 26.9087 4.66586 26.9014 4.65454C26.899 4.65088 26.8966 4.64715 26.8966 4.64715" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M23.6357 7.45192C24.1351 7.11908 24.7649 7.33494 25.0424 7.93405L24.1381 8.53672C25.0424 7.93406 25.0424 7.93405 25.0424 7.93405L25.0434 7.93622L25.0445 7.93853L25.0468 7.94357L25.0521 7.95535L25.0654 7.98571C25.0754 8.009 25.0876 8.03837 25.1017 8.07396C25.13 8.14515 25.1658 8.24112 25.2064 8.36281C25.2875 8.60631 25.3877 8.95203 25.485 9.40741C25.6798 10.319 25.8622 11.6638 25.8622 13.5006C25.8622 15.3374 25.6798 16.6822 25.485 17.5938C25.3877 18.0492 25.2875 18.3949 25.2064 18.6384C25.1658 18.7601 25.13 18.856 25.1017 18.9272C25.0876 18.9628 25.0754 18.9922 25.0654 19.0155L25.0521 19.0458L25.0468 19.0576L25.0445 19.0626L25.0434 19.065C25.0434 19.065 25.0424 19.0671 24.1381 18.4645L25.0424 19.0671C24.7649 19.6662 24.1351 19.8821 23.6357 19.5493C23.1405 19.2192 22.9594 18.4737 23.2268 17.8771L23.2337 17.8601C23.2432 17.8363 23.2613 17.7888 23.2854 17.7166C23.3335 17.5723 23.4058 17.3286 23.4809 16.9773C23.6308 16.2757 23.7933 15.1385 23.7933 13.5006C23.7933 11.8627 23.6308 10.7255 23.4809 10.0239C23.4058 9.67262 23.3335 9.42888 23.2854 9.28458C23.2613 9.21237 23.2432 9.16485 23.2337 9.14103L23.2268 9.12409C22.9594 8.52747 23.1405 7.78194 23.6357 7.45192Z" fill="currentColor"/>
        </svg>
    ),
    fill_star: (
        <svg width="28" height="28" viewBox="0 0 36 35" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.1672 3.83788C15.304 0.0302935 20.696 0.0302963 21.8328 3.83788L23.0507 7.91716C23.5668 9.64579 25.1761 10.815 26.9796 10.7717L31.2356 10.6694C35.2081 10.5739 36.8744 15.7021 33.6044 17.9599L30.1012 20.3787C28.6166 21.4037 28.0019 23.2956 28.6004 24.9975L30.0129 29.0135C31.3313 32.7621 26.969 35.9315 23.8113 33.5193L20.4282 30.9349C18.9946 29.8398 17.0054 29.8398 15.5718 30.9349L12.1887 33.5193C9.03103 35.9315 4.66874 32.7621 5.98711 29.0135L7.39955 24.9975C7.99809 23.2956 7.38338 21.4037 5.89884 20.3787L2.39555 17.9599C-0.874389 15.7021 0.791862 10.5739 4.76437 10.6694L9.02036 10.7717C10.8239 10.815 12.4332 9.64579 12.9493 7.91716L14.1672 3.83788Z" fill="currentColor"/>
        </svg>
    ),
    Unfill_star: (
        <svg width="28" height="28" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.6045 4.26699C16.315 1.88726 19.685 1.88725 20.3955 4.267L21.6134 8.34628C22.323 10.7231 24.5359 12.3309 27.0157 12.2713L31.2717 12.169C33.7545 12.1093 34.7959 15.3144 32.7522 16.7255L29.2489 19.1444C27.2076 20.5538 26.3624 23.1551 27.1854 25.4951L28.5979 29.5112C29.4218 31.8541 26.6954 33.8349 24.7218 32.3273L21.3388 29.743C19.3676 28.2371 16.6324 28.2371 14.6612 29.743L11.2782 32.3273C9.3046 33.8349 6.57816 31.8541 7.40215 29.5112L8.81459 25.4951C9.63758 23.1551 8.79235 20.5538 6.7511 19.1444L3.24782 16.7255C1.20411 15.3144 2.24551 12.1093 4.72833 12.169L8.98432 12.2713C11.4641 12.3309 13.677 10.7231 14.3866 8.34628L15.6045 4.26699Z" stroke="currentColor" strokeWidth="3"/>
        </svg>
    ),
    fill_star_btn: (
        <svg width="20" height="20" viewBox="0 0 36 35" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.1672 3.83788C15.304 0.0302935 20.696 0.0302963 21.8328 3.83788L23.0507 7.91716C23.5668 9.64579 25.1761 10.815 26.9796 10.7717L31.2356 10.6694C35.2081 10.5739 36.8744 15.7021 33.6044 17.9599L30.1012 20.3787C28.6166 21.4037 28.0019 23.2956 28.6004 24.9975L30.0129 29.0135C31.3313 32.7621 26.969 35.9315 23.8113 33.5193L20.4282 30.9349C18.9946 29.8398 17.0054 29.8398 15.5718 30.9349L12.1887 33.5193C9.03103 35.9315 4.66874 32.7621 5.98711 29.0135L7.39955 24.9975C7.99809 23.2956 7.38338 21.4037 5.89884 20.3787L2.39555 17.9599C-0.874389 15.7021 0.791862 10.5739 4.76437 10.6694L9.02036 10.7717C10.8239 10.815 12.4332 9.64579 12.9493 7.91716L14.1672 3.83788Z" fill="currentColor"/>
        </svg>
    ),
    Unfill_star_btn: (
        <svg width="20" height="20" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.6045 4.26699C16.315 1.88726 19.685 1.88725 20.3955 4.267L21.6134 8.34628C22.323 10.7231 24.5359 12.3309 27.0157 12.2713L31.2717 12.169C33.7545 12.1093 34.7959 15.3144 32.7522 16.7255L29.2489 19.1444C27.2076 20.5538 26.3624 23.1551 27.1854 25.4951L28.5979 29.5112C29.4218 31.8541 26.6954 33.8349 24.7218 32.3273L21.3388 29.743C19.3676 28.2371 16.6324 28.2371 14.6612 29.743L11.2782 32.3273C9.3046 33.8349 6.57816 31.8541 7.40215 29.5112L8.81459 25.4951C9.63758 23.1551 8.79235 20.5538 6.7511 19.1444L3.24782 16.7255C1.20411 15.3144 2.24551 12.1093 4.72833 12.169L8.98432 12.2713C11.4641 12.3309 13.677 10.7231 14.3866 8.34628L15.6045 4.26699Z" stroke="currentColor" strokeWidth="3"/>
        </svg>
    ),
    translate: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.545 6.714L4.11 8H3L4.862 3H6.146L8 8H6.833L6.398 6.714H4.545ZM6.179 5.978L5.5 3.956H5.451L4.772 5.978H6.179Z" fill="currentColor"/>
            <path d="M0 2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0L9 0C9.53043 0 10.0391 0.210714 10.4142 0.585786C10.7893 0.960859 11 1.46957 11 2V5H14C14.5304 5 15.0391 5.21071 15.4142 5.58579C15.7893 5.96086 16 6.46957 16 7V14C16 14.5304 15.7893 15.0391 15.4142 15.4142C15.0391 15.7893 14.5304 16 14 16H7C6.46957 16 5.96086 15.7893 5.58579 15.4142C5.21071 15.0391 5 14.5304 5 14V11H2C1.46957 11 0.960859 10.7893 0.585786 10.4142C0.210714 10.0391 0 9.53043 0 9V2ZM2 1C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2V9C1 9.26522 1.10536 9.51957 1.29289 9.70711C1.48043 9.89464 1.73478 10 2 10H9C9.26522 10 9.51957 9.89464 9.70711 9.70711C9.89464 9.51957 10 9.26522 10 9V2C10 1.73478 9.89464 1.48043 9.70711 1.29289C9.51957 1.10536 9.26522 1 9 1H2ZM9.138 10.995C9.33067 11.2957 9.54067 11.5777 9.768 11.841C9.02 12.416 8.095 12.842 7 13.133C7.178 13.35 7.451 13.768 7.555 14C8.68 13.641 9.635 13.156 10.441 12.506C11.218 13.171 12.18 13.671 13.371 13.978C13.504 13.724 13.785 13.305 14 13.088C12.875 12.835 11.943 12.394 11.18 11.804C11.861 11.057 12.402 10.153 12.801 9.047H14V8H11V9.047H11.765C11.447 9.891 11.025 10.593 10.493 11.177C10.346 11.0205 10.2074 10.8563 10.078 10.685C9.79559 10.8655 9.47236 10.9721 9.138 10.995Z" fill="currentColor"/>
        </svg>
    ),
    filter: (
        <svg width="28" height="28" viewBox="0 0 126 72" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M119.531 12.9688H6.46875C4.80286 12.9687 3.2052 12.307 2.02724 11.129C0.849273 9.95105 0.1875 8.35339 0.1875 6.6875C0.1875 5.02161 0.849273 3.42395 2.02724 2.24598C3.2052 1.06802 4.80286 0.40625 6.46875 0.40625H119.531C121.197 0.40625 122.795 1.06802 123.973 2.24598C125.151 3.42395 125.812 5.02161 125.812 6.6875C125.812 8.35339 125.151 9.95105 123.973 11.129C122.795 12.307 121.197 12.9687 119.531 12.9688ZM98.5938 42.2812H27.4062C25.7404 42.2812 24.1427 41.6195 22.9647 40.4415C21.7868 39.2635 21.125 37.6659 21.125 36C21.125 34.3341 21.7868 32.7364 22.9647 31.5585C24.1427 30.3805 25.7404 29.7188 27.4062 29.7188H98.5938C100.26 29.7188 101.857 30.3805 103.035 31.5585C104.213 32.7364 104.875 34.3341 104.875 36C104.875 37.6659 104.213 39.2635 103.035 40.4415C101.857 41.6195 100.26 42.2812 98.5938 42.2812ZM73.4688 71.5938H52.5312C50.8654 71.5938 49.2677 70.932 48.0897 69.754C46.9118 68.576 46.25 66.9784 46.25 65.3125C46.25 63.6466 46.9118 62.049 48.0897 60.871C49.2677 59.693 50.8654 59.0312 52.5312 59.0312H73.4688C75.1346 59.0312 76.7323 59.693 77.9103 60.871C79.0882 62.049 79.75 63.6466 79.75 65.3125C79.75 66.9784 79.0882 68.576 77.9103 69.754C76.7323 70.932 75.1346 71.5938 73.4688 71.5938Z" fill="currentColor"/>
        </svg>
    )
    // Добавьте остальные SVG сюда
};

export default icons;
