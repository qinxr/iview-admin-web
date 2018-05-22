
<template>
	<div>
		<Row>
			<Col span="24">
			<Card>
				<p slot="title">
					<Icon type="ios-list"></Icon>
					定义报警列表
				</p>
					<Button type="info">添加定义</Button>
					<Row>&nbsp;</Row>
					<Row type="flex" justify="center" align="middle" >
						<Table :columns="orderColumns" :data="orderData" style="width: 100%;"></Table>
					</Row>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default {
		name: 'tzwlWarningSet',
		data() {
			return {
				startTime: '',
				stopTime: '',
				orderColumns: [{
						title: '编辑',
						key: 'order_id',
						align: 'center'
					},
					{
						title: '设备名称',
						key: 'order_id',
						align: 'center'
					},
					{
						title: '设备属性',
						key: 'user_name',
						align: 'center',
					},
					{
						title: '报警规则',
						key: 'show_more',
						align: 'center',

					},
					{
						title: '报警阀值',
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