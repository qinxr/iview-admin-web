<template>
	<div>
		<Row>
			<Col :lg="12" style="padding-right: 15px;">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					能耗概览
				</p>
				<Row>
					<Col :lg="8">
					<div class="index-title">
						当年
					</div>
					</Col>
					<Col :lg="8">
					<div class="index-title">
						当月
					</div>
					</Col>
					<Col :lg="8">
					<div class="index-title">
						当天
					</div>
					</Col>
				</Row>
				<Row>
					<Col :lg="8">
					<div id="myChart1" :style="{width: '100%', height: '300px'}">
					</div>
					</Col>
					<Col :lg="8">
					<div id="myChart1-2" :style="{width: '100%', height: '300px'}">
					</div>
					</Col>
					<Col :lg="8">
					<div id="myChart1-3" :style="{width: '100%', height: '300px'}">
					</div>
					</Col>
				</Row>
			</Card>
			</Col>
			<Col :lg="12" style="padding-right: 15px;">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					近四天运行时间
				</p>
				<Row>
					&nbsp;
				</Row>
				<div id="myChart2" :style="{width: '100%', height: '300px'}">

				</div>
			</Card>
			</Col>
		</Row>
		<Row>
			<Col :lg="24" style="padding-right: 15px; margin-top: 15px;">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					24小时能耗展示
				</p>
				<div id="myChart3" :style="{width: '100%', height: '300px'}">
				</div>
			</Card>
			</Col>
		</Row>
		<Row>
			<Col :lg="24" style="padding-right: 15px; margin-top: 15px;">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					运行记录列表
				</p>

				<Row type="flex" justify="center" align="middle">
					<Table :columns="orderColumns" border :data="orderData" style="width: 100%;"></Table>
				</Row>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default {
		name: 'tzwlhome_index',
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
				orderColumns: [{
						title: '序号',
						align: 'center',
						key: 'order_id',
					},
					{
						title: '时间',
						key: 'order_id',
						align: 'center'
					},
					{
						title: '设备名称',
						key: 'user_name',
						align: 'center',
					},
					{
						title: '时间内容',
						key: 'show_more',
						align: 'center',

					},
				],
				orderData: [

				]
			}
		},
		mounted() {
			this.Init();
			let myChart3 = this.$echarts.init(document.getElementById('myChart3'));
			myChart3.setOption({
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
			let myChart2 = this.$echarts.init(document.getElementById('myChart2'));
			myChart2.setOption({
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				title: [{
					left: 'left',
					text: '分设备能耗KWH'
				}],
				color: ["#23B8BC", "#005059", "#EE7449", "#AAD1DA"],
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					data: ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12', '2018-01', '2018-02', '2018-03', '2018-04']
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
					name: '总电表',
					type: 'bar',
					data: [1026, 1111, 2000, 3000, 1035, 1025, 1045, 2555, 2333, 2450, 3520, 5640, 2500, 1250, 3600, 2500],
				}, ]
			});
		},
		methods: {
			Init() {
				let myChart1 = this.$echarts.init(document.getElementById('myChart1'));
				myChart1.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					color: ["#23B8BC", "#005059", "#EE7449", "#AAD1DA"],
					legend: {
						orient: 'vertical',
						x: 'left',
						data: ['能耗概览']
					},
					series: [{
						name: '电表耗电量',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: true,
								position: 'center',
								formatter: function() {
									return "100"
								},
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: [{
							value: 564,
							name: '能耗统计'
						}],
					}]
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.index-title {
		text-align: center;
		font-size: 16px;
		font-weight: 600;
	}
</style>