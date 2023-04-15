import { Group, Profile } from '../service/solas'

export const groups: Group[] = [
    {
        id: 567,
        group_owner_id: 1,
        image_url: 'https://ik.imagekit.io/soladata/tr:n-ik_ml_thumbnail/5ypp629n_4fCVC1OIJ',
        is_group: true,
        status: 'active',
        token_id: 'asdasdasdasdasdasda123123asdasd',
        twitter: null,
        twitter_proof_url:null,
        username: 'testgroup1',
        domain: 'testgroup1.sociallayer.im'
    }, {
        id: 568,
        group_owner_id: 1,
        image_url: null,
        is_group: true,
        status: 'active',
        token_id: 'asdasdasdasdasdasda123123asdasd22',
        twitter: null,
        twitter_proof_url:null,
        username: 'testgroup2',
        domain: 'testgroup2.sociallayer.im'
    }, {
        id: 569,
        group_owner_id: 1,
        image_url: null,
        is_group: true,
        status: 'freezed',
        token_id: 'asdasdasdasdasdasda123123asdasd33',
        twitter: null,
        twitter_proof_url:null,
        username: 'testgroup3',
        domain: 'testgroup3.sociallayer.im'
    }
]

export const profiles: Profile[] = [
    {
        address: '0x0b23E3588c906C3F723C58Ef4d6baEe7840A977c',
        domain: 'zfd.sociallayer.im',
        group_owner_id: null,
        id: 1,
        image_url: 'https://ik.imagekit.io/soladata/tr:n-ik_ml_thumbnail/xydvdzqa_qBn0RxwN2',
        twitter: 'twitter',
        email: null,
        username: 'zfd',
        followers: 2,
        following: 6,
        is_group: null
    },
    {
        address: '0x7682Ba569E3823Ca1B7317017F5769F8Aa8842D4',
        domain: 'jiang.sociallayer.im',
        group_owner_id: null,
        id: 46,
        image_url: null,
        twitter: 'jiangplus',
        email: null,
        username: 'jiang',
        followers: 5,
        following: 11,
        is_group: null
    },
    {
        address: 'null',
        domain: '475469442.sociallayer.im',
        group_owner_id: null,
        id: 46,
        image_url: 'https://ik.imagekit.io/soladata/tr:n-ik_ml_thumbnail/0jjlqw8s_VpFMGtEQH',
        twitter: '475469442',
        email: '475469442@qq.com',
        username: 'jiang',
        followers: 0,
        following: 0,
        is_group: null
    }
]
