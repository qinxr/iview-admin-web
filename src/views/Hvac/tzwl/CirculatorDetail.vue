<template>
	<div>
		<Row>
			<Col :lg="24">
			<Card class="svg">
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					冷冻泵
				</p>
				<Row>
					<Col :lg="2">&nbsp;</Col>
					<Col :lg="4">
					<Row>
						<h5>1#冷冻泵</h5>
						<div class="txt-center">
							<img src="../../../images/tzwl/pump.svg" alt="svg图像" class="img" />
						</div>
					</Row>
					<Row>
						<div class="txt-center">
							<h4>状态</h4>
						</div>
					</Row>
					</Col>
					<Col :lg="18">
					<Row>
						&nbsp;
					</Row>
					<Row>
						<table id="customers">
							<tr>
								<th>工作状态</th>
								<th>频率</th>
								<th>功率</th>
							</tr>

							<tr>
								<td>停止</td>
								<td>0.0KHz</td>
								<td>0.0KW</td>
							</tr>
						</table>
					</Row>
					</Col>
				</Row>
				<Row>
					<Col :lg="2">&nbsp;</Col>
					<Col :lg="4">
					<Row>
						<h5>2#冷冻泵</h5>
						<div class="txt-center">
							<img src="../../../images/tzwl/pump.svg" alt="svg图像" class="img" />
						</div>
					</Row>
					<Row>
						<div class="txt-center">
							<h4>状态</h4>
						</div>
					</Row>
					</Col>
					<Col :lg="18">
					<Row>
						&nbsp;
					</Row>
					<Row>
						<table id="customers">
							<tr>
								<th>工作状态</th>
								<th>频率</th>
								<th>功率</th>
							</tr>

							<tr>
								<td>停止</td>
								<td>0.0KHz</td>
								<td>0.0KW</td>
							</tr>
						</table>
					</Row>
					</Col>
				</Row>
				<Row>
					<Col :lg="2">&nbsp;</Col>
					<Col :lg="4">
					<Row>
						<h5>3#冷冻泵</h5>
						<div class="txt-center">
							<img src="../../../images/tzwl/pump.svg" alt="svg图像" class="img" />
						</div>
					</Row>
					<Row>
						<div class="txt-center">
							<h4>状态</h4>
						</div>
					</Row>
					</Col>
					<Col :lg="18">
					<Row>
						&nbsp;
					</Row>
					<Row>
						<table id="customers">
							<tr>
								<th>工作状态</th>
								<th>频率</th>
								<th>功率</th>
							</tr>
							<tr>
								<td>停止</td>
								<td>0.0KHz</td>
								<td>0.0KW</td>
							</tr>
						</table>
					</Row>
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
					冷却泵
				</p>
				<Row>
					<Col :lg="2">&nbsp;</Col>
					<Col :lg="4">
					<Row>
						<h5>1#冷却泵</h5>
						<div class="txt-center">
							<img src="../../../images/tzwl/pump.svg" alt="svg图像" class="img" />
						</div>
					</Row>
					<Row>
						<div class="txt-center">
							<h4>状态</h4>
						</div>
					</Row>
					</Col>
					<Col :lg="18">
					<Row>
						&nbsp;
					</Row>
					<Row>
						<table id="customers">
							<tr>
								<th>工作状态</th>
								<th>频率</th>
								<th>功率</th>
							</tr>

							<tr>
								<td>停止</td>
								<td>0.0KHz</td>
								<td>0.0KW</td>
							</tr>
						</table>
					</Row>
					</Col>
				</Row>
				<Row>
					<Col :lg="2">&nbsp;</Col>
					<Col :lg="4">
					<Row>
						<h5>2#冷却泵</h5>
						<div class="txt-center">
							<img src="../../../images/tzwl/pump.svg" alt="svg图像" class="img" />
						</div>
					</Row>
					<Row>
						<div class="txt-center">
							<h4>状态</h4>
						</div>
					</Row>
					</Col>
					<Col :lg="18">
					<Row>
						&nbsp;
					</Row>
					<Row>
						<table id="customers">
							<tr>
								<th>工作状态</th>
								<th>频率</th>
								<th>功率</th>
							</tr>

							<tr>
								<td>停止</td>
								<td>0.0KHz</td>
								<td>0.0KW</td>
							</tr>
						</table>
					</Row>
					</Col>
				</Row>
				<Row>
					<Col :lg="2">&nbsp;</Col>
					<Col :lg="4">
					<Row>
						<h5>3#冷却泵</h5>
						<div class="txt-center">
							<img src="../../../images/tzwl/pump.svg" alt="svg图像" class="img" />
						</div>
					</Row>
					<Row>
						<div class="txt-center">
							<h4>状态</h4>
						</div>
					</Row>
					</Col>
					<Col :lg="18">
					<Row>
						&nbsp;
					</Row>
					<Row>
						<table id="customers">
							<tr>
								<th>工作状态</th>
								<th>频率</th>
								<th>功率</th>
							</tr>
							<tr>
								<td>停止</td>
								<td>0.0KHz</td>
								<td>0.0KW</td>
							</tr>
						</table>
					</Row>
					</Col>
				</Row>
			</Card>

			</Col>
		</Row>
	</div>
</template>

<script>
	export default {
		name: 'tzwlCirculatorDetail',
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
	.svg {
		height: 400px;
	}
	
	.txt-center {
		text-align: center;
	}
	
	#customers {
		margin-left: 200px;
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