<style lang="less">
	@import './projectChoose.less';
</style>

<template>
	<div class="project" @keydown.enter="handleSubmit">
		<div class="project-con">
			<Card :bordered="false">
				<p slot="title">
					<Icon type="log-in"></Icon>
					欢迎登录NACO-Logic智慧能源管理系统
				</p>
				<div class="form-con">
					<p class="project-tip">请选择要查看的项目</p>
					<Row class='project-top' v-for='item in data' :key='item.id' >
						<router-link to="/home" class="user-add">
						<Tag class="project-list" color="rgb(142, 191, 76)" @click.native="setProject(item.id)">{{item.name}}</Tag>
						</router-link>
					</Row>
					<p class="project-foot">
						<img src="../../images/HXBR_Logo_5.png" />
					</p>
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
				data: ''

			};
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				var copy = this;
				var a = JSON.parse(Cookies.get('projectData'));
				this.data = JSON.parse(Cookies.get('projectData'));
				console.log(this.data)

			},
			setProject(id) {
				Cookies.set('access', id);
			}
		}
	};
</script>

<style>

</style>