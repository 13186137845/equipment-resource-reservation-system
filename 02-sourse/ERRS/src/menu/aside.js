export default [
    { path: '/index', title: '首页', icon: 'home' },
    {
        title: '设备预约',
        icon: 'calendar-minus-o',
        children: [
            { path: '/bookingSystem', title: '设备预约' },
            { path: '/bookingInfo', title: '预约信息' },
            { path: '/bookingRecord', title: '预约记录' },
            { path: '/bookingexamine',title:'审核'}
        ]
    },
    {
        title: '设备信息',
        icon: 'calendar-minus-o',
        children: [
            { path: '/equipmentInfo', title: '设备信息' },
            { path: '/useRecord', title: '使用记录' },
            { path: '/equipmentRepaire', title: '设备报修' },
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
            {path:'pensonalInfo',title:'个人信息'},
            { path: '#', title: '我的日志' },
            { path: '#', title: '我的事件' },
            { path: '#', title: '我的文章' }
        ]
    },
    {
        title: '反馈中心',
        icon: 'calendar-minus-o',
        children: [
            { path: 'feedBack', title: '反馈信息' }
        ]
    },
    {
        title: '权限管理',
        icon: 'calendar-minus-o',
        children: [
            { path: '/admin/users', title: '用户管理' },
            { path: '/admin/Authority', title: '权限管理' },
            { path: '/admin/personnel', title: '角色管理' },
            { path:'/admin/department',title:'部门管理'}
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
        title: '系统设置',
        icon: 'calendar-minus-o',
        children: [
            { path: '/admin/SystemMenu', title: '菜单管理' }
        ]
    },
    {
        title: '统计分析',
        icon: 'calendar-minus-o',
        children: [
        ]
    }
]