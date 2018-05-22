<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="ivu-icon ivu-icon-flash"></Icon>
				环境告警信息详情
			</p>
			<Form ref="data" :model="data" :label-width="100" label-position="right" :rules="inforValidate">

				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="区域名称：" prop="region_id">
						<div>
							{{data.regionName}}
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="建筑物：" prop="region_id">
						<div>
							{{data.buildingName}}
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="配电室：" prop="pd_room_id">
						<div>
							{{data.roomName}}
						</div>
					</FormItem>
					</Col>
				</Row>
				
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="设备：" prop="description">
						<div>
							{{data.envName}}
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="监测参数：" prop="description">
						<div>
							{{data.column}}
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="当前值：" prop="description">
						<div>
							{{data.currentvalue}}
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="规则：" prop="description">
						<div>
							{{data.rule_operator}}
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="阈值：" prop="description">
						<div>
							{{data.threshold}}
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="描述：" prop="description">
						<div>
							{{data.description?data.description:'空'}}
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="告警时间：" prop="description">
						<div>
							{{data.warning_time}}
						</div>
					</FormItem>
					</Col>
				</Row>
			</Form>
		</Card>
		</Col>
	</Row>
</template>

<script>
	import axios from 'axios'

	export default {
		name: 'hgpdEnvWarningHistoryDetail',
		data() {
			return {
				data: {
					
				},
				region: "",
				pdRoom: '',
				inforValidate: {
					

				},
			}
		},
		mounted() {
			const copy = this;
			//获取项目区域
			
			//根据ID获取环境历史信息
			let index = this.$route.params.id;
			axios.get(Api.url + "pdms/warning/getEnvWarning/" + index, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(function(response) {
					copy.data = response.data.data;
					console.log(copy.region);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		methods: {
			
			
			
		}
	}
</script>

<style>
	.ivu-card-body {
		height: auto;
	}
	
	.ivu-input[disabled],
	fieldset[disabled] .ivu-input {
		color: #495060;
	}
</style>