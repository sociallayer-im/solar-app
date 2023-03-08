import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const Home = lazy(() => import('../pages/Home'))
const Profile = lazy(() => import('../pages/Profile/Profile'))
const Login = lazy(() => import('../pages/Login'))
const Regist = lazy(() => import('../pages/Regist'))
const Error = lazy(() => import('../pages/Error'))

function AppRouter () {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/profile/:username" element={<Profile />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/regist" element={<Regist />}></Route>
                <Route path="*" element={<Error />}></Route>
            </Routes>
        </Suspense>
    )
}

export default AppRouter
