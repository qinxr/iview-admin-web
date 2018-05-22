<template>
	<Row>
		<Col :lg='24'>
			<Card>
				<p slot="title">
	                <Icon type="social-buffer"></Icon>
				           项目信息查看与编辑
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
			                <FormItem label="项目名称：" prop="name">
			                    <div >
			                        <Input v-model="projectForm.name" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
		                <Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="项目类型：" prop="type">
			                    <div>
			                        <Select slot="append" v-model="projectForm.type">
							            <Option v-for="item in projectTypeData" :value="item.id" :key="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
	                </Row>
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="项目url地址：" prop="url">
			                    <div >
			                        <Input v-model="projectForm.url" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="基础url地址：" prop="base_url">
			                    <div >
			                        <Input v-model="projectForm.base_url" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
		                <Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="项目类型：" prop="state_id">
			                    <div>
			                        <Select slot="append" v-model="projectForm.state_id">
							            <Option v-for="item in projectStateData" :key="item.id" :value="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
	                </Row>
	                <Row>
	                	<Col :lg='16'>&nbsp;</Col>
	                	<Col :lg="2">
	                		<Button type="success" long @click="Edit">确认修改</Button>
	                	</Col>
	                </Row>
                </Form>
	        </Card>
	    </Col>
	</Row>
</template>

<script>
	export default {
		name: 'projectedit',
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
				projectTypeData: [],
				projectId: '',
				projectForm: {},
				inforValidate: {
	                name: [
	                    { required: true, message: '请输入项目名称', trigger: 'blur' },
	                ],
	                url: [
	                	{ required: true, message: '请输入项目url地址', trigger: 'blur' }
	                ],
	                base_url: [
	                	{ required: true, message: '请输入项目基础url地址', trigger: 'blur' }
	                ],
	                type: [
	                	{ required: true, message: '请选择项目类型', trigger: 'blur' }
	                ],
	                state_id: [
	                	{ required: true, message: '请选择项目状态', trigger: 'blur'  	}
	                ]
	            },
			}
		},
		methods: {
			Init () {
				const copy = this;
				//获取指定ID的项目信息
				let projectId = parseInt(this.$route.params.id.toString());
				this.$http.get(Api.url + 'sems/projects/getProject/' + projectId, {
					headers: {
	                    Authorization: "Bearer " + localStorage.getItem("access_token")
	                }
				})
				.then(response => {
					console.log(response.data.data);
					copy.projectForm = response.data.data;
				})
				.catch(error => {
					console.log(error);
				});
				//获取项目类型信息
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
				});
			},
			//修改项目信息
			Edit () {
				const copy = this;
				if(this.projectForm.name == '' || this.projectForm.type == '' || this.projectForm.url == '' || this.projectForm.base_url == '' || this.projectForm.state_id == '') {
					copy.$Message.error('需填信息不能为空，请填写正确的信息');
				} else {
					let projectId = parseInt(this.$route.params.id.toString());
					this.$http.post(Api.url + 'sems/projects/editProject/' + projectId, {
						name: copy.projectForm.name,
						type: copy.projectForm.type,
						url: copy.projectForm.url,
						baseurl: copy.projectForm.base_url,
						state: copy.projectForm.state_id
					}, {
						headers: {
		                    Authorization: "Bearer " + localStorage.getItem("access_token")
		                }
					})
					.then(response => {
						//console.log(response.data);
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