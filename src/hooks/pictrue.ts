import { sha3 } from 'web3-utils'




function defaultAvatar (seed?: string | number | null) {
    const defAvatars = [
        '/images/default_avatar/avatar_0.png',
        '/images/default_avatar/avatar_1.png',
        '/images/default_avatar/avatar_2.png',
        '/images/default_avatar/avatar_3.png',
        '/images/default_avatar/avatar_4.png',
        '/images/default_avatar/avatar_5.png'
    ]

    if (!seed) return defAvatars[0]

    const hash = sha3(seed.toString()) as string
    const lastNum16 = hash[hash.length - 1]
    const lastNum10 = Number('0x' + lastNum16)
    const avatarIndex = lastNum10 % 6
    return window.location.protocol + '//' + window.location.host + defAvatars[avatarIndex]
}


export default function usePicture () {
    return  { defaultAvatar }
}
