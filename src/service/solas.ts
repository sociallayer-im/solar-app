import { signInWithEthereum } from './SIWE'
import fetch from '../utils/fetch'

const api = import.meta.env.VITE_SOLAS_API

export async function login (signer: any) {
    return await signInWithEthereum(signer)
}

export interface Profile {
    address: string | null,
    domain: string | null,
    group_owner_id: number | null,
    id: number,
    image_url: string | null,
    twitter: string | null,
    email: string | null,
    username: string | null,
    followers: number
    following: number
}

export interface ProfileSimple {
    id: number,
    address: string | null,
    domain: string | null,
    image_url: string | null,
    email: string | null,
}

interface GetProfileProps {
    address?: string
    email?: string
    id?: number,
    username?: string
}

export async function getProfile (props: GetProfileProps): Promise<Profile | null> {
    const res: any = await fetch.get({
        url: `${api}/profile/get`,
        data: props
    })

    if (!res.data.profile) return null

    return {...res.data.profile,
        followers: res.data.followers_count,
        following: res.data.followings_count } as Profile
}

export async function requestEmailCode (email: string): Promise<void> {
    const res: any = await fetch.post({
        url: `${api}//profile/send_email`,
        data: { email }
    })
    if (res.data.result === 'error') {
        throw new Error(res.data.message || 'Request fail')
    }
}

export interface EmailLoginRes {
    auth_token: string,
    id: number,
    email: string
}
export async function emailLogin (email: string, code: string): Promise<EmailLoginRes> {
    const res = await fetch.post({
        url:`${api}/profile/signin_with_email`,
        data: { email, code }
    })
    if (res.data.result === 'error') {
        throw new Error(res.data.message || 'Verify fail')
    }

    return res.data
}

interface SolasRegistProps {
    domain: string
    email?: string
    address?: string
    auth_token?: string
    username: string
}

