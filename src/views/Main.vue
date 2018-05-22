<style lang="less">
	@import "./main.less";
</style>
<template>
	<div class="main" :class="{'main-hide-text': shrink}">
		<div class="sidebar-menu-con" :style="{width: shrink?'60px':'180px', overflow: shrink ? 'visible' : 'auto'}">
			<shrinkable-menu :shrink="shrink" @on-change="handleSubmenuChange" :theme="menuTheme" :before-push="beforePush" :open-names="openedSubmenuArr" :menu-list="menuList">
				<div slot="top" class="logo-con">
					<img v-show="!shrink" src="../images/logo.png" key="max-logo" />
					<img v-show="shrink" src="../images/logo-min.png" key="min-logo" />
				</div>
			</shrinkable-menu>
		</div>
		<div class="main-header-con" :style="{paddingLeft: shrink?'60px':'180px'}">
			<div class="main-header">
				<div class="navicon-con">
					<Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
				</div>
				<div class="header-middle-con">
					<div class="main-breadcrumb">
						<breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
					</div>
				</div>

				<div class="header-avator-con">
					<div class="often-link-pull" @mouseover="pullDownTrue" @mouseout="pullDownFalse">
						<span class="often-link">项目列表</span>
						<transition name="fade" v-if="pullDownBool">
							<div class="pull-down">
								<ul v-for="item in projectData">
									<li @click="projectChange(item.id, item.base_url)">{{item.name}}</li>
								</ul>
							</div>
						</transition>
					</div>
					<full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
					<message-tip v-model="mesCount"></message-tip>
					<!--<theme-switch></theme-switch>-->

					<div class="user-dropdown-menu-con">
						<Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
							<Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
								<a href="javascript:void(0)">
									<span class="main-user-name">{{ userName }}</span>
									<Icon type="arrow-down-b"></Icon>
								</a>
								<DropdownMenu slot="list">
									<DropdownItem name="ownSpace">个人中心</DropdownItem>
									<DropdownItem name="loginout" divided>退出登录</DropdownItem>
								</DropdownMenu>
							</Dropdown>
							<Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
						</Row>
					</div>
				</div>
			</div>
			<div class="tags-con">
				<tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
			</div>
		</div>
		<div class="single-page-con" :style="{left: shrink?'60px':'180px'}">
			<div class="single-page">
				<keep-alive :include="cachePage">
					<router-view></router-view>
				</keep-alive>
			</div>
			<Footer class="layout-footer-center"><strong>Copyright &copy; {{year}}<a href="javascript:;">华新博源</a>.</strong> All rights reserved.</Footer>
		</div>
	</div>
