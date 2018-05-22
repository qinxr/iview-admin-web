<template>
	<div>
		<Row style="margin-top: 15px;">
			<Col :lg="24">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					主机组运行记录
				</p>
				<Row>
					<Col :lg="12">
					<Card>
						<p slot="title">
							设备运行时长（1#主机、2#主机）
						</p>
						<Row style="text-align: center;">
							<Col :lg="8"> 总运行时长
							</Col>
							<Col :lg="8"> 当月运行时长
							</Col>
							<Col :lg="8"> 当天运行时长
							</Col>
						</Row>
						<Row style="text-align: center;">
							<Col :lg="8"><Tag type="border"  color="green">1</Tag>
							</Col>
							<Col :lg="8"> <Tag type="border"  color="green">1</Tag>
							</Col>
							<Col :lg="8"> <Tag type="border" >0</Tag>
							</Col>
						</Row>
						<Row style="text-align: center;">
							<Col :lg="8"> <Tag type="border" >0</Tag>
							</Col>
							<Col :lg="8">  <Tag type="border" >0</Tag>
							</Col>
							<Col :lg="8">  <Tag type="border" >0</Tag>
							</Col>
						</Row>
					</Card>
					</Col>
					<Col :lg="12">
					<Card>
						<p slot="title">
							设备参数
						</p>
						<Row style="text-align: center;">
							<Col :lg="12">
								<Row>
									<Tag type="border" color='blue'>1#主机</Tag>
								</Row>
								<Row>
									&nbsp;
								</Row>
								<Row>
									<Tag type="border" >电功率 146/186kw</Tag>
								</Row>
								<Row>
									<Tag type="border" >额定制冷量 760kw</Tag>
								</Row>
								<Row>
									<Tag type="border" >额定制热量 790kw</Tag>
								</Row>
							</Col>
							<Col :lg="12">
								<Row>
									<Tag type="border" color='blue'>2#主机</Tag>
								</Row>
								<Row>
									&nbsp;
								</Row>
								<Row>
									<Tag type="border" >电功率 146/186kw</Tag>
								</Row>
								<Row>
									<Tag type="border" >额定制冷量 760kw</Tag>
								</Row>
								<Row>
									<Tag type="border" >额定制热量 790kw</Tag>
								</Row>
							</Col>
						</Row>
						
					</Card>
					</Col>
				</Row>
			</Card>
</Col>
</Row>
		<Row style="margin-top: 15px;">	
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					运行记录列表
				</p>
				<Row style="margin-bottom: 10px;">
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
				<Row type="flex" justify="center" align="middle">
					<Table :columns="orderColumns" :data="orderData" style="width: 100%;"></Table>
				</Row>
			</Card>
		</Row>
	</div>
</template>

<script>
	export default {
		name: 'tzwlRefrigeratorRunning',
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
						type: 'index',
						title: '序号',
						width: 60
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
					//              {
					//                  order_id: '1000001',
					//                  user_name: 'Aresn'
					//              },
					//              {
					//                  order_id: '1000002',
					//                  user_name: 'Lison'
					//              },
					//              {
					//                  order_id: '1000003',
					//                  user_name: 'lili'
					//              },
					//              {
					//                  order_id: '1000004',
					//                  user_name: 'lala'
					//              }
				]

			}
		},
		mounted() {
			

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