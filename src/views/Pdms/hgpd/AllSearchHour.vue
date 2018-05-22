<template>
	<div>
		<Row class="margin-top-10">
			<Col :lg="24">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>小时耗电量
				</p>
				<Row>
					<!--<Form ref="data" :model="data" :label-width="100" label-position="left" :rules="inforValidate">-->
					<Col span="2">
					<RadioGroup v-model="type" vertical>
						<Radio label="pm">电表</Radio>
						<Radio label="pd_room">配电室</Radio>
					</RadioGroup>
					</Col>
					<Col span="20">
					<Row>

						<Col span="3">
						<span class="time">园区：</span>
						</Col>
						<Col span="4" class="start-time">
						<Select v-model="data.regionId"  @on-change='getBuilding(data.regionId)'>
							<Option v-for="item in region" :key="item.id" v-bind:value="item.id">{{item.name}}</Option>
						</Select>
						</Col>
						<Col span="1"> &nbsp;
						</Col>
						<Col span="3">
						<span class="time">建筑物：</span>
						</Col>
						<Col span="4" class="start-time">
						<Select v-model="data.BuildingId"  @on-change='getRoom(data.BuildingId)'>
							<Option v-for="item in building" :key="item.id" v-bind:value="item.id">{{item.name}}</Option>
						</Select>
						</Col>
						<Col span="1"> &nbsp;
						</Col>
						<Col span="3">
						<span class="time">配电室：</span>
						</Col>
						<Col span="4" class="start-time">
						<Select v-model="data.roomId"  @on-change='getTransformer(data.roomId)'>
							<Option v-for="item in pdRoom" :key="item.id" v-bind:value="item.id">{{item.name}}</Option>
						</Select>
						</Col>
					</Row>
					<Row v-if="type=='pm'">
						<Col span="3">
						<span class="time">变压器：</span>
						</Col>
						<Col span="4" class="start-time">
						<Select v-model="data.transformerId"  @on-change='getAmmeter(data.transformerId)'>
							<Option v-for="item in transformer" :key="item.id" v-bind:value="item.id">{{item.name}}</Option>
						</Select>
						</Col>
						<Col span="1"> &nbsp;
						</Col>
						<Col span="3">
						<span class="time">电表：</span>
						</Col>
						<Col span="4" class="start-time">
						<Select v-model="data.ammeterID" >
							<Option v-for="item in Ammeter" :key="item.id" v-bind:value="item.id">{{item.name}}</Option>
						</Select>
						</Col>
					</Row>
					<Row>
						<Col span="3">
						<span class="time">起始时间：</span>
						</Col>
						<Col span="4" class="start-time">
						<DatePicker type="date" :options="options1" placeholder="选择日期" style="width: 100%;"  v-model="startTime"></DatePicker>
						</Col>
						<Col span="1"> &nbsp;
						</Col>
						<Col span="3">
						<span class="time">结束时间：</span>
						</Col>
						<Col span="4">
						<DatePicker type="date" :options="options1" placeholder="选择日期" style="width: 100%;"  v-model="stopTime"></DatePicker>
						</Col>
						<Col span="1"> &nbsp;
						</Col>
						<Button type="info"  @click="Refer">查询</Button>
					</Row>
					</Col>
					<!--</Form>-->
				</Row>

			</Card>
			</Col>
		</Row>
		<Row class="margin-top-10">
			<Col :lg="24">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>查询结果
				</p>
				<Row>
					<div id="myChart" :style="{width: '100%', height: '600px'}"></div>
				</Row>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	import { formatDate } from '@/date/date.js'
	import { table2csvData, csvColumns } from './data/table2csv.js';
	import { table2excelData, excelColumns } from './data/table2excel.js';
	import table2excel from '@/libs/table2excel.js';
	import axios from 'axios'
	export default {
		name: 'hgpdallSearchHour',

		data() {
			return {
				startTime: '',
				stopTime: '',
				region: '', //区域
				building:'',//建筑物
				pdRoom: '', //配电室
				transformer: '', //变压器
				Ammeter: '', //电表
				type: 'pm',
				options1: {
					shortcuts: [{
						text: '今天',
						value() {
							return new Date();
						},
					}]
				},
				data: {
					regionId: '',
				},
				ammWarningData: [],

			}
		},
		mounted() {
			var copy = this;
			//获取项目区域
			axios.get(Api.url + "pdms/regions/getRegionAsProject/" + Api.pdId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(function(response) {
					copy.region = response.data.data;
					console.log(copy.region)
				})
				.catch(function(error) {
					console.log(error);
				});

		},
		methods: {
			//根据区域ID获取建筑物
			getBuilding(id) {
				const copy = this;
				axios.get(Api.url + "pdms/buildings/getBuildingAsRegion/" + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(function(response) {
						copy.building = response.data.data;
						console.log(copy.building)
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			//根据建筑物ID获取配电室
			getRoom(id) {
				const copy = this;
				axios.get(Api.url + "pdms/rooms/getRoomAsBuilding/" + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(function(response) {
						copy.pdRoom = response.data.data;
						console.log(copy.pdRoom)
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			//根据配电室ID获取变压器
			getTransformer(id) {
				const copy = this;
				axios.get(Api.url + "pdms/transformers/getTransformerAsRoom/" + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(function(response) {
						copy.transformer = response.data.data;
						console.log(copy.transformer)
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			//根据变压器ID获取电表
			getAmmeter(id) {
				const copy = this;
				axios.get(Api.url + "pdms/pm/getPmAsTransformers/" + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(function(response) {
						copy.Ammeter = response.data.data;
						console.log(copy.Ammeter)
					})
					.catch(function(error) {
						console.log(error);
					});
			},

			//按日期查询
			Refer() {
				const copy = this;
				const start = this.FormatDate(this.startTime);
				const stop = this.FormatDate(this.stopTime);
				var myChart = this.$echarts.init(document.getElementById('myChart'))
				var id = '';
				//判断类型获取id
				if(this.type == 'pm') {
					id = this.data.ammeterID;
				} else {
					id = this.data.roomId;
				}
				this.$http.get(Api.url + 'pdms/pmHourDegree/getPmHourDegreeDatas/' + start + '/' + stop + '/' + copy.type + '/' + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						}
					})
					.then(response => {

						console.log(copy.yData)
						myChart.setOption({
							title: {
								text: response.data.data.title
							},
							tooltip: {
								trigger: "axis"
							},
							calculable: true,
							legend: {
								data: ["用电量"]
							},
							color: ["#23B8BC", "#005059", "#EE7449", "#AAD1DA"],
							grid: {
								top: '12%',
								left: '1%',
								right: '5%',
								containLabel: true
							},
							xAxis: {
								type: "category",
								data: response.data.data.hour,
								axisLabel: {
									rotate: -30, //-30度角倾斜显示  
								}
							},
							yAxis: {
								name: response.data.data.y_name,
								type: 'value',
								axisLabel: {
									formatter: '{value} kWh'
								}
							},
							series: [{
								name: "用电量",
								type: "bar",
								data: response.data.data.degree,
							}]
						});
						document.window.resize(function() {
							//重置容器高宽
							myChart.resize();
						});

					})
					.catch(error => {
						console.log(error);
					})
			},
			//转换日期格式
			FormatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
				//此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
			},
			//导出数据Csv格式
			exportData() {
				this.$refs.table.exportCsv({
					filename: '电表告警信息'
				});

			},
			//导出数据xls格式
			exportExcel() {
				table2excel.transform(this.$refs.table, 'hrefToExportTable', '电表告警信息');
			},
		}
	}
</script>

<style lang="less" scoped>
	.time {
		font-size: 14px;
		font-weight: 600;
		line-height: 33px;
	}
	
	/*@media only screen and (max-width: 1366px) {
		.start-time {
			margin-right: 30px;
		}
	}*/
</style>