<template>
	<div>
		<Row class="margin-top-10">
			<Col :lg="24">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					2#主机组水压趋势
				</p>
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
					<Button type="info" style="margin-left: 20px;">查询</Button>
				</Row>
			</Card>
			</Col>
		</Row>
		<Row class="margin-top-10">
			<Col :lg="24">
			<Card>
				<div id="myChart" :style="{width: '100%', height: '600px'}"></div>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default {
		name: 'tzwlPressureTwo',
		data() {
			return {
				pageSize: 10, //每页显示的数据量
				dataCount: 0, //初始化总数据量
				historyData: [], //存所有数据
				startTime: '',
				stopTime: '',
				options1: {
					shortcuts: [{
						text: '今天',
						value() {
							return new Date();
						},
					}]
				},
				detailsAllData: [],

			}
		},
		mounted() {
			let myChart = this.$echarts.init(document.getElementById('myChart'))
			var data = [
				["2017-06-05", 230, 230, 230, 230],
				["2017-06-06", 188, 230, 230, 230],
				["2017-06-07", 188, 230, 230, 230],
				["2017-06-08", 189, 230, 230, 230],
				["2017-06-09", 198, 230, 230, 230],
				["2017-06-10", 201, 230, 230, 230],
				["2017-06-11", 202, 230, 230, 230],
				["2017-06-12", 198, 230, 230, 230],
				["2017-06-13", 188, 230, 230, 230],
				["2017-06-14", 189, 230, 230, 230],
				["2017-06-15", 192, 230, 230, 230],
				["2017-06-16", 198, 230, 230, 230],
				["2017-06-17", 189, 230, 230, 230],
				["2017-06-18", 198, 230, 230, 230],
				["2017-06-19", 189, 230, 230, 230],
				["2017-06-20", 198, 230, 230, 230],
				["2017-06-21", 198, 230, 230, 230],
				["2017-06-22", 195, 230, 230, 230],
				["2017-06-23", 189, 230, 230, 230],
				["2017-06-24", 198, 230, 230, 230],
				["2017-06-25", 214, 230, 230, 230],
				["2017-06-26", 198, 230, 230, 230],
				["2017-06-27", 194, 230, 230, 230],
				["2017-06-28", 196, 230, 230, 230],
				["2017-06-29", 202, 230, 230, 230],
				["2017-06-30", 198, 230, 230, 230],
				["2017-07-01", 192, 230, 230, 230],
				["2017-07-02", 198, 230, 230, 230],
				["2017-07-03", 202, 230, 230, 230],
				["2017-07-04", 198, 230, 230, 230],
				["2017-07-05", 205, 230, 230, 230],
				["2017-07-06", 214, 230, 230, 230],
				["2017-07-07", 198, 230, 230, 230],
				["2017-07-08", 223, 230, 230, 230],
				["2017-07-09", 198, 230, 230, 230],
				["2017-07-10", 198, 230, 230, 230],
				["2017-07-11", 214, 230, 230, 230],
				["2017-07-12", 214, 230, 230, 230],
				["2017-07-13", 223, 230, 230, 230],
				["2017-07-14", 223, 230, 230, 230],
				["2017-07-15", 189, 230, 230, 230],
				["2017-07-16", 175, 230, 230, 230],
				["2017-07-17", 189, 230, 230, 230],
				["2017-07-18", 178, 230, 230, 230],
				["2017-07-19", 202, 230, 230, 230],
				["2017-07-20", 202, 230, 230, 230],
				["2017-07-21", 223, 230, 230, 230],
				["2017-07-22", 228, 230, 230, 230],
				["2017-07-23", 214, 230, 230, 230],
				["2017-07-24", 223, 230, 230, 230],
			];

			var dateList = data.map(function(item) {
				return item[0];
			});
			var valueList1 = data.map(function(item) {
				return parseInt(Math.random() * 1000);
			});
			var valueList2 = data.map(function(item) {
				return parseInt(Math.random() * 1000);
			});
			var valueList3 = data.map(function(item) {
				return parseInt(Math.random() * 1000);
			});
			var valueList4 = data.map(function(item) {
				return parseInt(Math.random() * 1000);
			});

			myChart.setOption({

				// Make gradient line here

				legend: {
					data: ['冷冻进水', '冷冻出水', '冷却进水', '冷却出水']
				},
				title: [{
					left: 'left',
					text: '2#主机组水压趋势'
				}],
				color: ["#23B8BC", "#005059", "#EE7449", "#AAD1DA"],
				tooltip: {
					trigger: 'axis'
				},
				xAxis: [{
					splitLine: {
						show: true
					},
					data: dateList
				}],
				yAxis: {
					splitLine: {
						show: true
					},
					axisLabel: {
						formatter: '{value} KPa'
					}
				},
				grid: [{
					bottom: '10%'
				}, ],
				series: [{
					name: '冷冻进水',
					type: 'line',
					data: valueList1
				}, {
					name: '冷冻出水',
					type: 'line',
					data: valueList2
				}, {
					name: '冷却进水',
					type: 'line',
					data: valueList3
				}, {
					name: '冷却出水',
					type: 'line',
					data: valueList4
				}]
			});

		},

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