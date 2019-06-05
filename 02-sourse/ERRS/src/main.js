// Vue
import Vue from 'vue'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'
// 多国语
import i18n from './i18n'
// import search from 'vue-search'

// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import {sysMenuService} from '@/common/api'
import {frameInRoutes} from '@/router/routes'
//各类插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueQriously from 'vue-qriously'//二维码插件
import VCharts from 'v-charts'//统计图
import VueQArt from 'vue-qart'//二维码插件
import FullCalendar from 'vue-fullcalendar'//日历
import pluginExport from '@d2-projects/vue-table-export'//导出
import Print from 'vue-print-nb'//打印

// 核心插件
Vue.use(d2Admin)
Vue.use(ElementUI)
// Vue.use(search)
Vue.use(VCharts)
Vue.use(VueQriously)
Vue.use(FullCalendar)
Vue.use(pluginExport)
Vue.use(Print);

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
    created() {
        // 处理路由 得到每一级的路由设置
        this.$store.commit('d2admin/page/init', frameInRoutes)
        // 设置顶栏菜单
        this.$store.commit('d2admin/menu/headerSet', menuHeader)
        // 设置侧边栏菜单
        // this.$store.commit('d2admin/menu/asideSet', menuAside)
        // 初始化菜单搜索功能
        this.$store.commit('d2admin/search/init', menuHeader)
    },
    components: {
        // search,
        VueQArt
    },
    mounted() {
        // 展示系统信息
        this.$store.commit('d2admin/releases/versionShow')
        // 用户登录后从数据库加载一系列的设置
        this.$store.dispatch('d2admin/account/load')
        // 获取并记录用户 UA
        this.$store.commit('d2admin/ua/get')
        // 初始化全屏监听
        this.$store.dispatch('d2admin/fullscreen/listen')
        sysMenuService.getNav().then(res => {
            // console.log(res)
            let defmenu = {
                path: '/index',
                title: '首页',
                icon: 'home'
            }
            res.MU_POWER.unshift(defmenu)
            this.$store.commit('d2admin/menu/asideSet', res.MU_POWER)
        }).catch(err => {
            this.$message.error("菜单初始化失败");
        })
    }
}).$mount('#app')