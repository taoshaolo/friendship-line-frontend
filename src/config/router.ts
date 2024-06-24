import IndexPage from '../pages/IndexPage.vue'

import TeamPage from '../pages/TeamPage.vue'
import TeamAddPage from '../pages/TeamAddPage.vue'
import TeamUpdatePage from '../pages/TeamUpdatePage.vue'
import TeamDetailPage from '../pages/TeamDetailPage.vue'

import UserPage from '../pages/UserPage.vue'
import UserEditPage from '../pages/UserEditPage.vue'
import UserLoginPage from '../pages/UserLoginPage.vue'
import UserRegisterPage from '../pages/UserRegisterPage.vue'
import UserUpdatePage from '../pages/UserUpdatePage.vue'
import UserTeamJoinPage from '../pages/UserTeamJoinPage.vue'
import UserTeamCreatePage from '../pages/UserTeamCreatePage.vue'
import UserChatPage from '../pages/ChatPage.vue'

import SearchPage from '../pages/SearchPage.vue'
import SearchResultPage from '../pages/SearchResultPage.vue';

import MessagePage from '../pages/MessagePage.vue'

const routes = [
    {path: '/', title: '友链', component: IndexPage},

    {path: '/team', title: '队伍', component: TeamPage},
    {path: '/team/add', title: '创建队伍', component: TeamAddPage},
    {path: '/team/update', title: '更新队伍', component: TeamUpdatePage},
    {
        path: '/team/detail',
        title: '队伍信息',
        component: TeamDetailPage
    },

    {path: '/user', title: '个人信息', component: UserPage},
    {path: '/user/edit', title: '编辑信息', component: UserEditPage},
    {path: '/user/list', title: '用户列表', component: SearchResultPage},
    {path: '/user/login', title: '登录', component: UserLoginPage},
    {path: '/user/register', title: '注册', component: UserRegisterPage},
    {path: '/user/update', title: '修改信息', component: UserUpdatePage},
    {path: '/user/team/join', title: '我加入的队伍', component: UserTeamJoinPage},
    {path: '/user/team/create', title: '我创建的队伍', component: UserTeamCreatePage},
    {
        name: 'userChat',
        path: '/user/chat/:toUserId/:receiveType/:status',
        title: '聊天页面',
        meta:{
            noLayout: true, // 不需要使用 BasicLayout 的页面
        },
        component: UserChatPage
    },

    {path: '/search', title: '寻找小伙伴', component: SearchPage},
    {path: '/message', title: '消息', component: MessagePage}
];

export default routes