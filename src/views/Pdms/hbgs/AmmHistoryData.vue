<template>
	<div>
		<Row class="margin-top-10">
			<Col :lg="24">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>电表历史数据
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
						<Select v-model="data.roomId" style="width:200px" @on-change='getTransformer(data.roomId)'>
							<Option v-for="item in pdRoom" :key="item.id" v-bind:value="item.id">{{item.name}}</Option>
						</Select>
						</Col>
						<Col span="2">
						<span class="time">变压器：</span>
						</Col>
						<Col span="4" class="start-time">
						<Select v-model="data.transformerId" style="width:200px" @on-change='getAmmeter(data.transformerId)'>
							<Option v-for="item in transformer" :key="item.id" v-bind:value="item.id">{{item.name}}</Option>
						</Select>
						</Col>
						<Col span="2">
						<span class="time">电表：</span>
						</Col>
						<Col span="4" class="start-time">
						<Select v-model="data.ammeterID" style="width:200px">
							<Option v-for="item in Ammeter" :key="item.id" v-bind:value="item.id">{{item.name}}</Option>
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
					<Timeline>
						<TimelineItem>
							<p class="time">电流</p>
							<div id="myChartI" :style="{width: '100%', height: '400px'}"></div>
						</TimelineItem>
						<TimelineItem>
							<p class="time">电压</p>
							<div id="myChartU" :style="{width: '100%', height: '400px'}"></div>
						</TimelineItem>
						<TimelineItem>
							<p class="time">功率</p>
							<div id="myChartW" :style="{width: '100%', height: '400px'}"></div>
						</TimelineItem>
						<TimelineItem>
							<p class="time">电量</p>
							<div id="myChartE" :style="{width: '100%', height: '400px'}"></div>
						</TimelineItem>
						<TimelineItem>
							<p class="time">&nbsp;</p>
						</TimelineItem>

					</Timeline>

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
		name: 'hbgsammHistoryData',

		data() {
			return {
				startTime: '',
				stopTime: '',
				region: '', //区域
				pdRoom: '', //配电室
				transformer: '', //变压器
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
				xData: [],
				yData: [],
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
				var myChartI = this.$echarts.init(document.getElementById('myChartI'));
				var myChartU = this.$echarts.init(document.getElementById('myChartU'));
				var myChartW = this.$echarts.init(document.getElementById('myChartW'));
				var myChartE = this.$echarts.init(document.getElementById('myChartE'));

				var id = this.data.ammeterID;

				this.$http.get(Api.url + 'pdms/historyData/getPmHistoryData/' + id + '/m/' + start + '/' + stop, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						}
					})
					.then(response => {

						myChartI.setOption({
//							title: {
//								text: response.data.data.iaibic_title
//							},
							tooltip: {
								trigger: "axis"
							},
							calculable: true,
							legend: {
								data: ["ia", "ib", "ic"]
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
								name: response.data.data.iaibic_y,
								type: 'value',
								axisLabel: {
									formatter: '{value} A'
								}
							},
							series: [{
								name: "ia",
								type: "line",
								data: response.data.data.ia,
							}, {
								name: "ib",
								type: "line",
								data: response.data.data.ib,
							}, {
								name: "ic",
								type: "line",
								data: response.data.data.ic,
							}]
						});
						myChartU.setOption({
//							title: {
//								text: response.data.data.uaubuc_title
//							},
							tooltip: {
								trigger: "axis"
							},
							calculable: true,
							legend: {
								data: ["ua", "ub", "uc"]
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
								name: response.data.data.uaubuc_y,
								type: 'value',
								axisLabel: {
									formatter: '{value} V'
								}
							},
							series: [{
								name: "ua",
								type: "line",
								data: response.data.data.ua,
							}, {
								name: "ub",
								type: "line",
								data: response.data.data.ub,
							}, {
								name: "uc",
								type: "line",
								data: response.data.data.uc,
							}]
						});
						myChartW.setOption({
//							title: {
//								text: response.data.data.power_title
//							},
							tooltip: {
								trigger: "axis"
							},
							calculable: true,
							legend: {
								data: ["功率"]
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
								name: response.data.data.power_y,
								type: 'value',
								axisLabel: {
									formatter: '{value} W'
								}
							},
							series: [{
								name: "功率",
								type: "line",
								data: response.data.data.power,
							}]
						});
						myChartE.setOption({
//							title: {
//								text: response.data.data.degree_title
//							},
							tooltip: {
								trigger: "axis"
							},
							calculable: true,
							legend: {
								data: ["电量"]
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
								name: response.data.data.degree_y,
								type: 'value',
								axisLabel: {
									formatter: '{value} kWh'
								}
							},
							series: [{
								name: "ia",
								type: "line",
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
		}
	}
</script>

<style lang="less" scoped>
	.time {
		font-size: 16px;
		font-weight: 600;
		line-height: 33px;
	}
	
	@media only screen and (max-width: 1366px) {
		.start-time {
			margin-right: 30px;
		}
	}
</style>