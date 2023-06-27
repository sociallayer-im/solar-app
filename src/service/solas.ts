import {signInWithEthereum} from './SIWE'
import fetch from '../utils/fetch'
import {s} from "msw/lib/glossary-de6278a9";

const api = import.meta.env.VITE_SOLAS_API

export type BadgeType = 'badge' | 'nftpass' | 'nft' | 'private' | 'gift'

interface AuthProp {
    auth_token: string
}

function checkAuth<K extends AuthProp>(props: K) {
    if (!props.auth_token) {
        throw new Error('Please login to continue')
    }
}

export async function login(signer: any) {
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
    followers: number,
    following: number,
    is_group: boolean | null,
    badge_count: number,
    status: 'active' | 'freezed'
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

export async function getProfile(props: GetProfileProps): Promise<Profile | null> {
    const res: any = await fetch.get({
        url: `${api}/profile/get`,
        data: props
    })

    if (!res.data.profile) return null

    return {
        ...res.data.profile,
        followers: res.data.followers_count,
        following: res.data.followings_count
    } as Profile
}

export async function requestEmailCode(email: string): Promise<void> {
    const res: any = await fetch.post({
        url: `${api}/profile/send_email`,
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

export async function emailLogin(email: string, code: string): Promise<EmailLoginRes> {
    const res = await fetch.post({
        url: `${api}/profile/signin_with_email`,
        data: {email, code}
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

export async function regist(props: SolasRegistProps): Promise<Profile> {
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

export interface QueryBadgeProps {
    sender_id?: number,
    group_id?: number,
    badge_type?: BadgeType,
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
    group?: Group | null,
    content: string,
    counter: number,
    badge_type: BadgeType,
}

export type NftPass = Badge
export type NftPassWithBadgelets = BadgeWithBadgelets
export interface NftPasslet extends Badgelet {

}

export async function queryBadge(props: QueryBadgeProps): Promise<Badge[]> {
    props.badge_type = props.badge_type || 'badge'

    const res = await fetch.get({
        url: `${api}/badge/list`,
        data: props,
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.badges as Badge[]
}

export async function queryPrivateBadge(props: QueryBadgeProps): Promise<Badge[]> {
    const res = await fetch.get({
        url: `${api}/badge/list`,
        data: {...props, badge_type: 'private'},
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.badges as Badge[]
}

export async function queryNftpass(props: QueryBadgeProps): Promise<NftPass[]> {
    const res = await fetch.get({
        url: `${api}/badge/list`,
        data: {...props, badge_type: 'nftpass'},
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

export async function queryBadgeDetail(props: QueryBadgeDetailProps): Promise<BadgeWithBadgelets> {
    const res = await fetch.get({
        url: `${api}/badge/get`,
        data: {...props, with_badgelets: 1}
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    res.data.badge.badgelets = res.data.badge.badgelets.filter((item: Badgelet) => {
        return !item.hide && item.status !== 'rejected'
    })

    res.data.badge.badgelets.forEach((item: Badgelet) => {
        item.sender = res.data.badge.sender
    })

    return res.data.badge
}

interface QueryPresendProps {
    sender_id?: number,
    page: number,
    auth_token?: string,
    group_id?: number
    all?: 1
}

export interface Presend {
    id: number,
    message: string,
    sender_id: number,
    group: number | null,
    code: string | null,
    badge: Badge,
    counter: number
    badge_id: number
    expires_at: string
    created_at: string

}

export async function queryPresend(props: QueryPresendProps): Promise<Presend[]> {
    const res = await fetch.get({
        url: `${api}/presend/list`,
        data: {...props}
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

export async function queryPresendDetail(props: QueryPresendDetailProps): Promise<PresendWithBadgelets> {
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
    show_hidden?: number,
    badge_id?:number,
    badge_type?: BadgeType,
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
    created_at: string,
    starts_at?: null | string,
    expires_at?: null | string,
}

export async function queryBadgelet(props: QueryBadgeletProps): Promise<Badgelet[]> {
    props.badge_type = props.badge_type || 'badge'

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

export async function queryPrivacyBadgelet(props: QueryBadgeletProps): Promise<Badgelet[]> {
    const res = await fetch.get({
        url: `${api}/badgelet/list`,
        data: {...props, badge_type: 'private'}
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    const list: Badgelet[] = res.data.badgelets

    return list.filter(item => {
        return item.status !== 'rejected'
    })
}

export async function queryNftPasslet(props: QueryBadgeletProps): Promise<NftPasslet[]> {
    const res = await fetch.get({
        url: `${api}/badgelet/list`,
        data: {...props, badge_type: 'nftpass'}
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    const list: NftPasslet[] = res.data.badgelets

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

export async function queryGroupsUserJoined(props: QueryUserGroupProps): Promise<Group[]> {
    const res1 = await fetch.get({
        url: `${api}/group/my-groups`,
        data: props
    })

    if (res1.data.result === 'error') {
        throw new Error(res1.data.message)
    }

    return res1.data.groups.filter((item: Group) => {
        return item.status !== 'freezed'
    })
}

export async function queryGroupsUserCreated(props: QueryUserGroupProps): Promise<Group[]> {

    const res2 = await fetch.get({
        url: `${api}/group/list`,
        data: {group_owner_id: props.profile_id}
    })

    if (res2.data.result === 'error') {
        throw new Error(res2.data.message)
    }

    return res2.data.groups.filter((item: Group) => {
        return item.status !== 'freezed'
    })
}

export async function queryUserGroup(props: QueryUserGroupProps): Promise<Group[]> {

    const res1 = await queryGroupsUserJoined(props)

    const res2 = await queryGroupsUserCreated(props)

    const total = [...res2, ...res1]
    const groups = total.filter((item) => {
        return item.status !== 'freezed'
    })

    const groupsDuplicateObj: any = {}
    groups.map(item => {
        groupsDuplicateObj[item.id] = item
    })

    return Object.values(groupsDuplicateObj) as Group[]
}

export async function queryGroupDetail(groupId: number): Promise<Group> {
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

export async function acceptBadgelet(props: AcceptBadgeletProp): Promise<void> {
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

export async function rejectBadgelet(props: RejectBadgeletProp): Promise<void> {
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

export async function acceptPresend(props: AcceptPresendProps) {
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

export async function setBadgeletStatus(props: SetBadgeletStatusProps) {
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

export async function queryBadgeletDetail(props: QueryBadgeletDetailProps): Promise<Badgelet> {
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

export async function queryNftPassDetail(props: QueryBadgeletDetailProps): Promise<NftPass> {
    const res = await fetch.get({
        url: `${api}/badge/get`,
        data: {
            id: props.id,
        }
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.badge as NftPass
}

export interface UploadImageProps {
    uploader: string,
    file: any,
    auth_token: string
}

export async function uploadImage(props: UploadImageProps): Promise<string> {
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
        header: {'Content-Type': 'multipart/form-data'}
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

export async function setAvatar(props: SetAvatarProps): Promise<Profile> {
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
    badge_type?: string,
    value?: number,
}

export async function createBadge(props: CreateBadgeProps): Promise<Badge> {
    checkAuth(props)
    props.badge_type = props.badge_type ||'badge'

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
    counter: number | string | null,
    auth_token: string
}

export async function createPresend(props: CreatePresendProps) {
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

export async function getGroupMembers(props: GetGroupMembersProps): Promise<Profile[]> {
    const res = await fetch.get({
        url: `${api}/group/members`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.members
}

export async function getFollowers(userId: number): Promise<Profile[]> {
    const res = await fetch.get({
        url: `${api}/profile/followers`,
        data: {
            id: userId
        }
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.profiles
}

export async function getFollowings(userId: number): Promise<Profile[]> {
    const res = await fetch.get({
        url: `${api}/profile/followings`,
        data: {
            id: userId
        }
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.profiles
}

export interface IssueBatchProps {
    issues: string[],
    auth_token: string,
    reason: string,
    badgeId: number,
    starts_at?: string,
    expires_at?: string,
    value?: number | null
}

export async function issueBatch(props: IssueBatchProps): Promise<Badgelet[]> {
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
    const link = [...walletAddress, ...socialLayerUsers, ...domainOwnerAddress, ...emails]
    walletAddress.forEach((item) => {
        task.push(getProfile({address: item}).catch(e => {
            handleError(item)
        }))
    })
    socialLayerUsers.map((item) => {
        task.push(getProfile({domain: item}).catch(e => {
            handleError(item)
        }))
    })
    domainOwnerAddress.map((item) => {
        task.push(getProfile({address: item}).catch(e => {
            handleError(item)
        }))
    })
    emails.map((item) => {
        task.push(getProfile({email: item}).catch(e => {
            handleError(item)
        }))
    })

    const profiles = await Promise.all(task)
    profiles.forEach((item, index) => {
        if (!item) {
            handleError(link[index])
        }

        console.log('item.status', item.status)
        if (item.status === 'freezed') {
            handleError(link[index])
        }
    })

    const subjectUrls = props.reason.match(/@[^\s]+/g)
    let subjectUrl = ''
    if (subjectUrls) {
        subjectUrl = subjectUrls[0].replace('@', '')
    }

    const res = await fetch.post({
        url: `${api}/badge/send`,
        data: {
            badge_id: props.badgeId,
            receivers: link,
            content: props.reason,
            subject_url: subjectUrl,
            auth_token: props.auth_token,
            starts_at: props.starts_at || null,
            expires_at: props.expires_at || null,
            value: props.value
        }
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.badgelets
}

export async function DDNSServer(domain: string): Promise<string | null> {
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

export async function follow(props: FollowProps) {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/profile/follow`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }
}

export async function unfollow(props: FollowProps) {
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
    created_at: string
}

export interface QueryGroupInvitesProps {
    group_id: number,
    page: number
}

export async function queryGroupInvites(props: QueryGroupInvitesProps): Promise<Invite[]> {
    const res = await fetch.get({
        url: `${api}/group/group-invites`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.group_invites.filter((item: Invite) => {
        const now = Date.parse(new Date().toString())
        return Date.parse(new Date(item.expires_at).toString()) - now >= 0
    })
}

export interface CreateGroupProps {
    username: string,
    auth_token: string
}

export async function createGroup(props: CreateGroupProps): Promise<Group> {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/group/create`,
        data: props
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

export async function sendInvite(props: SendInviteProps): Promise<Invite[]> {
    checkAuth(props)
    const walletAddress: string[] = []
    const socialLayerUsers: string[] = []
    const domains: string[] = []
    const emails: string[] = []
    const socialLayerDomain = import.meta.env.VITE_SOLAS_DOMAIN

    props.receivers.forEach(item => {
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
        task.push(getProfile({address: item}).catch(e => {
            handleError(item)
        }))
    })
    socialLayerUsers.map((item) => {
        task.push(getProfile({domain: item}).catch(e => {
            handleError(item)
        }))
    })
    domainOwnerAddress.map((item) => {
        task.push(getProfile({address: item}).catch(e => {
            handleError(item)
        }))
    })
    emails.map((item) => {
        task.push(getProfile({email: item}).catch(e => {
            handleError(item)
        }))
    })

    const profiles = await Promise.all(task)
    profiles.forEach((item, index) => {
        if (!item) {
            handleError(domains[index])
        }
    })

    const res = await fetch.post({
        url: `${api}/group/send-invite`,
        data: {
            ...props,
            receivers: [...walletAddress, ...socialLayerUsers, ...domainOwnerAddress, ...emails]
        }
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

export async function queryInviteDetail(props: QueryInviteDetailProps): Promise<Invite | null> {
    const res = await fetch.get({
        url: `${api}/group/group-invites`,
        data: {group_id: props.group_id}
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

export async function acceptInvite(props: AcceptInviteProps) {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/group/accept-invite`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }
}

export async function cancelInvite(props: AcceptInviteProps) {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/group/cancel-invite`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }
}

export async function queryPendingInvite(receiverId: number): Promise<Invite[]> {
    const res = await fetch.get({
        url: `${api}/group/group-invites`,
        data: {receiver_id: receiverId, status: 'new'}
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.group_invites
}

export interface UpdateGroupProps {
    id: number,
    image_url: string
    auth_token: string
}

export async function updateGroup(props: UpdateGroupProps) {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/group/update`,
        data: props
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

export async function leaveGroup(props: LeaveGroupProps) {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/group/remove-member`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }
}

export interface SearchDomainProps {
    username: string,
    page: number
}

export async function searchDomain(props: SearchDomainProps): Promise<Profile[]> {
    const res = await fetch.get({
        url: `${api}/profile/search`,
        data: props
    })

    return res.data.profiles
}

export interface SearchBadgeProps {
    title: string,
    page: number
}

export async function searchBadge(props: SearchBadgeProps): Promise<Badge[]> {
    const res = await fetch.get({
        url: `${api}/badge/search`,
        data: props
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

export async function queryBadgeByHashTag(props: QueryBadgeByHashTagProps): Promise<Badgelet[]> {
    const res = await fetch.get({
        url: `${api}/badgelet/list`,
        data: props
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

export async function freezeGroup(props: freezeGroupProps) {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/group/freeze`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }
}

export async function updateProfile(props: { data: Partial<Profile>, auth_token: string }) {
    checkAuth(props)
    const res = await fetch.post({
        url: `${api}/profile/update`,
        data: {...props.data, auth_token: props.auth_token}
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.profile
}

export interface VerifyTwitterProps {
    auth_token: string
    twitter_handle: string,
    tweet_url: string
}

export async function verifyTwitter(props: VerifyTwitterProps) {
    const res = await fetch.post(
        {
            url: `${api}/profile/submit_twitter_proof`,
            data: props
        }
    )

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data
}

export interface CreatePointProps {
    name: string,
    title: string,
    auth_token: string,
    sym: string
    content?: string,
    token_id?: number,
    metadata?: string,
    point_type?: string,
    image_url: string,
    max_supply?: number,
    group_id?: number,
}

export interface Point {
    content: string
    created_at: string
    domain: string
    group: null | Group,
    id: number
    image_url: string
    max_supply: number | null
    metadata: null | string
    name: string
    point_type: null | string
    sender: ProfileSimple
    title: string
    token_id: string
    sym: string
    total_supply: number | null
    point_items?: PointItem[],

}

export async function createPoint(props: CreatePointProps) {
    const res = await fetch.post({
        url: `${api}/point/create`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.point
}

export interface SendPointProps {
    auth_token: string,
    receivers: { receiver: string, value: number }[],
    point_id: number,
    value: number
}

export interface PointItem {
    created_at: string
    id: number
    owner: ProfileSimple
    point: Point
    sender: ProfileSimple
    status: 'sending' | 'accepted' | 'rejected'
    value: number
}

export async function sendPoint(props: SendPointProps) {
    const res = await fetch.post({
        url: `${api}/point/send`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.point_items as PointItem[]
}

interface QueryPointProps {
    sender_id?: number,
    group_id?: number,
}

export async function queryPoint(props: QueryPointProps) {
    const res = await fetch.get({
        url: `${api}/point/list`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }
    return res.data.points as Point[]
}

interface QueryPointItemProps {
    status?: 'sending' | 'accepted' | 'rejected',
    point_id?: number
    sender_id?: number,
    owner_id?: number,
}

export async function queryPointItems(props: QueryPointItemProps) {
    const res = await fetch.get({
        url: `${api}/point/list_item`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }
    return res.data.point_items as PointItem[]
}

interface QueryPointDetail {
    id: number
}

export async function queryPointDetail(props: QueryPointDetail) {
    const res = await fetch.get({
        url: `${api}/point/get`,
        data: {
            ...props,
            // with_point_items: 1
        }
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.point as Point
}

export async function queryPointItemDetail(props: QueryPointDetail) {
    const res = await fetch.get({
        url: `${api}/point/get_item`,
        data: {
            ...props,
        }
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message)
    }

    return res.data.point_item as PointItem
}

export interface AcceptPointProp {
    point_item_id: number
    auth_token: string
}

export async function acceptPoint (props: AcceptPointProp) {
    checkAuth(props)

    const res: any = await fetch.post({
        url: `${api}/point/accept`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message || 'Accept fail')
    }

    return res.data.point_item as PointItem
}

export async function rejectPoint (props: AcceptPointProp) {
    checkAuth(props)

    const res: any = await fetch.post({
        url: `${api}/point/reject`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message || 'Reject fail')
    }

    return res.data.point_item as PointItem
}

export interface CheckInProps {
    badgelet_id: number
    auth_token: string
}

export interface CheckInSimple {
    id: number,
    badgelet_id: number,
    profile_id: number,
    created_at: string,
    memo: null | string
}

export async function checkIn (props: CheckInProps): Promise<CheckInSimple> {
    checkAuth(props)

    const res: any = await fetch.post({
        url: `${api}/badgelet/checkin`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message || 'Check in fail')
    }

    return res.data.checkin as CheckInSimple
}

export interface QueryCheckInListProps {
    profile_id?: number,
    badgelet_id?:number,
    badge_id?:number
}

export interface CheckIn {
    id: number,
    badgelet: Badgelet,
    badge: Badge,
    created_at: string,
    memo: null | string,
    profile: ProfileSimple
}

export async function queryCheckInList (props: QueryCheckInListProps): Promise<CheckIn[]> {
    const res: any = await fetch.get({
        url: `${api}/badgelet/checkin_list`,
        data: props
    })

    if (res.data.result === 'error') {
        throw new Error(res.data.message || 'Check in fail')
    }

    return res.data.checkins.sort((a: any, b: any) => {
        return b.id - a.id
    }) as CheckIn[]
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
    freezeGroup,
    queryGroupsUserCreated,
    queryGroupsUserJoined,
    updateProfile,
    verifyTwitter,
    sendPoint,
    queryPointDetail,
    queryPointItemDetail,
    queryPointItems,
    rejectPoint,
    acceptPoint,
    queryNftPasslet,
    queryNftpass,
    queryNftPassDetail,
    queryPrivacyBadgelet,
    queryPrivateBadge,
    checkIn,
    queryCheckInList
}
