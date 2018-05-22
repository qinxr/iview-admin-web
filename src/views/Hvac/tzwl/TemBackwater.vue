<template>
	<div>
		<Row class="margin-top-10">
			<Col :lg="24">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					分区回水
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
		name: 'tzwlTemBackwater',
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
				["2017-06-05", 20, 20],
				["2017-06-06", 18.8, 20],
				["2017-06-07", 18.8, 20],
				["2017-06-08", 18.9, 20],
				["2017-06-09", 19.8, 20],
				["2017-06-10", 20.1, 20],
				["2017-06-11", 20.2, 20],
				["2017-06-12", 19.8, 20],
				["2017-06-13", 18.8, 20],
				["2017-06-14", 18.9, 20],
				["2017-06-15", 19.2, 20],
				["2017-06-16", 19.8, 20],
				["2017-06-17", 18.9, 20],
				["2017-06-18", 19.8, 20],
				["2017-06-19", 18.9, 20],
				["2017-06-20", 19.8, 20],
				["2017-06-21", 19.8, 20],
				["2017-06-22", 19.5, 20],
				["2017-06-23", 18.9, 20],
				["2017-06-24", 19.8, 20],
				["2017-06-25", 21.4, 20],
				["2017-06-26", 19.8, 20],
				["2017-06-27", 19.4, 20],
				["2017-06-28", 19.6, 20],
				["2017-06-29", 20.2, 20],
				["2017-06-30", 19.8, 20],
				["2017-07-01", 19.2, 20],
				["2017-07-02", 19.8, 20],
				["2017-07-03", 20.2, 20],
				["2017-07-04", 19.8, 20],
				["2017-07-05", 20.5, 20],
				["2017-07-06", 21.4, 20],
				["2017-07-07", 19.8, 20],
				["2017-07-08", 22.3, 20],
				["2017-07-09", 19.8, 20],
				["2017-07-10", 19.8, 20],
				["2017-07-11", 21.4, 20],
				["2017-07-12", 21.4, 20],
				["2017-07-13", 22.3, 20],
				["2017-07-14", 22.3, 20],
				["2017-07-15", 18.9, 20],
				["2017-07-16", 17.5, 20],
				["2017-07-17", 18.9, 20],
				["2017-07-18", 17.8, 20],
				["2017-07-19", 20.2, 20],
				["2017-07-20", 20.2, 20],
				["2017-07-21", 22.3, 20],
				["2017-07-22", 22.8, 20],
				["2017-07-23", 21.4, 20],
				["2017-07-24", 22.3, 20],
			];

			var dateList = data.map(function(item) {
				return item[0];
			});
			var valueList = data.map(function(item) {
				return parseInt(Math.random() * 40);
			});
			var valueList2 = data.map(function(item) {
				return parseInt(Math.random() * 40);
			});
			myChart.setOption({

				
				legend: {
					data: ['南楼', '北楼']
				},
				color: ["#23B8BC", "#005059", "#EE7449", "#AAD1DA"],
				title: [{
					left: 'left',
					text: '分区回水'
				}],
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
						formatter: '{value} °C'
					}
				},
				grid: [{
					bottom: '10%'
				}, ],
				series: [{
					name: '南楼',
					type: 'line',
					showSymbol: true,
					data: valueList
				}, {
					name: '北楼',
					type: 'line',
					showSymbol: false,
					data: valueList2
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