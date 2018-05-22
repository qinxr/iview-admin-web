<template>
	<div>
		<Row>
			<Col :lg="24">
			<Card class="svg">
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					1#主机
				</p>
				<Row>
					<Col :lg="3">&nbsp;</Col>
					<Col :lg="5">
					<Row>
						<h5>1#主机</h5>
						<div style="text-align: center;">
							<img src="../../../images/tzwl/refrigerator.svg" alt="svg图像" class="img" />
						</div>
					</Row>
					<Row>
						<div style="text-align: center;">
							<h4>状态</h4>
						</div>
					</Row>
					</Col>
					<Col :lg="12">
					<table id="customers" style="margin-top: 30px;">
						<tr>
							<th>参数名称</th>
							<th>温度</th>
							<th>压力</th>
						</tr>

						<tr>
							<td>冷冻水进</td>
							<td>0.0 ℃</td>
							<td>0.0 kPa</td>
						</tr>
						<tr>
							<td>冷冻水出</td>
							<td>0.0 ℃</td>
							<td>0.0 kPa</td>
						</tr>
						<tr>
							<td>冷却水进</td>
							<td>0.0 ℃</td>
							<td>0.0 kPa</td>
						</tr>
						<tr>
							<td>冷却水出</td>
							<td>0.0 ℃</td>
							<td>0.0 kPa</td>
						</tr>
					</table>
					</Col>

				</Row>
			</Card>

			</Col>
		</Row>
		<Row style="margin-top: 15px;">
			<Col :lg="24">
			<Card class="svg">
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					2#主机
				</p>
				<Row>
					<Col :lg="3">&nbsp;</Col>
					<Col :lg="5">
					<Row>
						<h5>2#主机</h5>
						<div style="text-align: center;">
							<img src="../../../images/tzwl/refrigerator.svg" alt="svg图像" class="img" />
						</div>
					</Row>
					<Row>
						<div style="text-align: center;">
							<h4>状态</h4>
						</div>
					</Row>
					</Col>
					<Col :lg="12">
					<table id="customers" style="margin-top: 30px;">
						<tr>
							<th>参数名称</th>
							<th>温度</th>
							<th>压力</th>
						</tr>

						<tr>
							<td>冷冻水进</td>
							<td>0.0 ℃</td>
							<td>0.0 kPa</td>
						</tr>
						<tr>
							<td>冷冻水出</td>
							<td>0.0 ℃</td>
							<td>0.0 kPa</td>
						</tr>
						<tr>
							<td>冷却水进</td>
							<td>0.0 ℃</td>
							<td>0.0 kPa</td>
						</tr>
						<tr>
							<td>冷却水出</td>
							<td>0.0 ℃</td>
							<td>0.0 kPa</td>
						</tr>
					</table>
					</Col>

				</Row>
			</Card>

			</Col>
		</Row>
	</div>
</template>

<script>
</script>

<style lang="less" scoped>
	.svg {
		height: 400px;
	}
	
	#customers {
		margin-left: 250px;
		float: left;
		font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
		border-collapse: collapse;
	}
	
	#customers td,
	#customers th {
		font-size: 1em;
		border: 1px solid #fff;
		padding: 3px 7px 2px 7px;
	}
	
	#customers th {
		font-size: 1.1em;
		text-align: center;
		padding-top: 5px;
		padding-bottom: 4px;
		background-color: #2d8cf0;
		color: #ffffff;
	}
	
	#customers tr td {
		width: 200px;
		text-align: center;
		color: #000000;
		background-color: #F0F0F0;
	}
</style>