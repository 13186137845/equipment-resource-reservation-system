import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/LoginAndRegister/Login'], resolve)

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }]
})

