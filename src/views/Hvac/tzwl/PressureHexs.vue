<template>
	<div>
		<Row class="margin-top-10">
			<Col :lg="24">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					分集水器水压趋势
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
		name: 'tzwlPressureHexs',
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
				["2017-06-05", 200, 235],
				["2017-06-06", 188, 235],
				["2017-06-07", 188, 235],
				["2017-06-08", 189, 235],
				["2017-06-09", 198, 235],
				["2017-06-10", 201, 235],
				["2017-06-11", 202, 235],
				["2017-06-12", 198, 235],
				["2017-06-13", 188, 235],
				["2017-06-14", 189, 235],
				["2017-06-15", 192, 235],
				["2017-06-16", 198, 235],
				["2017-06-17", 189, 235],
				["2017-06-18", 198, 235],
				["2017-06-19", 189, 235],
				["2017-06-20", 198, 235],
				["2017-06-21", 198, 235],
				["2017-06-22", 195, 235],
				["2017-06-23", 189, 235],
				["2017-06-24", 198, 235],
				["2017-06-25", 214, 235],
				["2017-06-26", 198, 235],
				["2017-06-27", 194, 235],
				["2017-06-28", 196, 235],
				["2017-06-29", 202, 235],
				["2017-06-30", 198, 235],
				["2017-07-01", 192, 235],
				["2017-07-02", 198, 235],
				["2017-07-03", 202, 235],
				["2017-07-04", 198, 235],
				["2017-07-05", 205, 235],
				["2017-07-06", 214, 235],
				["2017-07-07", 198, 235],
				["2017-07-08", 223, 235],
				["2017-07-09", 198, 235],
				["2017-07-10", 198, 235],
				["2017-07-11", 214, 235],
				["2017-07-12", 214, 235],
				["2017-07-13", 223, 235],
				["2017-07-14", 223, 235],
				["2017-07-15", 189, 235],
				["2017-07-16", 175, 235],
				["2017-07-17", 189, 235],
				["2017-07-18", 178, 235],
				["2017-07-19", 202, 235],
				["2017-07-20", 202, 235],
				["2017-07-21", 223, 235],
				["2017-07-22", 228, 235],
				["2017-07-23", 214, 235],
				["2017-07-24", 223, 235],
			];

			var dateList = data.map(function(item) {
				return item[0];
			});
			var valueList = data.map(function(item) {
				return item[1] - parseInt(Math.random() * 200);
			});
			var valueList2 = data.map(function(item) {
				return item[2] - parseInt(Math.random() * 150);
			});

			myChart.setOption({

				// Make gradient line here
				
				legend: {
					data: ['分水器', '集水器']
				},
				color: ["#23B8BC", "#005059", "#EE7449", "#AAD1DA"],
				title: [{
					left: 'left',
					text: '分集水器水压趋势'
				}],
				tooltip: {
					trigger: 'axis'
				},
				grid:{
					left:"10%",
					right:"10%",
					top:"10%",
					bottom:"10%",
				},
				xAxis: [{
					data: dateList,
					splitLine : {
						show: true
					},
				}],
				yAxis: {
					
					axisLabel: {
						formatter: '{value} KPa'
					},
					splitLine : {
						show: true
					},
				},
				grid: [{
					bottom: '10%'
				}, ],
				series: [{
					name: '分水器',
					type: 'line',
					data: valueList
				}, {
					name: '集水器',
					type: 'line',
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