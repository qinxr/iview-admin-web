<template>
	<Row>
		<Col :lg='24'>
			<Card>
				<p slot="title">
	                <Icon type="social-buffer"></Icon>
				           分、集水器编辑
			    </p>
			    <Form 
                    ref="hexsForm"
                    :model="hexsForm" 
                    :label-width="120" 
                    label-position="right"
                    :rules="inforValidate"
                >
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="渠道ID：" prop="channel_id">
			                    <div >
			                        <Input v-model="hexsForm.channel_id" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="分、集水器名称：" prop="name">
			                    <div >
			                        <Input v-model="hexsForm.name" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
	                <Row>
		                <Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="类型：" prop="type">
			                    <div>
			                        <Select slot="append" v-model="hexsForm.type">
							            <Option v-for="item in hexsTypeData" :value="item.id" :key="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
	                </Row>
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="厂家：" prop="producer">
			                    <div >
			                        <Input v-model="hexsForm.producer" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="位置：" prop="location">
			                    <div >
			                        <Input v-model="hexsForm.location" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="描述：" prop="description">
			                    <div >
			                        <Input v-model="hexsForm.description" ></Input>
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
		//name: 'tzwlHexsEdit',
		data () {
			return {
				hexsId: '',
				hexsTypeData: [{
					id: 1,
					name: '分水器',
				}, {
					id: 2,
					name: '集水器',
				}],
				hexsForm: {},
				inforValidate: {
	                channel_id: [
	                    { required: true, message: '请输入渠道ID', trigger: 'blur' },
	                ],
	                name: [
	                	{ required: true, message: '请输入分、集水器名称', trigger: 'blur' }
	                ],
	                type: [
	                	{ required: true, message: '请选择分、集水器类型', trigger: 'blur' }
	                ],
	                producer: [
	                	{ required: false, message: '请输入厂家', trigger: 'blur' }
	                ],
	                location: [
	                	{ required: false, message: '请输入安装位置', trigger: 'blur'  	}
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
			//根据分、集水器ID获取信息
			Init () {
				const copy = this;
				this.hexsId = this.$route.params.id;
				this.$http.get(Api.url + 'hvac/hexs/getHex/' + this.hexsId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response => {
					//console.log(response.data.data);
					copy.hexsForm = response.data.data;
				})
				.catch(error => {
					console.log(error);
				})
			},
			//编辑分、集水器信息
			Edit () {
				const copy = this;
				if(this.hexsForm.channel_id == '' || this.hexsForm.name == '' || this.hexsForm.type == '') {
					copy.$Message.error('需填信息不能为空，请填写正确的信息');
				} else {
					this.$http.post(Api.url + 'hvac/hexs/editHex/' + this.hexsId, {
						projectId: Api.tzwlId,
						channelId: copy.hexsForm.channel_id,
						name: copy.hexsForm.name,
						type: copy.hexsForm.type,
						producer: copy.hexsForm.producer,
						location: copy.hexsForm.location,
						description: copy.hexsForm.description
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