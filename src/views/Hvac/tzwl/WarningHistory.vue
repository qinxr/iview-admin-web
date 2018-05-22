<template>
	<div>
		<Row>
			<Col span="24">

			<Card>
				<p slot="title">
					<Icon type="ios-list"></Icon>
					实时报警
				</p>
				<Row style="margin: 10px ;">
					<Col span="2">
					<span class="time">起始时间：</span>
					</Col>
					<Col span="4" class="start-time">
					<DatePicker type="date"  placeholder="选择日期" style="width: 200px" v-model="startTime"></DatePicker>
					</Col>
					<Col span="2">
					<span class="time">结束时间：</span>
					</Col>
					<Col span="4">
					<DatePicker type="date"  placeholder="选择日期" style="width: 200px" v-model="stopTime"></DatePicker>
					</Col>
					<Button type="info" style="margin-left: 20px;">查询</Button>
				</Row>
				<Card>
					<p slot="title">
						<Icon type="ios-list"></Icon>
						阀值报警
					</p>
					<Row type="flex" justify="center" align="middle">
						<Table :columns="orderColumns" :data="orderData" style="width: 100%;"></Table>
					</Row>
				</Card>
				<Card style="margin-top: 15px;">
					<p slot="title">
						<Icon type="ios-list"></Icon>
						状态报警
					</p>
					<Row type="flex" justify="center" align="middle">
						<Table :columns="orderColumns" :data="orderData" style="width: 100%;"></Table>
					</Row>
				</Card>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default {
		name: 'tzwlWarningHistory',
		data() {
			return {
				startTime:'',
				stopTime:'',
				orderColumns: [{
						type: 'index',
						title: '序号',
						width: 60
					},
					{
						title: '报警设备',
						key: 'order_id',
						align: 'center'
					},
					{
						title: '报警属性',
						key: 'user_name',
						align: 'center',
					},
					{
						title: '当前值',
						key: 'show_more',
						align: 'center',

					},
					{
						title: '报警类型',
						key: 'show_more',
						align: 'center',

					},
					{
						title: '报警阀值',
						key: 'show_more',
						align: 'center',

					},
					{
						title: '报警时间',
						key: 'show_more',
						align: 'center',

					},
				],
				orderData: [

				]
			};
		},
		computed: {
			avatorImage() {
				return localStorage.avatorImgPath;
			}
		}
	};
</script>