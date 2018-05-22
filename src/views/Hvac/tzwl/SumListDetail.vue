<template>
	<div>
		<Row style="margin-top: 15px;">
			<Col :lg="24">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					总表
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
		<Row style="margin-top: 15px;">
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
		name: 'tzwlSumListDetail',
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
			let myChart = this.$echarts.init(document.getElementById('myChart'));
			myChart.setOption({
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				title: [{
					left: 'left',
					text: '分时段能耗KWH'
				}],
				legend: {
					data: ['峰时用电', '谷时用电', '平时用电']
				},
				color: ["#23B8BC", "#005059", "#EE7449", "#AAD1DA"],
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					data: ['2018-3-30', '2018-3-31', '2018-4-01', '2018-4-02', '2018-4-03', '2018-4-04', '2018-4-05', '2018-4-06', '2018-4-07', '2018-4-08', '2018-4-09', '2018-4-10', '2018-4-11', '2018-4-12', '2018-4-13', '2018-4-14', '2018-4-15', '2018-4-16', '2018-4-17', '2018-4-18', '2018-4-19', '2018-4-20', '2018-4-21', '2018-4-22', '2018-4-23', '2018-4-24']
				}],
				yAxis: {
					splitLine: {
						show: false
					},
					axisLabel: {
						formatter: '{value} KWH'
					}
				},
				series: [{
						name: '峰时用电',
						type: 'bar',
						stack: '广告',
						data: [120, 132, 101, 134, 90, 230, 210, 123, 120, 132, 101, 134, 255, 120, 132, 101, 134, 90, 230, 210, 123, 120, 132, 101, 134, 255]
					},
					{
						name: '谷时用电',
						type: 'bar',
						stack: '广告',
						data: [220, 182, 191, 234, 290, 330, 310, 123, 120, 132, 101, 134, 255, 120, 132, 101, 134, 90, 230, 210, 123, 120, 132, 101, 134, 255]
					},
					{
						name: '平时用电',
						type: 'bar',
						stack: '广告',
						data: [150, 232, 201, 154, 190, 330, 410, 123, 120, 132, 101, 134, 255, 120, 132, 101, 134, 90, 230, 210, 123, 120, 132, 101, 134, 255]
					},
				]
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