</template>
<script>
	import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
	import tagsPageOpened from './main-components/tags-page-opened.vue';
	import breadcrumbNav from './main-components/breadcrumb-nav.vue';
	import fullScreen from './main-components/fullscreen.vue';
	import messageTip from './main-components/message-tip.vue';
	import themeSwitch from './main-components/theme-switch/theme-switch.vue';
	import Cookies from 'js-cookie';
	import util from '@/libs/util.js';

	export default {
		components: {
			shrinkableMenu,
			tagsPageOpened,
			breadcrumbNav,
			fullScreen,
			messageTip,
			themeSwitch
		},
		data() {
			return {
				shrink: false,
				userName: '',
				isFullScreen: false,
				openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
				year: new Date().getFullYear(),
				pullDownBool: false,
				projectData: [],
				judgementBool: false,
				num: 0,
			};
		},
		computed: {
			menuList() {
				return this.$store.state.app.menuList;
			},
			pageTagsList() {
				return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
			},
			currentPath() {
				return this.$store.state.app.currentPath; // 当前面包屑数组
			},
			avatorPath() {
				return localStorage.avatorImgPath;
			},
			cachePage() {
				return this.$store.state.app.cachePage;
			},
			lang() {
				return this.$store.state.app.lang;
			},
			menuTheme() {
				return this.$store.state.app.menuTheme;
			},
			mesCount() {
				return this.$store.state.app.messageCount;
			}
		},
		methods: {
			init() {
				const copy = this;
				//获取项目信息
				this.$http.get(Api.url + 'sems/projects/getUserProjectsPrv', {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(response => {
						//console.log(response.data.data);
						copy.projectData = response.data.data;

					})
					.catch(error => {
						console.log(error);
					})
				//获取告警通知
				this.$http.get(Api.url + 'pdms/notice/getNoticeAsProject/' + Api.pdId, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(response => {
						copy.num = response.data.data.length;
						let messageCount = copy.num;
						copy.messageCount = messageCount.toString();
						copy.$store.commit('setMessageCount', copy.num);
					})
					.catch(error => {
						console.log(error);
					});
				let pathArr = util.setCurrentPath(this, this.$route.name);
				this.$store.commit('updateMenulist');
				if(pathArr.length >= 2) {
					this.$store.commit('addOpenSubmenu', pathArr[1].name);
				}
				this.userName = Cookies.get('user');
				this.checkTag(this.$route.name);
			},
			toggleClick() {
				this.shrink = !this.shrink;
			},
			handleClickUserDropdown(name) {
				if(name === 'ownSpace') {
					util.openNewPage(this, 'ownspace_index');
					this.$router.push({
						name: 'ownspace_index'
					});
				} else if(name === 'loginout') {
					// 退出登录
					this.$store.commit('logout', this);
					this.$store.commit('clearOpenedSubmenu');
					this.$store.commit('clearAllTags');
					this.$router.push({
						name: 'login'
					});
				}
			},
			checkTag(name) {
				let openpageHasTag = this.pageTagsList.some(item => {
					if(item.name === name) {
						return true;
					}
				});
				if(!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
					util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
				}
			},
			handleSubmenuChange(val) {
				// console.log(val)
			},
			beforePush(name) {
				// if (name === 'accesstest_index') {
				//     return false;
				// } else {
				//     return true;
				// }
				return true;
			},
			fullscreenChange(isFullScreen) {
				// console.log(isFullScreen);
			},
			pullDownTrue() {
				this.pullDownBool = true;
			},
			pullDownFalse() {
				this.pullDownBool = false;
			},
			projectChange(projectId, url) {
				//console.log(url);
				//判断要跳转的页面是否是当前页面
				if(url == localStorage.currentPageName) {

				} else {
					this.$store.commit('clearAllTags');
					Cookies.set('access', projectId);
//					//路由跳转
					this.$router.push({
						name: "home_index"
					});
					
					localStorage.setItem('currentPageName', url);
					
					this.$store.commit('updateMenulist');
					this.$store.state.app.projectId=projectId;
				}
			},
		},
		watch: {
			'$route' (to) {
				this.$store.commit('setCurrentPageName', to.name);
				let pathArr = util.setCurrentPath(this, to.name);
				if(pathArr.length > 2) {
					this.$store.commit('addOpenSubmenu', pathArr[1].name);
				}
				this.checkTag(to.name);
				localStorage.currentPageName = to.name;
			},
			lang() {
				util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
			}
		},
		mounted() {
			this.init();
			var copy = this;
			if(Cookies.get("access") == 2) {
				setInterval(function() {
					copy.$http.get(Api.url + 'pdms/notice/getNoReadNoticeCountAsProject/' + Api.pdId, {
							headers: {
								Authorization: "Bearer " + localStorage.getItem("access_token")
							},
						})
						.then(response => {
							if(response.data.data != 0) {
								copy.$Notice.warning({
									title: '警告',
									desc: '您收到' + response.data.data + '条告警通知！',
									duration:10
								});
							}

						})
						.catch(error => {
							console.log(error);
						});
				}, 20000)
			}
		},
		created() {
			// 显示打开的页面的列表
			this.$store.commit('setOpenedList');
		}
	};
</script>