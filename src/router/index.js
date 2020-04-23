import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import Home from "../components/Home";
import ElementUI from 'element-ui';

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
        component: Home
    }
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
