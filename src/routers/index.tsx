import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'


// package
import RegistGroup from '../pages/RegistGroup'
import Group from '../pages/Group/Group'
import Home from '../pages/Home'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login'
import Regist from '../pages/Regist'
import CreateBadge from '../pages/CreateBadge'
import IssueBadge from '../pages/IssueBadge'
import Invite from '../pages/Invite'
import IssueSuccess from '../pages/IssueBadgeSuccess'
import Search from '../pages/Search'
import ProfileEdit from '../pages/ProfileEdit/ProfileEdit'
import GroupEdit from '../pages/GroupEdit/GroupEdit'
import CreatePoint from "../pages/CreatePoint/CreatePoint";


// lazy load
// const Home = lazy(() => import('../pages/Home'))
// const Profile = lazy(() => import('../pages/Profile/Profile'))
// const Login = lazy(() => import('../pages/Login'))
// const Regist = lazy(() => import('../pages/Regist'))
// const CreateBadge = lazy(() => import('../pages/CreateBadge'))
// const Group = lazy(() => import('../pages/Group/Group'))
// const RegistGroup = lazy(() => import('../pages/RegistGroup'))
// const Search = lazy(() => import('../pages/Search'))
const Event = lazy(() => import('../pages/Event'))
const Error = lazy(() => import('../pages/Error'))
// const Issue = lazy(() => import('../pages/Issue'))
// const Invite = lazy(() => import('../pages/Invite'))
// const IssueSuccess = lazy(() => import('../pages/IssueSuccess'))


function AppRouter () {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/profile/:username" element={<Profile />}></Route>
                <Route path="/profile-edit/:username" element={<ProfileEdit />}></Route>
                <Route path="/group/:groupname" element={<Group />}></Route>
                <Route path="/group-edit/:groupname" element={<GroupEdit />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/regist" element={<Regist />}></Route>
                <Route path="/create-group" element={<RegistGroup />}></Route>
                <Route path="/create-badge" element={<CreateBadge />}></Route>
                <Route path="/create-point" element={<CreatePoint />}></Route>
                <Route path="/issue-badge/:badgeId" element={<IssueBadge />}></Route>
                <Route path="/invite-create/:groupId" element={<Invite />}></Route>
                <Route path="/issue-success" element={<IssueSuccess />}></Route>
                <Route path="/badgelet/:badgeletId" element={<Home />}></Route>
                <Route path="/presend/:presendId" element={<Home />}></Route>
                <Route path="/invite/:groupId/:inviteId" element={<Home />}></Route>
                <Route path="/search/:keyword" element={<Search />}></Route>
                <Route path="/event/:tag" element={<Event />}></Route>
                <Route path="*" element={<Error />}></Route>
            </Routes>
        </Suspense>
    )
}

export default AppRouter
