import layoutHeaderAside from "@/layout/header-aside";

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require("@/common/import." + process.env.NODE_ENV);

/**
 * 在主框架内显示
 */
const frameIn = [{
    path: "/",
    redirect: { name: "index" },
    component: layoutHeaderAside,
    children: [
        // 首页
        {
            path: "index",
            name: "index",
            meta: {
                auth: true
            },
            component: _import("system/index")
        },
        // 设备预约start
        {
            path: "bookingSystem",
            name: "bookingSystem",
            meta: {
                title: "设备预约",
                auth: true
            },
            component: _import("BookingSystem/bookingSystem"),
        },
        {
            path: "bookingInfo",
            name: "bookingInfo",
            meta: {
                title: "预约信息",
                auth: true
            },
            component: _import("BookingSystem/bookingInfo")
        },
        {
            path: "bookingRecord",
            name: "bookingRecord",
            meta: {
                title: "预约记录",
                auth: true
            },
            component: _import("BookingSystem/bookingRecord")
        },
        {
            path: "bookingexamine",
            name: "bookingexamine",
            meta: {
                title: "审核",
                auth: true
            },
            component: _import("BookingSystem/bookingExamine")
        },
        // 设备预约end
        // 设备信息start
        {
            path: "equipmentInfo",
            name: "equipmentInfo",
            meta: {
                title: "设备信息",
                auth: true
            },
            component: _import("EquipmentInfo/equipmentInfo")
        },
        {
            path: "useRecord",
            name: "useRecord",
            meta: {
                title: "使用记录",
                auth: true
            },
            component: _import("EquipmentInfo/useRecord")
        },
        {
            path: "equipmentRepaire",
            name: "equipmentRepaire",
            meta: {
                title: "设备报修",
                auth: true
            },
            component: _import("EquipmentInfo/equipmentRepaire")
        },
        {
            path: "dataStatistics",
            name: "dataStatistics",
            meta: {
                title: "数据统计",
                auth: true
            },
            component: _import("EquipmentInfo/dataStatistics")
        },
        // 设备信息end
        // 申诉中心start
        {
            path: "launchAppeal",
            name: "launchAppeal",
            meta: {
                title: "发起申诉",
                auth: true
            },
            component: _import("AppealCenter/launchAppeal")
        },
        {
            path: "appealRecord",
            name: "appealRecord",
            meta: {
                title: "申诉记录",
                auth: true
            },
            component: _import("AppealCenter/appealRecord")
        },
        // 申诉中心end
        // 个人中心start
        {
            path: 'pensonalInfo',
            name: 'pensonalInfo',
            meta: {
                title: "个人信息",
                auth: true
            },
            component: _import("PersonalCenter/pensonalInfo")
        },
        {
            path: 'pensonalRecord',
            name: 'pensonalRecord',
            meta: {
                title: "借还记录",
                auth: true
            },
            component: _import("PersonalCenter/pensonalRecord")
        },
        // 个人中心end
        // 统计分析start
        // 统计分析end
        //管理后台的路由start
        {
            path: "admin",
            name: "admin",
            meta: {
                title: "首页",
                auth: true
            },
            component: _import("admin/index")
        },
        {
            path: "admin/users",
            name: "users",
            meta: {
                title: "用户管理",
                auth: true
            },
            component: _import("admin/Rights/users")
        },
        {
            path: "/admin/equipmentAdmin",
            name: "equipmentAdmin",
            meta: {
                title: "设备管理",
                auth: true
            },
            component: _import("admin/Equipment/equipmentAdmin")
        },
        {
            path: "/admin/Authority",
            name: "Authority",
            meta: {
                title: "权限管理",
                auth: true
            },
            component: _import("admin/Rights/Authority")
        },

        {
            path: "/admin/personnel",
            name: "personnel",
            meta: {
                title: "角色管理",
                auth: true
            },
            component: _import("admin/Rights/personnel")
        },
        {
            path: "admin/SystemMenu",
            name: "SystemMenu",
            meta: {
                title: "菜单管理",
                auth: true
            },
            component: _import("admin/System/SystemMenu")
        },
        {
            path: 'admin/department',
            name: 'department',
            meta: {
                title: "部门管理",
                auth: true
            },
            component: _import("admin/Rights/department")
        },
        //管理后台的路由end
        // 系统 前端日志
        {
            path: "log",
            name: "log",
            meta: {
                title: "前端日志",
                auth: true
            },
            component: _import("system/log")
        },
        // 刷新页面 必须保留
        {
            path: "refresh",
            name: "refresh",
            hidden: true,
            component: _import("system/function/refresh")
        },
        // 页面重定向 必须保留
        {
            path: "redirect/:route*",
            name: "redirect",
            hidden: true,
            component: _import("system/function/redirect")
        }
    ]
}];

/**
 * 在主框架之外显示
 */
const frameOut = [
    // 登录
    {
        path: "/login",
        name: "login",
        component: _import("system/login")
    },
    // 统计分析start
    {
        path: "/overview",
        name: "overview",
        meta: {
            title: "大屏数据",
            auth: true
        },
        component: _import("Statistics/Statistics-Overview")
    }
    // 统计分析end
];

/**
 * 错误页面
 */
const errorPage = [{
    path: "*",
    name: "404",
    component: _import("system/error/404")
}];

// 导出需要显示菜单的
export const frameInRoutes = frameIn;

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage];