import request from '@/plugin/axios'

/**
 * @description [ sys ] 登陆注销相关
 */
export const sysAccountService = {
    /**
     * 登录
     */
    login (data) {
      return request({
        url: '/login',
        method: 'post',
        data
      })
    },
    /**
     * 初始化用户数据
     */
    init(data){
      return request({
        url:'/v/userList',
        method: 'post',
        data
      })
    }
  }