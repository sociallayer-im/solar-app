import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const Home = lazy(() => import('../pages/Home'))
const Profile = lazy(() => import('../pages/Profile/Profile'))
const Group = lazy(() => import('../pages/Group/Group'))
const Login = lazy(() => import('../pages/Login'))
const Regist = lazy(() => import('../pages/Regist'))
const RegistGroup = lazy(() => import('../pages/RegistGroup'))
const CreateBadge = lazy(() => import('../pages/CreateBadge'))
const Issue = lazy(() => import('../pages/Issue'))
const Invite = lazy(() => import('../pages/Invite'))
const IssueSuccess = lazy(() => import('../pages/IssueSuccess'))
const Error = lazy(() => import('../pages/Error'))

function AppRouter () {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/profile/:username" element={<Profile />}></Route>
                <Route path="/group/:groupname" element={<Group />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/regist" element={<Regist />}></Route>
                <Route path="/create-group" element={<RegistGroup />}></Route>
                <Route path="/badge-create" element={<CreateBadge />}></Route>
                <Route path="/issue/:badgeId" element={<Issue />}></Route>
                <Route path="/invite-create/:groupId" element={<Invite />}></Route>
                <Route path="/issue-success" element={<IssueSuccess />}></Route>
                <Route path="/badgelet/:badgeletId" element={<Home />}></Route>
                <Route path="/presend/:presendId" element={<Home />}></Route>
                <Route path="/invite/:groupId/:inviteId" element={<Home />}></Route>
                <Route path="*" element={<Error />}></Route>
            </Routes>
        </Suspense>
    )
}

export default AppRouter
