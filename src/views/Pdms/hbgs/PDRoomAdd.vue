<template>
	<Row>
		<Col :lg='24'>
			<Card>
				<p slot="title">
	                <Icon type="social-buffer"></Icon>
				           配电室新增
			    </p>
			    <Form 
                    ref="pdRoomForm"
                    :model="pdRoomForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
                	<Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="区域选择：" prop="regionId">
			                    <div >
			                        <Select slot="append" v-model="pdRoomForm.regionId">
							            <Option v-for="item in regionData" :key="item.id" :value="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="配电室名称：" prop="pdRoomName">
			                    <div >
			                        <Input v-model="pdRoomForm.pdRoomName" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="描述：" prop="description">
			                    <div >
			                        <Input v-model="pdRoomForm.description" ></Input>
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
		name: 'hbgsPDRoomAdd',
		data () {
			return {
				pdRoomForm: {
					pdRoomName: '',
					regionId: '',
					description: ''
				},
				regionData: [],
				inforValidate: {
	                pdRoomName: [
	                    { required: true, message: '请输入配电室名称', trigger: 'blur' },
	                ],
	                regionId: [
	                	{ required: true, message: '请选择区域名称', trigger: 'blur' }
	                ],
	                description: [
	                	{ required: false, message: '请输入描述', trigger: 'blur' }
	                ],
	            },
			}
		},
		mounted () {
			this.Init();
		},
		methods: {
			//获取区域Id
			Init () {
				const copy = this;
				this.$http.get(Api.url + 'pdms/regions/getRegionAsProject/' + Api.hbgsId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response => {
					//console.log(response.data.data);
					copy.regionData = response.data.data;
				})
				.catch(error => {
					console.log(error);
				})
			},
			//保存配电室信息
			Save () {
				const copy = this;
				this.$http.post(Api.url + 'pdms/rooms/addRoom', {
					name: copy.pdRoomForm.pdRoomName,
					projectId: Api.hbgsId,
					regionId: copy.pdRoomForm.regionId,
					description: copy.pdRoomForm.description
				}, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response => {
					//console.log(response.data);
					const statusCode = parseInt(response.data.head);
					switch(statusCode) {
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
	}
</script>

<style lang="less" scoped>
</style>