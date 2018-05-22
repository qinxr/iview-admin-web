<style lang="less">
	@import './login.less';
</style>

<template>
	<div class="login" @keydown.enter="handleSubmit">
		<div class="login-con">
			<Card :bordered="false">
				<p slot="title">
					<Icon type="log-in"></Icon>
					欢迎登录
				</p>
				<div class="form-con">
					<Form ref="loginForm" :model="form" :rules="rules">
						<FormItem prop="userName">
							<Input v-model="form.email" placeholder="请输入用户名">
							<span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
							</Input>
						</FormItem>
						<FormItem prop="password">
							<Input type="password" v-model="form.password" placeholder="请输入密码">
							<span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
							</Input>
						</FormItem>
						<FormItem>
							<Button @click="handleSubmit" type="primary" long>登录</Button>
						</FormItem>
					</Form>
					<p class="login-tip">请输入正确的用户名和密码</p>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
	import Cookies from 'js-cookie';
	import axios from 'axios';
	export default {
		data() {
			return {
				form: {
					loading: '',
					email: '',
					password: '',
				},
				screen: window.screen.width,
				rules: {
					username: [{
						required: true,
						message: '账号不能为空',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}]
				}
			};
		},
		mounted() {

			window.onresize = () => {
				return(() => {
					this.screen = window.screen.width
				})()
			}

		},
		watch: {
			screen: {
				handler() {
					if(window.screen.width < 1050) {
						this.$Modal.warning({
							title: '警告',
							content: '请使用PC端设备查看！',
						});
					}else{
						this.$Modal.remove()
					}
				},
				deep: true
			}
		},
		methods: {
			handleSubmit() {
				var copy = this;
				console.log(copy.form.email)
				this.$refs.loginForm.validate((valid) => {
					if(valid) {

						axios.post(Api.url + 'userLogin', {
								email: copy.form.email,
								password: copy.form.password,
							})
							.then(function(response) {
								//登陆成功则用户名存在cookies中
								Cookies.set('user', copy.form.email);
								localStorage.setItem("access_token", response.data.data.access_token);
								copy.$store.commit('setAvator', '../../src/images/avator.jpg');
								copy.$store.commit('clearAllTags');
								Cookies.set('flag', response.data.data.userInfos.hxbr_flag);
//								console.log(Cookies.get('flag'))
								if(response.data.head == 200) {
									Cookies.set('projectData', response.data.data.projects);
									copy.$router.push({
										name: 'project-choose'
									});

								}
							})
							.catch(function(error) {
								copy.$Message.error("密码或帐号错误！请重试！");
							})

					}
				});
			}
		}
	};
</script>

<style>

</style>