<template>
	<el-dropdown size="small" class="d2-mr">
		<el-badge is-dot class="item" >
			<span class="btn-text">{{info.name ? `你好 ${info.name}` : '未登录'}}</span>
		</el-badge>
		<el-dropdown-menu slot="dropdown">
      <el-badge :value=messageCount class="item" v-show="hidden">
				<el-dropdown-item @click.native="showMessage">
					 <d2-icon class="el-icon-message" name="message" />消息
				</el-dropdown-item>
			</el-badge>
			<el-dropdown-item @click.native="logOff">
				<d2-icon name="power-off" class="d2-mr-5" /> 注销
			</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { sysAccountService } from '@/common/api'
	export default {
    data(){
      return{
        messageCount:1,
        hidden:true
      }
    },
		computed: {
			...mapState('d2admin/user', [
				'info'
			])
		},
		methods: {
			...mapActions('d2admin/account', [
				'logout'
			]),
			/**
			 * @description 登出
			 */
			logOff() {
				sysAccountService.logout()
					.then(res => {
						this.logout({
							onfirm: true
						})
					}).catch(err => {
						this.$message({
							message: "系统异常,登出失败",
							type: "error"
						});
					})
      },
			showMessage(){
				this.$notify({
			    title: '系统提示',
			    message:'您的设备预约时间到了',
			    duration: 0
        });
        if(this.messageCount>=0){
            this.messageCount = this.messageCount -1
        }else{
            this.hidden = false
        }
			}
		}
	}
</script>
