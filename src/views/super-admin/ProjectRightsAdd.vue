<template>
	<Row>
		<Col :lg='24'>
			<Card>
				<p slot="title">
	                <Icon type="social-buffer"></Icon>
				           项目权限新增
			    </p>
			    <Form 
                    ref="RightsForm"
                    :model="prjRightsForm"
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="用户名称：" prop="userName">
			                    <div >
			                        <Select slot="append" v-model="prjRightsForm.user_id">
							            <Option v-for="item in userForm" :key="item.id" :value="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="项目名称：" prop="projectName">
			                    <div >
			                        <Select slot="append" v-model="prjRightsForm.prj_id">
							            <Option v-for="item in projectFrom" :key="item.id" :value="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
		                <Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="浏览：" prop="read">
			                    <div>
			                    	<RadioGroup v-model="prjRightsForm.read">
				                    	<Radio label="1">
								            <span>是</span>
								        </Radio>
								        <Radio label="2">
								            <span>否</span>
								        </Radio>
								    </RadioGroup>
			                    </div>
			                </FormItem>
		                </Col>
	                </Row>
	                <Row>
		                <Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="告警：" prop="warning">
			                    <div>
			                    	<RadioGroup v-model="prjRightsForm.warning">
				                    	<Radio label="1">
								            <span>是</span>
								        </Radio>
								        <Radio label="2">
								            <span>否</span>
								        </Radio>
								    </RadioGroup>
			                    </div>
			                </FormItem>
		                </Col>
	                </Row>
	                <Row>
		                <Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="控制：" prop="control">
			                    <div>
			                    	<RadioGroup v-model="prjRightsForm.control">
				                    	<Radio label="1">
								            <span>是</span>
								        </Radio>
								        <Radio label="2">
								            <span>否</span>
								        </Radio>
								    </RadioGroup>
			                    </div>
			                </FormItem>
		                </Col>
	                </Row>
	                <Row>
	                	<Col :lg='16'>&nbsp;</Col>
	                	<Col :lg="2">
	                		<Button ref="save" type="success" long @click="Save">保存</Button>
	                	</Col>
	                </Row>
                </Form>
	        </Card>
	    </Col>
	</Row>
</template>

<script>
	export default {
		name: 'projectRightsAdd',
		data () {
			return {
				userForm: [],
				projectFrom: [],
				prjRightsForm: {
					user_id: '',
					prj_id: '',
					read: 2,
					warning: 2,
					control: 2
				},
				inforValidate: {
	                userName: [
	                	{ required: true, message: '请选择用户名称', trigger: 'blur'}
	                ],
	                projectName: [
	                	{ required: true, message: '请选择项目名称', trigger: 'blur'}
	                ],
	                read: [
	                	{ required: true}
	                ],
	                warning: [
	                	{ required: true}
	                ],
	                control: [
	                	{ required: true}
	                ],
	            },
			}
		},
		methods: {
			//获取用户与项目信息
			Init () {
				const copy = this;
				//获取用户信息
				this.$http.get(Api.url + "sems/apiUser/getUsers", {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(response => {
					//console.log(response.data.data);
					copy.userForm = response.data.data;
				})
				.catch(error => {
					console.log(error);
				});
				//获取项目信息
				this.$http.get(Api.url + 'sems/projects/getProjects', {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(response => {
					copy.projectFrom = response.data.data;
				})
				.catch(error => {
					console.log(error);
				})
			},
			//保存项目信息
			Save () {
				const copy = this;
				if(this.prjRightsForm.user_id == '' || this.prjRightsForm.prj_id == '') {
					copy.$Message.error('需填信息不能为空，请填写正确的信息');
				} else {
					this.$http.post(Api.url + 'sems/projects/addProjectPrv', {
						userId: copy.prjRightsForm.user_id,
						prjId: copy.prjRightsForm.prj_id,
						read: copy.prjRightsForm.read,
						warning: copy.prjRightsForm.warning,
						control: copy.prjRightsForm.control
					}, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						}
					})
					.then(response => {
						//console.log(response.data.data);
						const statusCode = parseInt(response.data.head);
						switch (statusCode) {
							case 200:
								copy.$Message.success(response.data.message);
								break;
							default:
								copy.$Message.error(response.data.message);
								break;
						}
					})
					.catch(error => {
						console.log(error);
					})
				}
			},
		},
		mounted () {
			this.Init();
		}
	}
</script>

<style>
	.ivu-card-body {
		height: auto;
	}
</style>