const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: ()=>import('@/components/HelloWorld.vue')
    }, {
        path: '/login',
        name: 'Login',
        component: ()=>import('@/components/LoginAndRegister/Login.vue')
    }
]
export default routes