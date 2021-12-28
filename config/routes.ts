export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },

  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/manage',
    name: '管理用户',
    icon: 'UserSwitchOutlined',
    access: 'canCreateUser',
    routes: [
      {
        path: '/manage/user-list',
        name: '管理员列表',
        component: './Manage',
      },
      {
        path: '/manage/create-user',
        name: '创建管理员',
        component: './Manage/Create',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: 'user-info',
    icon: 'UserOutlined',
    name: '个人信息',
    component: './UserInfo',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
