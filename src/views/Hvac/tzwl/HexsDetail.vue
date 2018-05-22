<template>
	<div>
		<Row>
			<Col :lg="24">
				<Card class="svg">
					<p slot="title">
						<Icon type="social-buffer"></Icon>
						分水器和集水器参数
					</p>
					<Row>
						<Col :lg="4">&nbsp;</Col>
						<Col :lg="18">
							<div>
								<img src="../../../images/tzwl/hexs.svg" alt="svg图像" class="img"/>
								<table id="customers" class="customers1">
									<tr>
										<th>集水器</th>
										<th>分水器</th>
									</tr>
									
									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>
								</table>
							</div>
						</Col>
					</Row>
				</Card>
				
			</Col>
		</Row>
		<Row>
			<Col :lg="24">
				<Card class="svg">
					<p slot="title">
						<Icon type="social-buffer"></Icon>
						分区回水实时参数
					</p>
					<Row>
						<Col :lg="3">&nbsp;</Col>
						<Col :lg="18">
							<div>
								<table id="customers">
									<tr>
										<th>&nbsp;</th>
										<th>1-5层东楼新风</th>
										<th>2-5层东楼末端</th>
										<th>1-3层南楼末端</th>
										<th>2-4层南楼末端</th>
										<th>1-5层南楼新风</th>
									</tr>
									<tr>
										<td>实时温度</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>
								</table>
							</div>
						</Col>
					</Row>
				</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default {
		name: 'tzwlhexsDetail',
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
		height: 400px;
	}
	.img{
		float: left;
	}
	.customers1 {
		margin: 80px 0 0 50px;
	}
	#customers
	  {
	  float: left;
	  font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
	  border-collapse:collapse;
	  }
	
	#customers td, #customers th 
	  {
	  font-size:1em;
	  border:1px solid #fff;
	  padding:3px 7px 2px 7px;
	  }
	
	#customers th 
	  {
	  font-size:1.1em;
	  text-align: center;
	  padding-top:5px;
	  padding-bottom:4px;
	  background-color:#2d8cf0;
	  color:#ffffff;
	  }
	
	#customers tr td 
	  {
	  	width: 300px;
	  text-align: center;
	  color: #000000;
	  background-color: #F0F0F0;
	  }
</style>