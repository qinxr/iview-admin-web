<template>
	<Row>
		<Col :lg='24'>
			<Card>
				<p slot="title">
	                <Icon type="social-buffer"></Icon>
				           项目新增
			    </p>
			    <Form 
                    ref="projectForm"
                    :model="projectForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="项目名称：" prop="projectName">
			                    <div >
			                        <Input v-model="projectForm.projectName" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
	                <Row>
		                <Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="项目类型：" prop="projectType">
			                    <div>
			                        <Select slot="append" v-model="projectForm.projectType">
							            <Option v-for="item in projectTypeData" :value="item.id" :key="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
	                </Row>
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="项目url地址：" prop="projectUrl">
			                    <div >
			                        <Input v-model="projectForm.projectUrl" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="基础url地址：" prop="projectBaseUrl">
			                    <div >
			                        <Input v-model="projectForm.projectBaseUrl" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
		                <Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="项目类型：" prop="projectState">
			                    <div>
			                        <Select slot="append" v-model="projectForm.projectState">
							            <Option v-for="item in projectStateData" :key="item.id" :value="item.id">{{item.name}}</Option>
							        </Select>
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
		name: 'projectAdd',
		data () {
			return {
				projectStateData: [{
					id: 1,
					name: '完成',
				}, {
					id: 2,
					name: '开发中',
				}, {
					id: 3,
					name: '调用',
				}],
				projectForm: {
					projectName: '',
					projectType: '',
					projectUrl: '',
					projectBaseUrl: '',
					projectState: ''
				},
				projectTypeData: [],
				inforValidate: {
	                projectName: [
	                    { required: true, message: '请输入项目名称', trigger: 'blur' },
	                ],
	                projectUrl: [
	                	{ required: true, message: '请输入项目url地址', trigger: 'blur' }
	                ],
	                projectBaseUrl: [
	                	{ required: true, message: '请输入项目基础url地址', trigger: 'blur' }
	                ],
	                projectType: [
	                	{ required: true, message: '请选择项目类型', trigger: 'blur' }
	                ],
	                projectState: [
	                	{ required: true, message: '请选择项目状态', trigger: 'blur'  	}
	                ]
	            },
			}
		},
		methods: {
			//保存项目信息
			Save () {
				const copy = this;
				if(this.projectForm.projectName == '' || this.projectForm.projectType == '' || this.projectForm.projectUrl == '' || this.projectForm.projectBaseUrl == '' || this.projectForm.projectState == '') {
					copy.$Message.error('需填信息不能为空，请填写正确的信息');
				} else {
					this.$http.post(Api.url + 'sems/projects/addProject', {
						name: copy.projectForm.projectName,
						type: copy.projectForm.projectType,
						url: copy.projectForm.projectUrl,
						baseurl: copy.projectForm.projectBaseUrl,
						state: copy.projectForm.projectState
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
			//获取项目类型信息
			Init () {
				const copy = this;
				this.$http.get(Api.url + 'sems/projects/getTypes', {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response => {
					copy.projectTypeData = response.data.data;
				})
				.catch(error => {
					console.log(error);
				})
			}
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