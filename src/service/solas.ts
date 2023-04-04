import { signInWithEthereum } from './SIWE'
import fetch from '../utils/fetch'

const api = import.meta.env.VITE_SOLAS_API

interface AuthProp { auth_token: string }
function checkAuth <K extends AuthProp> (props: K) {
    if (!props.auth_token) {
        throw new Error('Please login to continue')
    }
}

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
    is_group: boolean
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
    domain?: string
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
    auth_token: string
    username: string
}

export async function regist (props: SolasRegistProps ): Promise<Profile> {
    checkAuth(props)
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
    sender: Profile,
    content: string
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

    res.data.badge.badgelets = res.data.badge.badgelets.filter((item:Badgelet) => {
        return !item.hide && item.status !== 'rejected'
    })

    res.data.badge.badgelets.forEach((item:Badgelet) => {
        item.sender = res.data.badge.sender
    })

    return res.data.badge
}

interface QueryPresendProps {
    sender_id?: number,
    page: number,
    auth_token?: string,
    group_id?: number
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
    id?: number,
    receiver_id?: number,
    page: number,
    show_hidden?: number
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
    chain_data: string | null
    group: Group | null
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

export interface Group {
    id: number,
    group_owner_id: number
    image_url: string | null,
    is_group: boolean,
    status: 'active' | 'freezed',
    token_id: string,
    twitter: string | null
    twitter_proof_url: string | null
    username: string
    domain: string
}

export interface QueryUserGroupProps {
    profile_id: number,
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

