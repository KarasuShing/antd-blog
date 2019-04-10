export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    authority: ['admin', 'user', 'guest'],
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/index'},
      {
        path: '/index',
        name: 'artiles',
        icon: 'ordered-list',
        component: './Articles/List'
      },
      //  editor
      {
        name: 'edit',
        icon: 'highlight',
        path: '/edit',
        component: './Edit/Index'
      },
      {
        path: '/articles/:id',
        component: './Articles/Content',
        hideInMenu:true
      },
      {
        component: '404',
      },
    ],
  }
];
