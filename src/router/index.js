import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import Welcome from "../components/Welcome";
import Home from "../components/Home";
import Users from "../components/users/Users";
import ElementUI from 'element-ui';
import Categories from  '../components/goods/Categories';
import Goods from '../components/goods/Goods';
import Params from '../components/goods/Params';
import Orders from '../components/orders/Orders';
import Reports from  '../components/reports/Reports';
import Rights from '../components/rights/Rights';
import Roles from '../components/rights/Roles';


Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [
    {
        path: '/',
        redirect: '/Login'
    },
    {
        path: '/Login',
        component: Login
    },
    {
        path: '/Home',
        component: Home,
        redirect:'/Welcome',
        children: [
            {path: '/Welcome', component: Welcome},
            {path: '/users', component: Users},
            {path: '/categories', component: Categories},
            {path: '/goods', component: Goods},
            {path: '/params', component: Params},
            {path: '/orders', component: Orders},
            {path: '/reports', component: Reports},
            {path: '/rights', component: Rights},
            {path: '/roles', component: Roles}
        ]

    },
]

const router = new VueRouter({
    routes
})
//拦截路由守卫
router.beforeEach((to, from, next) => {
    //to表示将要访问的路径
    //from代表从哪个路径跳转而来
    //next表示一个函数 放行
    if (to.path === '/Login') return next();    //如果访问的是登陆页面就放行
    const tokenStr = window.sessionStorage.getItem('token');//获取token
    if (!tokenStr) {
        ElementUI.Message.error('请先登录')
        return next('/Login');
    } //如果token不存在就证明没有登陆过，强制跳转到登陆页面
    next();                               //存在则放行
})
export default router