    return Object.values(groupsDuplicateObj) as Group[]
}

export async function queryGroupDetail (groupId: number): Promise<Group> {
    const res = await fetch.get({
        url: `${api}/group/get`,
        data: {id: groupId}
    })

    return res.data.group
}

export interface AcceptBadgeletProp {
    badgelet_id: number,
    auth_token: string
}

export async function acceptBadgelet (props: AcceptBadgeletProp): Promise<void> {
    checkAuth(props)
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
    checkAuth(props)
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
    checkAuth(props)
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
    checkAuth(props)
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
    checkAuth(props)
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
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/profile/update`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

   return res.data.profile
}

export interface CreateBadgeProps {
    name: string,
    title: string,
    domain: string,
    image_url: string,
    auth_token: string,
    content?: string,
    group_id?: number,

}

export async function createBadge (props: CreateBadgeProps): Promise<Badge> {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/badge/create`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.badge as Badge
}

export interface CreatePresendProps {
    badge_id: number,
    message: string,
    counter: number | string,
    auth_token: string
}

export async function createPresend (props: CreatePresendProps) {
    checkAuth(props)
    props.counter = props.counter === 'Unlimited' ? 65535 : props.counter
    const res = await fetch.post({
        url: `${api}/presend/create`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.presend
}

export interface GetGroupMembersProps {
    group_id: number
}

export async function getGroupMembers (props: GetGroupMembersProps): Promise<Profile[]> {
    const res = await fetch.get({
        url: `${api}/group/members`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.members
}

export async function getFollowers (userId: number): Promise<Profile[]> {
    const res = await fetch.get({
        url: `${api}/profile/followers`,
        data: {
            id: userId
        }
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.followers
}

export async function getFollowings (userId: number): Promise<Profile[]>{
    const res = await fetch.get({
        url: `${api}/profile/followings`,
        data: {
            id: userId
        }
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.followings
}

export interface IssueBatchProps {
    issues: string[],
    auth_token: string,
    reason: string,
    badgeId: number
}

export async function issueBatch (props: IssueBatchProps): Promise<Badgelet[]> {
    checkAuth(props)
    const walletAddress: string[] = []
    const socialLayerUsers: string[] = []
    const domains: string[] = []
    const emails: string[] = []
    const socialLayerDomain = import.meta.env.VITE_SOLAS_DOMAIN

    props.issues.forEach(item => {
        if (item.endsWith('.eth') || item.endsWith('.dot')) {
            domains.push(item)
        } else if (item.startsWith('0x')) {
            walletAddress.push(item)
        } else if (item.endsWith(socialLayerDomain)) {
            socialLayerUsers.push(item)
        } else if (item.match(/^\w+@\w+\.\w+$/i)) {
            emails.push(item)
        } else {
            socialLayerUsers.push(item + socialLayerDomain)
        }
    })

    console.log('walletAddress', walletAddress)
    console.log('socialLayerUsers', socialLayerUsers)
    console.log('domains', domains)
    const domainToWalletAddress: any = []
    domains.map((item) => {
        return domainToWalletAddress.push(DDNSServer(item))
    })

    const domainOwnerAddress = await Promise.all(domainToWalletAddress)
    domainOwnerAddress.forEach((item, index) => {
        if (!item) throw new Error(`Domain ${domains[index]} is not exist`)
    })


    const handleError = (account: string) => {
        throw new Error(`Invalid Account ${account}`)
    }

    const task: any = []
    walletAddress.forEach((item) => {
        task.push(getProfile({ address: item } ).catch(e => { handleError(item) }))
    })
    socialLayerUsers.map((item) => {
        task.push(getProfile({ domain: item } ).catch(e => { handleError(item) }))
    })
    domainOwnerAddress.map((item) => {
        task.push(getProfile({ address: item } ).catch(e => { handleError(item) }))
    })
    emails.map((item) => {
        task.push(getProfile({ email: item } ).catch(e => { handleError(item) }))
    })

    const profiles = await Promise.all(task)
    profiles.forEach((item, index) => {
        if (!item)  {
            handleError(domains[index])
        }
    })

    const subjectUrls = props.reason.match(/@[^\s]*/g)
    let subjectUrl = ''
    if (subjectUrls) {
        subjectUrl = subjectUrls[0].replace('@', '')
    }

    const res = await fetch.post({
        url: `${api}/badge/send`,
        data: {
            badge_id: props.badgeId,
            receivers: [...walletAddress, ...socialLayerUsers, ...domainOwnerAddress, ...emails],
            content: props.reason,
            subject_url: subjectUrl,
            auth_token: props.auth_token
        }
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.badgelets
}

export async function DDNSServer (domain: string): Promise<string | null> {
    const res = await fetch.get({
        url: `https://api.ddns.so/name/${domain.toLowerCase()}`
    })

    if (res.data.result !== 'ok') {
        throw new Error(`[ddns]: get address fail: ${domain}`)
    }

    return res.data.data ? (res.data.data.owner || null) : null
}

interface FollowProps {
    target_id: number,
    auth_token: string
}

export async function follow (props: FollowProps) {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/profile/follow`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }
}

export async function unfollow (props: FollowProps) {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/profile/unfollow`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }
}

export interface Invite {
    id: number,
    message: string,
    receiver_id: number
    sender_id: number,
    status: 'accepted' | 'cancelled' | 'new'
    expires_at: string
    group_id: number
}

export interface QueryGroupInvitesProps {
    group_id: number,
    page: number
}

export async function queryGroupInvites (props: QueryGroupInvitesProps): Promise<Invite[]> {
    const res = await fetch.get({
        url: `${api}/group/group-invites`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.group_invites.filter((item:Invite) => {
        const now = Date.parse(new Date().toString())
        return Date.parse(new Date(item.expires_at).toString()) - now >= 0
    })
}

export interface CreateGroupProps {
    username: string,
    auth_token: string
}

export async function createGroup (props: CreateGroupProps): Promise<Group> {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/group/create`,
        data:  props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.group
}

export interface SendInviteProps {
    group_id: number,
    receivers: string[],
    message: string,
    auth_token: string
}
export async function sendInvite (props: SendInviteProps): Promise<Invite[]> {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/group/send-invite`,
        data:  props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.group_invites
}

export interface QueryInviteDetailProps {
    group_id: number
    invite_id: number
}

export async function queryInviteDetail (props: QueryInviteDetailProps): Promise<Invite | null> {
    const res = await fetch.get({
        url: `${api}/group/group-invites`,
        data:  { group_id: props.group_id }
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.group_invites.find((item: Invite) => {
        return item.id === props.invite_id
    }) || null
}

export interface AcceptInviteProps {
    group_invite_id: number,
    auth_token: string
}

export async function acceptInvite (props: AcceptInviteProps) {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/group/accept-invite`,
        data:  props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }
}

export async function cancelInvite (props: AcceptInviteProps) {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/group/cancel-invite`,
        data:  props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }
}

export async function queryPendingInvite (receiverId: number):Promise<Invite[]> {
    const res = await fetch.get({
        url: `${api}/group/group-invites`,
        data:  { receiver_id: receiverId, status: 'new' }
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.group_invites
}

export  interface UpdateGroupProps {
    id: number,
    image_url: string
    auth_token: string
}

export async function updateGroup (props: UpdateGroupProps) {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/group/update`,
        data:  props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.group
}

export interface LeaveGroupProps {
    group_id: number,
    profile_id: number,
    auth_token: string
}

export async function leaveGroup (props: LeaveGroupProps) {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/group/remove-member`,
        data:  props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }
}

export interface SearchDomainProps {
    username: string,
    page: number
}

export async function searchDomain (props: SearchDomainProps): Promise<Profile[]> {
    const res = await fetch.get({
        url: `${api}/profile/search`,
        data:  props
    })

    return res.data.profiles
}

export interface SearchBadgeProps {
    title: string,
    page: number
}
export async function searchBadge (props: SearchBadgeProps): Promise<Badge[]>  {
    const res = await fetch.get({
        url: `${api}/badge/search`,
        data:  props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.badges
}

export interface QueryBadgeByHashTagProps {
    hashtag: string,
    page: number
}

export async function queryBadgeByHashTag (props: QueryBadgeByHashTagProps): Promise<Badgelet[]> {
    const res = await fetch.get({
        url:`${api}/badgelet/list`,
        data:  props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.badgelets
        .filter((item: Badgelet) => {
            return item.status !== 'rejected'
        })
}

export interface freezeGroupProps {
    group_id: number
    auth_token: string
}

export async function freezeGroup (props: freezeGroupProps) {
    checkAuth(props)
    const res = await fetch.post({
        url:`${api}/group/freeze`,
        data:  props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }
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
    setAvatar,
    createBadge,
    createPresend,
    getGroupMembers,
    getFollowers,
    getFollowings,
    issueBatch,
    follow,
    unfollow,
    queryGroupInvites,
    queryGroupDetail,
    createGroup,
    sendInvite,
    queryInviteDetail,
    acceptInvite,
    cancelInvite,
    queryPendingInvite,
    updateGroup,
    leaveGroup,
    searchDomain,
    searchBadge,
    queryBadgeByHashTag,
    freezeGroup
}
