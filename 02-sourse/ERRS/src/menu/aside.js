export default [
    { path: '/index', title: '首页', icon: 'home' },
    {
        title: '设备预约',
        icon: 'calendar-minus-o',
        children: [
            { path: '/bookingSystem', title: '设备预约' },
            { path: '/bookingInfo', title: '预约信息' },
            { path: '/bookingRecord', title: '预约记录' }
        ]
    },
    {
        title: '设备信息',
        icon: 'calendar-minus-o',
        children: [
            { path: '/equipmentInfo', title: '设备信息' },
            { path: '/useRecord', title: '使用记录' },
            { path: '/equipmentRepaire', title: '设备报修' },
            { path: '/dataStatistics', title: '数据统计' }
        ]
    },
    {
        title: '申诉中心',
        icon: 'calendar-minus-o',
        children: [
            { path: '/launchAppeal', title: '发起申诉' },
            { path: '/appealRecord', title: '申诉记录' }
        ]
    },
    {
        title: '个人中心',
        icon: 'calendar-minus-o',
        children: [
            { path: '#', title: '个人信息' },
            { path: '#', title: '借还记录' },
            { path: '#', title: '我的日志' },
            { path: '#', title: '我的事件' },
            { path: '#', title: '我的文章' }
        ]
    },
    {
        title: '反馈中心',
        icon: 'calendar-minus-o',
        children: [
            { path: '#', title: '反馈信息' }
        ]
    },
    {
        title: '权限管理',
        icon: 'calendar-minus-o',
        children: [
            { path: '/admin/users', title: '用户管理' }
        ]
    },
    {
        title: '设备管理',
        icon: 'calendar-minus-o',
        children: [
            { path: '/admin/equipmentAdmin', title: '设备管理' }
        ]
    },
    {
        title: '统计分析',
        icon: 'calendar-minus-o',
        children: [
            { path: '/overview', title: '总览' }
        ]
    }
]