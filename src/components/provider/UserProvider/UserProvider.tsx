import {ReactNode, useContext, useEffect, useState} from 'react'
import {useAccount, useDisconnect, useSigner} from 'wagmi'
import UserContext from './UserContext'
import DialogsContext from '../DialogProvider/DialogsContext'
import * as AuthStorage from '../../../utils/authStorage'
import solas from '../../../service/solas'
import { useNavigate } from 'react-router-dom'
import useEvent, {EVENT} from '../../../hooks/globalEvent'

import solaExtensionLogin from '../../../service/ExtensionLogin'

export interface User {
    id: number | null,
    userName: string | null,
    avatar: string | null,
    domain: string | null,
    email: string | null,
    wallet: string | null,
    twitter: string | null,
    authToken: string | null,
}

export interface UserContext {
    user: User
    setUser: (data: Partial<Record<keyof User, any>>) => any
    logOut: () => any
}

export interface UserProviderProps {
    children: ReactNode
}

const emptyUser: User = {
    id: 0,
    userName: null,
    avatar: null,
    domain: null,
    email: null,
    wallet: null,
    twitter: null,
    authToken: null
}

function UserProvider (props: UserProviderProps) {
    const [userInfo, setUserInfo] = useState<User>(emptyUser)
    const { address, isConnecting, isDisconnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { data } = useSigner()
    const { showToast, clean } = useContext(DialogsContext)
    const navigate = useNavigate()
    const [newProfile, _] = useEvent(EVENT.profileUpdate)

    const setUser = (data: Partial<Record<keyof User, any>>) => {
        const copyUserInfo = { ...userInfo , ...data }
        setUserInfo(copyUserInfo)
    }


    const setProfile = async (props: { authToken: string, address?: string | undefined, email?: string | undefined }) => {
        try {
            const profileInfo = await solas.getProfile(props)
            console.log('Profile: ', profileInfo)
            setUser({
                wallet: profileInfo?.address,
                id: profileInfo?.id! || null,
                twitter: profileInfo?.twitter || null,
                domain: profileInfo?.domain || null,
                userName: profileInfo?.domain ? profileInfo?.domain.split('.')[0]: null,
                email:  profileInfo?.email || null,
                avatar: profileInfo?.image_url || null,
                authToken: props.authToken
            })

            if (!profileInfo || !profileInfo.domain) {
                window.localStorage.setItem('fallback', window.location.href)
                navigate('/regist')
                return
            }

            // if (window.location.pathname === '/') {
            //     navigate(`/profile/${profileInfo.username}`)
            // }

            // Float Extension Login
            solaExtensionLogin.login(profileInfo.id.toString(), profileInfo.domain,props.authToken, profileInfo.image_url || '')
        } catch (e: any) {
            console.log('[setProfile]: ', e)
            showToast('Login fail', 3000)
            logOut()
        }
    }

    const logOut = () => {
        disconnect()

        if (userInfo.wallet) {
            AuthStorage.burnAuth(userInfo.wallet)
        }

        if (userInfo.email) {
            AuthStorage.burnAuth(userInfo.email)
        }

        AuthStorage.setLastLoginType(null)

        setUserInfo(emptyUser)
    }

    const emailLogin = async () => {
        const loginType = AuthStorage.getLastLoginType()
        if (!loginType) return
        if (loginType !== 'email') return

        console.log('Login ...')
        console.log('Login type: ', loginType)

        const emailAuthInfo = AuthStorage.getEmailAuth()
        if (!emailAuthInfo) return

        const authToken = emailAuthInfo.authToken
        const email = emailAuthInfo.email
        console.log('Login email: ', email)
        console.log('Storage token: ', authToken)
        await setProfile({ email, authToken })
    }

    const walletLogin = async () => {
        const loginType = AuthStorage.getLastLoginType()
        if (!loginType) return
        if (loginType !== 'wallet') return

        if (!address) {
            logOut()
            return
        }

        if (!data) return

        console.log('Login ...')
        console.log('Login type: ', loginType)
        console.log('Login wallet: ', address)

        let authToken = AuthStorage.getAuth(address)
        if (!authToken) {
            try {
                authToken = await solas.login(data)
                console.log('New token: ', authToken)
            } catch (e) {
                console.log(e)
                showToast('Login fail', 3000)
                logOut()
                return
            }
        }

        console.log('Storage token: ', authToken)

        await setProfile({ address: address, authToken: authToken })
    }

    useEffect(() => {
        emailLogin()
        return () => {}
    }, [])

    useEffect(() => {
        walletLogin()
    }, [data, address])

    // update avatar
    useEffect(() => {
        if (newProfile && newProfile.id === userInfo.id) {
            setUser({...userInfo, avatar: newProfile.image_url })
        }
    }, [newProfile])

    return (
        <UserContext.Provider value={{ user: userInfo, setUser, logOut, emailLogin, walletLogin}}>
            { props.children }
        </UserContext.Provider>
    )
}

export default UserProvider
