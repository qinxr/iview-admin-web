<template>
	<div>
		<Row class="margin-top-10">
			<Col :lg="24">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>环境历史数据
				</p>
				<Row>
					<!--<Form ref="data" :model="data" :label-width="100" label-position="left" :rules="inforValidate">-->

					<Col span="20">
					<Row>

						<Col span="2">
						<span class="time">园区：</span>
						</Col>
						<Col span="4" class="start-time">
						<Select v-model="data.regionId" style="width:200px" @on-change='getRoom(data.regionId)'>
							<Option v-for="item in region" :key="item.id" v-bind:value="item.id">{{item.name}}</Option>
						</Select>
						</Col>

						<Col span="2">
						<span class="time">配电室：</span>
						</Col>
						<Col span="4" class="start-time">
						<Select v-model="data.roomId" style="width:200px" @on-change='getEnvironment(data.roomId)'>
							<Option v-for="item in pdRoom" :key="item.id" v-bind:value="item.id">{{item.name}}</Option>
						</Select>
						</Col>
						<Col span="2">
						<span class="time">环境：</span>
						</Col>
						<Col span="4" class="start-time">
						<Select v-model="data.environment" style="width:200px">
							<Option v-for="item in environment" :key="item.id" v-bind:value="item.id">{{item.name}}</Option>
						</Select>
						</Col>

					</Row>
					<Row>
						<Col span="2">
						<span class="time">起始时间：</span>
						</Col>
						<Col span="4" class="start-time">
						<DatePicker type="date" :options="options1" placeholder="选择日期" style="width: 200px" v-model="startTime"></DatePicker>
						</Col>
						<Col span="2">
						<span class="time">结束时间：</span>
						</Col>
						<Col span="4">
						<DatePicker type="date" :options="options1" placeholder="选择日期" style="width: 200px" v-model="stopTime"></DatePicker>
						</Col>
						<Button type="info" style="margin-left: 20px;" @click="Refer">查询</Button>
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
				<!--电流-->
				<Row>

					<div id="myChart" :style="{width: '100%', height: '500px'}"></div>

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
		name: 'hbgsenvHistoryData',

		data() {
			return {
				startTime: '',
				stopTime: '',
				region: '', //区域
				pdRoom: '', //配电室
				environment: '', //变压器
				Ammeter: '', //电表

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
			axios.get(Api.url + "pdms/regions/getRegionAsProject/" + Api.hbgsId, {
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
			//根据区域ID获取配电室
			getRoom(id) {
				const copy = this;
				axios.get(Api.url + "pdms/rooms/getRoomAsRegion/" + id, {
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
			getEnvironment(id) {
				const copy = this;
				axios.get(Api.url + "pdms/env/getEnvAsrooms/" + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(function(response) {
						copy.environment = response.data.data;
						console.log(copy.environment)
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
				var myChart = this.$echarts.init(document.getElementById('myChart'));

				var id = this.data.environment;

				this.$http.get(Api.url + 'pdms/historyData/getEnvHistoryData/' + id + '/m/' + start + '/' + stop, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						}
					})
					.then(response => {

						myChart.setOption({
							title: {
								text: "环境"
							},
							tooltip: {
								trigger: "axis"
							},
							calculable: true,
							legend: {
								data: ["温度", "湿度"]
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
								data: response.data.data.time,
								axisLabel: {
									rotate: -30, //-30度角倾斜显示  
								}
							},
							yAxis: {
								type: 'value'

							},
							series: [{
								name: "温度",
								type: "line",
								data: response.data.data.tem,
							},
							{
								name: "湿度",
								type: "line",
								data: response.data.data.hum,
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
		}
	}
</script>

<style lang="less" scoped>
	.time {
		font-size: 14px;
		font-weight: 600;
		line-height: 33px;
	}
	
	@media only screen and (max-width: 1366px) {
		.start-time {
			margin-right: 30px;
		}
	}
</style>