export async function regist (props: SolasRegistProps ): Promise<Profile> {

    const res = await fetch.post({
        url: `${api}/profile/create`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.profile as Profile
}

interface QueryBadgeProps {
    sender_id?: number,
    page: number
}

export interface Badge {
    id: number,
    domain: string,
    created_at: string
    name: string,
    title: string,
    token_id: string,
    image_url: string,
    sender: Profile
}

export async function queryBadge (props: QueryBadgeProps): Promise<Badge[]> {
    const res = await fetch.get({
       url: `${api}/badge/list`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.badges as Badge[]
}

export interface QueryBadgeDetailProps {
    id: number
}

export interface BadgeWithBadgelets extends Badge {
    badgelets: Badgelet[]
}

export async function queryBadgeDetail (props: QueryBadgeDetailProps): Promise<BadgeWithBadgelets> {
    const res = await fetch.get({
        url: `${api}/badge/get`,
        data: {...props, with_badgelets: 1}
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.badge as BadgeWithBadgelets
}

interface QueryPresendProps {
    sender_id: number,
    page: number,
    auth_token?: string
}

export interface Presend {
    id: number,
    message: string,
    auth_token?: string,
    sender_id: number,
    group: number | null,
    code: string | null,
    badge: Badge,
    counter: number

}

export async function queryPresend (props: QueryPresendProps): Promise<Presend[]> {
    const res = await fetch.get({
        url: `${api}/presend/list`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.presends as Presend[]
}

export interface PresendWithBadgelets extends Presend {
    badgelets: Badgelet[]
}

export interface QueryPresendDetailProps {
    id: number,
    auth_token?: string
}

export async function queryPresendDetail (props: QueryPresendDetailProps): Promise<PresendWithBadgelets> {
    const res = await fetch.get({
        url: `${api}/presend/get`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.presend as PresendWithBadgelets
}

export interface QueryBadgeletProps {
    receiver_id?: number,
    page: number,
    show_hidden?: boolean
}

export interface Badgelet {
    id: number,
    badge_id: number,
    content: string,
    domain: string,
    hide: boolean,
    top: boolean,
    owner: ProfileSimple,
    receiver: ProfileSimple,
    sender: ProfileSimple,
    status: 'accepted' | 'pending' | 'new' | 'rejected',
    token_id: string | null,
    badge: Badge,
    chain_info: string | null
}

export async function queryBadgelet (props: QueryBadgeletProps): Promise<Badgelet[]> {
    const res = await fetch.get({
        url: `${api}/badgelet/list`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    const list: Badgelet[] = res.data.badgelets

    return list.filter(item => {
        return item.status !== 'rejected'
    })
}

export interface QueryUserGroupProps {
    profile_id: number,
}

export interface Group {
    id: number,
    group_owner_id: number
    image_url: string | null,
    is_group: boolean,
    status: 'active' | 'freeze',
    token_id: string,
    twitter: string | null
    twitter_proof_url: string | null
    username: string
    domain: string
}

export async function queryUserGroup (props: QueryUserGroupProps): Promise<Group[]> {

    const res1 = await fetch.get({
        url: `${api}/group/my-groups`,
        data: props
    })

    if (res1.data.result === 'error') {
        throw new Error(res1.data.message)
    }

    const res2 = await fetch.get({
        url: `${api}/group/list`,
        data: { group_owner_id: props.profile_id}
    })

    if (res2.data.result === 'error') {
        throw new Error(res2.data.message)
    }

    const total = [...res2.data.groups, ...res1.data.groups]
    const groups = total.filter((item) => {
        return item.status !== 'freezed'
    })

    const groupsDuplicateObj: any = {}
    groups.map(item => {
        groupsDuplicateObj[item.id] = item
    })

    console.log('groups', groupsDuplicateObj)
    return Object.values(groupsDuplicateObj) as Group[]
}

export interface AcceptBadgeletProp {
    badgelet_id: number,
    auth_token: string
}

export async function acceptBadgelet (props: AcceptBadgeletProp): Promise<void> {
    const res = await fetch.post({
        url: `${api}/badge/accept`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }
}

export interface RejectBadgeletProp {
    badgelet_id: number,
    auth_token: string
}

export async function rejectBadgelet (props: RejectBadgeletProp): Promise<void> {

    const res = await fetch.post({
        url: `${api}/badge/reject`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }
}

export interface AcceptPresendProps {
    id: number,
    code: string,
    auth_token: string
}

export async function acceptPresend (props: AcceptPresendProps) {
    const res = await fetch.post({
        url: `${api}/presend/use`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data
}

export type SetBadgeletStatusType = 'untop' | 'top' | 'hide' | 'unhide'
export interface SetBadgeletStatusProps {
    type: SetBadgeletStatusType,
    id: number,
    auth_token: string
}

export async function setBadgeletStatus (props: SetBadgeletStatusProps) {
    const res = await fetch.post({
        url: `${api}/badge/${props.type}`,
        data: {
            badgelet_id: props.id,
            auth_token: props.auth_token,
        }
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data
}

export interface QueryBadgeletDetailProps {
    id: number
}

export async function queryBadgeletDetail (props: QueryBadgeletDetailProps): Promise<Badgelet> {
    const res = await fetch.get({
        url: `${api}/badgelet/get`,
        data: {
            id: props.id,
        }
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.badgelet
}

export interface UploadImageProps {
    uploader: string,
    file: any,
    auth_token: string
}

export async function uploadImage (props: UploadImageProps): Promise<string> {
    const randomName = Math.random().toString(36).slice(-8)
    const formData = new FormData()
    formData.append('data', props.file)
    formData.append('auth_token', props.auth_token)
    formData.append('uploader', props.uploader)
    formData.append('resource', randomName)
    const res = await fetch.post({
        url: `${api}/upload/image`,
        data: formData,
        header: { 'Content-Type': 'multipart/form-data' }
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.result.thumbnailUrl
}

export interface SetAvatarProps {
    image_url: string,
    auth_token: string
}

export async function setAvatar (props: SetAvatarProps): Promise<Profile> {
    const res = await fetch.post({
        url: `${api}/profile/update`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

   return res.data.profile
}

export default {
    login,
    getProfile,
    requestEmailCode,
    emailLogin,
    regist,
    queryBadge,
    queryPresend,
    queryBadgelet,
    queryUserGroup,
    acceptBadgelet,
    rejectBadgelet,
    acceptPresend,
    queryPresendDetail,
    queryBadgeDetail,
    setBadgeletStatus,
    queryBadgeletDetail,
    uploadImage,
    setAvatar
}
