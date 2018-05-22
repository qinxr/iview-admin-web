<template>
	<div>
		<Row>
			<Col :lg="24">
				<Card class="svg">
					<Row>
					<!--<Col :lg="4">&nbsp;</Col>-->
					<Col :lg="24" style="text-align: center;">
						<img src="../../../images/tzwl/fun1_svg.svg" alt="svg图像" />
					</Col>
					<!--<Col :lg="4">&nbsp;</Col>-->
					</Row>
				</Card>
			</Col>
		</Row>
		<Row>
			<Card>
					<h5>主要参数列表</h5>
			</Card>
		</Row>
		<Row>
			<Col :lg="8">
				<Card class="center">
					<p>冷冻水供水温度：<span>19.9/19.8 ℃</span></p>
					<p>冷冻水回水温度：<span>19.9/19.8 ℃</span></p>
					<p>冷却水供水温度：<span>20.2/20.4 ℃</span></p>
					<p>冷却水回水温度：<span>20.1/20.1 ℃</span></p>
				</Card>
			</Col>
			<Col :lg="8">
				<Card class="center">
					<p>冷冻水供水压力：<span>235.0/235.0 kPa</span></p>
					<p>冷冻水回水压力：<span>234.1/234.7 kPa</span></p>
					<p>冷却水供水压力：<span>235.0/235.0 kPa</span></p>
					<p>冷却水回水压力：<span>230.3/230.7 kPa</span></p>
				</Card>
			</Col>
			<Col :lg="8">
				<Card class="center">
					<p>总电量：<span>1765 kWh</span></p>
					<p>冷却泵频率：<span>0/0/0 kHz</span></p>
					<p>冷却泵功率：<span>0/0/0 kW</span></p>
					<p>&nbsp;</p>
				</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default {
		name: 'tzwlDeviceState',
		data() {
			return {
				
			}
		},
		mounted() {
			this.Init();
			
		},
		methods: {
			Init() {
				
			},
		}
	}
</script>

<style lang="less" scoped>
  .svg{
  	height: 540px;
  }
  .center{
  	text-align: center;
  	p{
  		color: #555555;
  		font-size: 16px;
  		span{
  			color: #23b8bc;
  		}
  	}
  }
</style>
