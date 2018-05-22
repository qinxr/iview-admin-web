<template>
	<div class="home-main">
		<Row>
			<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px',paddingRight:'20px'}">
			<infor-card id-name="electricityDay" :end-val="electricity.day" iconType="stats-bars" color="#2d8cf0" intro-text="当日用电量"></infor-card>
			</Col>
			<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px',paddingRight:'20px'}">
			<infor-card id-name="electricityMonth" :end-val="electricity.month" iconType="stats-bars" color="#64d572" intro-text="月度用电量"></infor-card>
			</Col>
			<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px',paddingRight:'20px'}">
			<infor-card id-name="electricityYear" :end-val="electricity.year" iconType="stats-bars" color="#ffd572" intro-text="年度用电量"></infor-card>
			</Col>
			<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px',paddingRight:'20px'}">
			<infor-card id-name="electricityTotal" :end-val="electricity.total" iconType="stats-bars" color="#f25e43" intro-text="累计用电量"></infor-card>
			</Col>
		</Row>
		<Row>
			
			<Col :lg="24" :xs="24" class="card-position">
			<Card class='areaOne'>
				<p slot="title" class="title">
					<Icon type="ios-location"></Icon>
					BGS
				</p>
				<Row>
					<Col :lg="12">
					<Row>通讯质量：{{region7.quality.running}}</Row>
					<Row>更新时间：{{region7.quality.time}}</Row>
					<Row class='flex-content' style='margin-top: 30px;'>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">2</Tag>
						</Row>
						<Row class='flex-content'>
							配电室
						</Row>

						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">4</Tag>
						</Row>
						<Row class='flex-content'>
							变压器
						</Row>
						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">114</Tag>
						</Row>
						<Row class='flex-content'>
							电表
						</Row>
						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">2+2</Tag>
						</Row>
						<Row class='flex-content'>
							视频
						</Row>
						</Col>
					</Row>
					</Col>
					<Col :lg="12">
					<Carousel autoplay v-model="areaTwo" loop>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									<Col :lg="12">
									<Row class='flex-title'>
										A库配电室
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/aBank/logisticsAOneTrf">
											<Tag type="border" color="blue">1#变压器</Tag>
										</router-link>
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/aBank/logisticsATwoTrf">
											<Tag type="border" color="blue">2#变压器</Tag>
										</router-link>
									</Row>
									</Col>
									<Col :lg="12">
									<Row class='flex-title'>
										B库配电室
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/bBank/logisticsBOneTrf">
											<Tag type="border" color="blue">1#变压器</Tag>
										</router-link>
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/bBank/logisticsBTwoTrf">
											<Tag type="border" color="blue">2#变压器</Tag>
										</router-link>
									</Row>
									</Col>
								</Row>

							</div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									A库配电室
								</Row>
								<Row class='flex-content'>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										温度
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region7.state[0].envs[0].tem}}℃</Tag>
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region7.state[0].envs[1].tem}}℃</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										湿度
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region7.state[0].envs[0].hum}}%</Tag>
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region7.state[0].envs[1].hum}}%</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										{{region7.state[0].smoke[0].name}}
									</Row>
									<Row v-if="region7.state[0].smoke[0].smoke==2">
										<span class='state' style="background-color: #ed3f14;">告警</span>
									</Row>
									<Row v-else>
										<span class='state' style="background-color: #19be6b;">正常</span>
									</Row>

									</Col>

								</Row>

							</div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									B库配电室
								</Row>
								<Row class='flex-content'>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										温度
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region7.state[1].envs[0].tem}}℃</Tag>
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region7.state[1].envs[1].tem}}℃</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										湿度
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region7.state[1].envs[0].hum}}%</Tag>
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region7.state[1].envs[1].hum}}%</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										{{region7.state[0].smoke[0].name}}
									</Row>
									<Row v-if="region7.state[1].smoke[0].smoke==2">
										<span class='state' style="background-color: #ed3f14;">告警</span>
									</Row>
									<Row v-else>
										<span class='state' style="background-color: #19be6b;">正常</span>
									</Row>

									</Col>

								</Row>

							</div>
						</CarouselItem>

					</Carousel>
					</Col>
				</Row>
				<div class="line-gray"></div>
				<Row style='text-align: center;'>
					<Col :lg="6">
					<Row>
						<Tooltip placement="top">
							<span class="tipnumber">{{region7.electricity.total.total}}</span>
							<div slot="content">
								<p>
									ia:{{region7.electricity.total.ia}}
								</p>
								<p>
									ib:{{region7.electricity.total.ib}}
								</p>
								<p>
									ic:{{region7.electricity.total.ic}}
								</p>
							</div>
						</Tooltip>
					</Row>
					<Row>
						总负载电流
					</Row>

					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region7.electricity.day" placement="top">
							<span class="tipnumber">{{region7.electricity.day}}</span>
						</Tooltip>
					</Row>
					<Row>
						当日用电量
					</Row>
					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region7.electricity.month" placement="top">
							<span class="tipnumber">{{region7.electricity.month}}</span>
						</Tooltip>
					</Row>
					<Row>
						当月用电量
					</Row>
					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region7.electricity.year" placement="top">
							<span class="tipnumber">{{region7.electricity.year}}</span>
						</Tooltip>
					</Row>
					<Row>
						当年用电量
					</Row>
					</Col>
				</Row>
			</Card>
			</Col>
			
			
		</Row>

		<Row style="margin-top: 15px; padding-right: 20px;">

			<Col :lg="24">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					操作日志

				</p>
				<div class="edittable-table-height-con">
					<Row>
						<Col :lg='20'>&nbsp;</Col>
						<Col :lg="4" style="text-align: right;">
						<Input v-model="searchConName1" icon="search" @on-change="handleSearch1" placeholder="请输入事件内容搜索..." style="width: 200px" />
						</Col>
					</Row>
					<Row>
						&nbsp;
					</Row>
					<Table border refs="table" :data="logsData" v-model="logsData" :columns="editInlineColumns"></Table>
				</div>
				<div style="padding: 20px;overflow: hidden">
					<div style="float: right;">
						<Page :page-size="pageSize" :total="dataCount" :current="1" @on-change="changePage" show-elevator></Page>
					</div>
				</div>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	import inforCard from './components/inforCard.vue';
	import axios from 'axios'
	export default {
		name: 'hbgshome_index',
		components: {
			//			countUp,
			inforCard,
		},
		data() {
			return {
				areaOne: 0,
				areaTwo: 0,
				areaThree: 0,
				areaFour: 0,
				speedThree: {
					autoplaySpeed: 3000,
				},
				speedFour: {
					autoplaySpeed: 4000,
				},
				speedTwo: {
					autoplaySpeed: 2500,
				},
				pageSize: 5, //每页显示的数据量
				dataCount: 0, //初始化总数据量
				historyData: [], //存所有数据
				logsData: [],
				searchConName1: "",
				editInlineColumns: [{
						title: '序号',
						key: 'id',
						align: 'left',
						width: '10%',
						sortable: true
					},
					{
						title: '人物',
						align: 'left',
						width: '15%',
						key: 'userName',
					},
					{
						title: '事件内容',
						align: 'left',
						key: 'info',
					},
					{
						title: 'IP地址',
						align: 'left',
						width: '15%',
						key: 'ip_address',
					},
					{
						title: '时间',
						align: 'left',
						width: '10%',
						key: 'created_at',
					},

				],
				
				region7: {
					electricity: {
						day: 0,
						month: 0,
						year: 0,
						total: 0,
					},
					quality: '',
					state: [{
							envs: [{
								tem: 0,
								hum: 0,
							}, {
								tem: 0,
								hum: 0,
							}],
							smoke: [{
								name: ''
							}]
						},
						{
							envs: [{
								tem: 0,
								hum: 0,
							}, {
								tem: 0,
								hum: 0,
							}],
							smoke: [{
								name: ''
							}]
						}
					],
				},
				
				electricity: {
					day: 0,
					month: 0,
					year: 0,
					total: 0,
				},

			};
		},
		mounted() {
			this.getElectricity("prj", 2);
			//console.log(this.electricity)
			
			//区域二信息获取
			this.getLastTime(7);
			this.getElectricity("region", 7);
			this.getElectricityAsRegion("region", 7);
			this.getStateAsRegion(7);
			
			//获取操作日志
			this.getLogs();
		},
		methods: {
			//获取操作日志
			getLogs() {
				var copy = this;
				axios.get(Api.url + "pdms/log/getLogsAsProject/" + Api.pdId, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then((response) => {
						//console.log(response.data.data);
						copy.historyData = response.data.data;

						copy.dataCount = copy.historyData.length;
						// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
						if(copy.historyData.length < copy.pageSize) {
							copy.logsData = copy.historyData;
						} else {
							copy.logsData = copy.historyData.slice(0, copy.pageSize);
						}

					})
					.catch((error) => {
						console.log(error);
					})
			},
			//搜索触发函数	
			handleSearch1() {
				if(this.searchConName1 == "") {
					this.logsData = this.historyData.slice(0, this.pageSize);
				} else {

					this.logsData = this.historyData;
					this.logsData = this.search(this.logsData, {
						info: this.searchConName1
					});
				}
			},
			//搜索功能函数
			search(data, argumentObj) {
				let res = data;
				let dataClone = data;
				for(let argu in argumentObj) {
					if(argumentObj[argu].length > 0) {
						res = dataClone.filter(d => {
							return d[argu].indexOf(argumentObj[argu]) > -1;
						});
						dataClone = res;
					}
				}
				return res;
			},
			//分页功能
			changePage(index) {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				var _start = (index - 1) * this.pageSize;
				var _end = index * this.pageSize;
				this.logsData = this.historyData.slice(_start, _end);
			},
			//根据区域ID获取通讯质量和更新时间
			getLastTime(id) {
				var copy = this;
				axios.get(Api.url + "pdms/dashboard/getLastTimeAsRegion/" + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then((response) => {
						switch(id) {
							
							case 7:
								copy.region7.quality = response.data.data;
								break;
							

						}

					})
					.catch((error) => {
						console.log(error);
					})
			},
			//用电量获取
			getElectricity(type, id) {
				var copy = this;
				axios.get(Api.url + "pdms/dashboard/getDegreeTotal/" + type + "/" + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then((response) => {
						switch(id) {
							
							case 7:
								copy.region7.electricity.day = parseFloat(response.data.data.day);
								copy.region7.electricity.month = parseFloat(response.data.data.month);
								copy.region7.electricity.year = parseFloat(response.data.data.year);
								break;
							
						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			//区域实时负载电流获取
			getElectricityAsRegion(type, id) {
				var copy = this;
				axios.get(Api.url + "pdms/dashboard/getIaIbIc/" + type + "/" + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then((response) => {
						switch(id) {
							
							case 7:
								copy.region7.electricity.total = response.data.data;
								break;
							

						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			//变压器实时状态获取
			getStateAsRegion(id) {
				var copy = this;
				axios.get(Api.url + "pdms/dashboard/getRoomAsRegion/" + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then((response) => {
						switch(id) {
							
							case 7:
								copy.region7.state = response.data.data;
								break;
							

						}
					})
					.catch((error) => {
						console.log(error);
					})
			}

		}
	};
</script>

<style>
	.card-position {
		padding-right: 20px;
		margin-top: 15px;
	}
	
	.title {
		font-size: 20px !important;
	}
	
	.demo-carousel {
		text-align: center;
		padding-bottom: 20px;
	}
	
	.flex-title {
		font-size: larger;
	}
	
	.flex-content {
		text-align: center;
		font-size: 14px;
		margin: 15px 0;
	}
	
	.areaOne .ivu-carousel-track:nth-child(2) {
		display: none;
	}
	
	.state {
		height: 48px;
		width: 48px;
		color: white;
		border-radius: 100%;
		line-height: 48px;
		font-size: 16px;
		padding: 8px 22px;
	}
	
	.line-gray {
		height: 0;
		border-bottom: 2px solid #dcdcdc;
		margin-bottom: 15px;
	}
	
	.tipnumber {
		font-weight: 600;
		font-size: 16px;
	}
</style>