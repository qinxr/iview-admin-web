<template>
	<Row>
		<Col :lg='24'>
			<Card>
				<p slot="title">
	                <Icon type="social-buffer"></Icon>
				           建筑物信息编辑
			    </p>
			    <Form 
                    ref="buildingsForm"
                    :model="buildingsForm" 
                    :label-width="120" 
                    label-position="right"
                    :rules="inforValidate"
                >
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="建筑物名称：" prop="name">
			                    <div >
			                        <Input v-model="buildingsForm.name" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
	                <Row>
		                <Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="区域名称" prop="region_id">
			                    <div>
			                        <Select slot="append" v-model="buildingsForm.region_id">
							            <Option v-for="item in regionData" :value="item.id" :key="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
	                </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="描述：" prop="description">
			                    <div >
			                        <Input v-model="buildingsForm.description" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
	                <Row>
	                	<Col :lg='16'>&nbsp;</Col>
	                	<Col :lg="2">
	                		<Button ref="save" type="success" long @click="Edit">保存</Button>
	                	</Col>
	                </Row>
                </Form>
	        </Card>
	    </Col>
	</Row>
</template>

<script>
	export default {
		//name: 'hgpdBuildingsEdit',
		data () {
			return {
				buildingsId: '',
				buildingsForm: {},
				regionData: [],
				inforValidate: {
	                name: [
	                	{ required: true, message: '请输入建筑物名称', trigger: 'blur' }
	                ],
	                region_id: [
	                	{ required: true, message: '请选择区域名称', trigger: 'blur' }
	                ],
	                description: [
	                	{ required: false, message: '请输入描述信息', trigger: 'blur'  	}
	                ],
	            },
			}
		},
		mounted () {
			this.Init();
		},
		methods: {
			Init () {
				const copy = this;
				//根据项目Id获取区域信息
				this.$http.get(Api.url + 'pdms/regions/getRegionAsProject/' + Api.pdId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(response => {
					//console.log(response.data.data);
					copy.regionData = response.data.data;
				})
				.catch(error => {
					console.log(error);
				});
				//根据建筑物Id获取建筑物信息
				this.buildingsId = this.$route.params.id;
				this.$http.get(Api.url + 'pdms/buildings/getBuilding/' + this.buildingsId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(response => {
					//console.log(response.data.data);
					copy.buildingsForm = response.data.data;
				})
				.catch(error => {
					console.log(error);
				});
			},
			//编辑建筑物信息
			Edit () {
				const copy = this;
				if(this.buildingsForm.name == '' || this.buildingsForm.region_id == '') {
					copy.$Message.error('需填信息不能为空，请填写正确的信息');
				} else {
					this.$http.post(Api.url + 'pdms/buildings/editBuilding/' + this.buildingsId, {
						projectId: Api.pdId,
						name: copy.buildingsForm.name,
						regionId: copy.buildingsForm.region_id,
						description: copy.buildingsForm.description
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
		}
	}
</script>

<style>
	.ivu-card-body {
		height: auto;
	}
</style>