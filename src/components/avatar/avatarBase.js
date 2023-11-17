import React from "react";
import { Circle, Path, Svg } from "react-native-svg";
import { colors } from "../../config";

const AvatarBase=({background,face})=>{

    return(
        <Svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <Circle cx="26" cy="26" r="26" fill={background}/>
            <Path fillRule="evenodd" clipRule="evenodd" d="M32.1782 13.3358C30.1981 12.2298 27.9215 11.6 25.4995 11.6C20.735 11.6 16.5333 14.0371 14.0437 17.7425C11.849 18.75 10.3199 20.9877 10.3199 23.5893V27.3043C10.3199 29.7788 11.7035 31.9242 13.7264 32.9945C15.1737 35.3562 17.2963 37.2512 19.8217 38.4022C21.8018 39.5082 24.0783 40.1379 26.5004 40.1379C31.4737 40.1379 35.8334 37.4829 38.2735 33.5011C40.2964 32.4308 41.6799 30.2854 41.6799 27.8109V24.0959C41.6799 21.4943 40.1509 19.2566 37.9561 18.2491C36.5239 16.1174 34.525 14.4054 32.1782 13.3358ZM18.0006 15.0581C16.7698 15.9556 15.7022 17.0683 14.8516 18.3417C14.9154 18.3098 14.9797 18.2789 15.0446 18.2491C15.8598 17.0358 16.8586 15.9584 18.0006 15.0581ZM13.6555 19.1214C12.2312 20.2975 11.3208 22.0884 11.3208 24.0959V23.5893C11.3208 21.7323 12.2461 20.0941 13.6555 19.1214ZM20.2688 37.4947C18.2674 36.3684 16.5943 34.7163 15.4318 32.7229C13.5962 31.8683 12.3216 29.9903 12.3216 27.8109V24.0959C12.3216 21.8073 13.7271 19.851 15.712 19.0632C18.0004 15.4864 21.9774 13.1198 26.5004 13.1198C28.3632 13.1198 30.1333 13.5212 31.7311 14.2433C33.577 15.2821 35.1436 16.7681 36.2879 18.5566C38.2728 19.3444 39.6782 21.3007 39.6782 23.5893V27.3043C39.6782 29.4837 38.4037 31.3618 36.5681 32.2163C34.3336 36.0479 30.2131 38.6182 25.4995 38.6182C23.6367 38.6182 21.8665 38.2167 20.2688 37.4947Z" fill={colors.__x_black}/>
            <Path d="M36.288 18.5566C38.2729 19.3444 39.6784 21.3007 39.6784 23.5893V27.3043C39.6784 29.4837 38.4039 31.3618 36.5682 32.2163C34.3337 36.0479 30.2132 38.6182 25.4996 38.6182C20.7861 38.6182 16.6656 36.0479 14.4311 32.2163C12.5954 31.3618 11.3209 29.4837 11.3209 27.3043V23.5893C11.3209 21.3007 12.7264 19.3444 14.7113 18.5566C16.9997 14.9799 20.9766 12.6132 25.4996 12.6132C30.0226 12.6132 33.9996 14.9799 36.288 18.5566Z" fill={face}/>
            <Path d="M38.3438 25.6156C38.3438 26.597 38.2364 27.553 38.0328 28.4722C35.8296 32.7094 31.0831 36.5918 25.5829 36.5918C19.8373 36.5918 14.9141 32.3551 12.8534 27.903C12.7232 27.1604 12.6553 26.3961 12.6553 25.6156C12.6553 23.5644 13.1245 21.6241 13.9602 19.8987C14.2153 19.3719 14.6344 18.9413 15.1649 18.7051C17.6884 17.5812 21.4198 17.3413 25.5829 17.3413C29.581 17.3413 33.1808 17.5625 35.6951 18.5755C36.2619 18.8038 36.7159 19.2453 36.9893 19.7974C37.856 21.548 38.3438 23.5242 38.3438 25.6156Z" fill={colors.__x_black}/>
            <Path fillRule="evenodd" clipRule="evenodd" d="M30.3344 28.4019C30.7212 28.5708 31.152 28.6552 31.6268 28.6552C32.0956 28.6552 32.5235 28.5736 32.9103 28.4104C33.2972 28.2415 33.6312 28.0164 33.9126 27.7349C34.1998 27.4479 34.4195 27.1242 34.5719 26.764C34.7302 26.4037 34.8093 26.0266 34.8093 25.6326C34.8093 25.2498 34.7331 24.8783 34.5807 24.5181C34.4342 24.1522 34.2232 23.8229 33.9477 23.5302C33.6723 23.2375 33.3411 23.0067 32.9543 22.8379C32.5675 22.6634 32.1367 22.5761 31.6619 22.5761C31.1989 22.5761 30.771 22.6578 30.3784 22.821C29.9915 22.9842 29.6545 23.2094 29.3673 23.4964C29.086 23.7779 28.8662 24.0987 28.708 24.459C28.5497 24.8192 28.4706 25.1992 28.4706 25.5988C28.4706 25.9872 28.5438 26.3643 28.6904 26.7302C28.8428 27.0904 29.0567 27.4169 29.3322 27.7096C29.6135 27.9967 29.9476 28.2274 30.3344 28.4019ZM30.2992 26.2067C30.2406 26.0153 30.2113 25.8183 30.2113 25.6157C30.2113 25.4187 30.2377 25.2273 30.2904 25.0415C30.3491 24.8502 30.437 24.6813 30.5542 24.535C30.6714 24.383 30.8179 24.262 30.9938 24.1719C31.1755 24.0818 31.3894 24.0368 31.6356 24.0368C31.8759 24.0368 32.0869 24.079 32.2685 24.1635C32.4502 24.2479 32.5997 24.3661 32.7169 24.5181C32.8341 24.6644 32.9221 24.8305 32.9807 25.0162C33.0393 25.202 33.0686 25.3962 33.0686 25.5988C33.0686 25.7958 33.0393 25.99 32.9807 26.1814C32.9279 26.3671 32.8429 26.5388 32.7257 26.6964C32.6143 26.8484 32.4678 26.9694 32.2861 27.0595C32.1044 27.1495 31.8905 27.1946 31.6443 27.1946C31.3982 27.1946 31.1843 27.1523 31.0026 27.0679C30.8267 26.9779 30.6802 26.8596 30.563 26.7133C30.4458 26.5613 30.3578 26.3925 30.2992 26.2067Z" fill={face}/>
            <Path d="M18.2336 23.1831C18.1075 23.0136 17.9101 22.9139 17.7005 22.9139H16.6593C16.3787 22.9139 16.2234 23.2433 16.4 23.4641L18.1513 25.6537L16.4741 27.7683C16.2988 27.9894 16.4543 28.3175 16.7343 28.3175H17.7754C17.9871 28.3175 18.1862 28.2158 18.312 28.0435L19.301 26.6888L20.29 28.0435C20.4158 28.2158 20.615 28.3175 20.8266 28.3175H21.858C22.138 28.3175 22.2934 27.9894 22.1181 27.7683L20.4409 25.6537L22.1922 23.4641C22.3688 23.2433 22.2136 22.9139 21.9329 22.9139H20.9016C20.692 22.9139 20.4945 23.0136 20.3685 23.1831L19.301 24.6187L18.2336 23.1831Z" fill={face}/>
        </Svg>

    )
}

export default AvatarBase;