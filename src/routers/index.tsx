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
import CreatePoint from "../pages/CreatePoint";
import IssuePoint from "../pages/IssuePoint";
import CreateNftPass from "../pages/CreateNftPass";
import IssueNftPass from "../pages/IssueNftPass";
import CreatePrivacy from "../pages/CreatePrivacy";
import CreateGift from "../pages/CreateGift";
import IssueGift from "../pages/IssueGift";


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
                <Route path="/" element={<Home />} />
                <Route path="/profile/:username" element={<Profile />}/>
                <Route path="/profile-edit/:username" element={<ProfileEdit />} />
                <Route path="/group/:groupname" element={<Group />} />
                <Route path="/group-edit/:groupname" element={<GroupEdit />} />
                <Route path="/login" element={<Login />} />
                <Route path="/regist" element={<Regist />} />

                <Route path="/create-group" element={<RegistGroup />} />
                <Route path="/create-badge" element={<CreateBadge />} />
                <Route path="/create-point" element={<CreatePoint />} />
                <Route path="/create-nftpass" element={<CreateNftPass />} />
                <Route path="/create-private" element={<CreatePrivacy />} />
                <Route path="/create-gift" element={<CreateGift />} />

                <Route path="/issue-badge/:badgeId" element={<IssueBadge />} />
                <Route path="/issue-point/:pointId" element={<IssuePoint />} />
                <Route path="/issue-nftpass/:nftpassId" element={<IssueNftPass />} />
                <Route path="/invite-create/:groupId" element={<Invite />} />
                <Route path="/issue-gift/:giftId" element={<IssueGift />} />

                <Route path="/issue-success" element={<IssueSuccess />} />

                <Route path="/badgelet/:badgeletId" element={<Home />} />
                <Route path="/presend/:presendId" element={<Home />} />
                <Route path="/invite/:groupId/:inviteId" element={<Home />} />
                <Route path="/nftpasslet/:nftpassletId" element={<Home />} />
                <Route path="/nftpass/:nftpassId" element={<Home />} />
                <Route path="/point/:pointId" element={<Home />} />
                <Route path="/pointItem/:pointItemId" element={<Home />} />
                <Route path="/gift/:giftId" element={<Home />} />

                <Route path="/search/:keyword" element={<Search />} />
                <Route path="/event/:tag" element={<Event />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Suspense>
    )
}

export default AppRouter
