import request from '@/plugin/axios'

/**
 * @description [ sys ] 登陆注销相关
 */
export const sysAccountService = {
    /**
     * 登录
     */
    login(data) {
        return request({
            url: '/login',
            method: 'post',
            data
        })
    }
}

/**
 * @description [ sys ] 系统信息
 */
export const sysInfoService = {
    /**
     * 获取系统信息
     */
    get() {
        return request({
            url: '/sys/info'
        })
    }
}

/**
 * @description [ sys ] 菜单和路由相关
 */
export const sysMenuService = {
    /**
     * 获取菜单
     */
    getNav() {
        return request({
            url: '/sys/menu/nav'
        })
    },
    /**
     * 获取权限
     */
    getPermissions() {
        return request({
            url: '/sys/menu/permissions'
        })
    }
}

/**
 * @description [ admin ] 管理员后台管理相关
 */
export const adminUserService = {

        //获取系统用户信息
        getInfo() {
            return request({
                url: 'adminApi/v/userList',
                method: 'post'
            })
        },
        //添加用户信息
        addUser(data) {
            return request({
                url: 'adminApi/i/insUser',
                method: 'put',
                data
            })
        },
        //获取添加用户信息下拉列表框信息
        getAddUserMenu() {
            return request({
                url: 'adminApi/v/userInsView',
                method: 'get'
            })
        },
        //修改用户信息
        updateUser(data) {
            return request({
                url: 'adminApi/u/updUser',
                method: 'post',
                data
            })
        },
        //修改用户密码
        updatePassword(data) {
            return request({
                url: '',
                method: '',
                data
            })
        },

    }
    /**
     * @description [ Equipment ] 设备信息管理相关
     */
export const EquipmentService = {

    //获取系统设备列表信息
    getEquipmentInfo(data) {
        return request({
            url: '/adminApi/v/equipmentList',
            method: 'post',
            data
        })
    },
    //添加设备信息
    addEquipment(data) {
        return request({
            url: '/adminApi/i/insEquipment',
            method: 'put',
            data
        })
    },
    //获取添加用户信息下拉列表框信息
    getEquipment() {
        return request({
            url: '/adminApi/v/equipmentView',
            method: 'get'
        })
    },
    //修改设备信息
    upEquipment(data) {
        return request({
            url: 'adminApi/u/updEquipment',
            method: 'post',
            data
        })
    }


}