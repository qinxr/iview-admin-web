<template>
	<div>
		<Modal v-model="ModalBool" width="900">
			<h2 style="margin-left: 2px; font-size: 20px;">{{pmTitle}}</h2>
			<Row class="margin-top-10">
				<Col :lg="24">
				<Card>
					<p slot="title">
						<Icon type="social-buffer"></Icon>
						电流
					</p>
					<Row>
						<div id="myChartI" :style="{width: '834px', height: '200px'}"></div>
					</Row>
				</Card>
				</Col>
			</Row>
			<Row class="margin-top-10">
				<Col :lg="24">
				<Card>
					<p slot="title">
						<Icon type="social-buffer"></Icon>
						电压
					</p>
					<Row>
						<div id="myChartU" :style="{width: '834px', height: '200px'}"></div>
					</Row>
				</Card>
				</Col>
			</Row>
			<Row class="margin-top-10">
				<Col :lg="24">
				<Card>
					<p slot="title">
						<Icon type="social-buffer"></Icon>
						功率
					</p>
					<Row>
						<div id="myChartW" :style="{width: '834px', height: '200px'}"></div>
					</Row>
				</Card>
				</Col>
			</Row>
		</Modal>
		<h2 style="margin-left: 2px; font-size: 20px;">{{title}}</h2>
		<Row class="margin-top-10">
			<Col :lg="24">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					实时监测
				</p>
				<Tabs value="name1">
					<TabPane label="低压系统图" name="name1">
						<div id="svg-diagram"></div>
					</TabPane>
					<TabPane label="实时数据列表" name="name2">
						<div class="edittable-table-height-con">
							<Row>
								<Col :lg='20'>&nbsp;</Col>
								<Col :lg="4" style="text-align: right;">
								<Input v-model="searchConName1" icon="search" @on-change="handleSearch1" placeholder="请输入电表名称搜索..." style="width: 200px" />
								</Col>
							</Row>
							<Row>
								&nbsp;
							</Row>
							<Table border refs="table" :data="trfData" v-model="trfData" :columns="editInlineColumns"></Table>
							<div style="margin: 10px;overflow: hidden">
								<div style="float: right;">
									<Page :page-size="pageSize" :total="dataCount" :current="1" @on-change="changePage"></Page>
								</div>
							</div>
						</div>
					</TabPane>
				</Tabs>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	import * as d3 from '../../../svg/d3.v4.min.js';
	export default {
		name: 'hgpdbF06TwoTrf',
		data() {
			return {
				pmTitle: '',
				ModalBool: false,
				pageSize: 30, //每页显示的数据量
				dataCount: 0, //初始化总数据量
				historyData: [], //存所有数据
				searchConName1: "",
				svg: {
					'src': require("../../../images/ACLP/16.svg")
				},
				trfData: [],
				cNamedata1: [{
					id: '',
					x: 480,
					y: null,
					color: '#a52a2a',
					value: ''
				}, {
					id: '',
					x: 760,
					y: null,
					color: '#a52a2a',
					value: 'Ia:'
				}, {
					id: '',
					x: 760,
					y: null,
					color: '#a52a2a',
					value: 'Ib:',
				}, {
					id: '',
					x: 760,
					y: null,
					color: '#a52a2a',
					value: 'Ic:',
				}],
				cValuedata1: [{
					id: '',
					x: 780,
					y: null,
					color: 'blue',
					value: ''
				}, {
					id: '',
					x: 780,
					y: null,
					color: 'blue',
					value: '',
				}, {
					id: '',
					x: 780,
					y: null,
					color: 'blue',
					value: '',
				}],
				cNamedata2: [{
					id: '',
					x: 908,
					y: null,
					color: '#a52a2a',
					value: ''
				}, {
					id: '',
					x: 1188,
					y: null,
					color: '#a52a2a',
					value: 'Ia:'
				}, {
					id: '',
					x: 1188,
					y: null,
					color: '#a52a2a',
					value: 'Ib:',
				}, {
					id: '',
					x: 1188,
					y: null,
					color: '#a52a2a',
					value: 'Ib:',
				}],
				cValuedata2: [{
					id: '',
					x: 1208,
					y: null,
					color: 'blue',
					value: ''
				}, {
					id: '',
					x: 1208,
					y: null,
					color: 'blue',
					value: '',
				}, {
					id: '',
					x: 1208,
					y: null,
					color: 'blue',
					value: '',
				}],
				cNamedata3: [{
					id: 'cia46',
					x: 60,
					y: 580,
					color: '#a52a2a',
					value: ''
				}, {
					id: 'cia46',
					x: 60,
					y: 610,
					color: '#a52a2a',
					value: 'Ia:'
				}, {
					id: 'cib46',
					x: 170,
					y: 610,
					color: '#a52a2a',
					value: 'Ib:',
				}, {
					id: 'cic46',
					x: 280,
					y: 610,
					color: '#a52a2a',
					value: 'Ic:',
				}, {
					id: 'uia46',
					x: 60,
					y: 640,
					color: '#a52a2a',
					value: 'Ua:',
				}, {
					id: 'uia46',
					x: 170,
					y: 640,
					color: '#a52a2a',
					value: 'Ub:',
				}, {
					id: 'uia46',
					x: 280,
					y: 640,
					color: '#a52a2a',
					value: 'Uc:',
				}, {
					id: 'power46',
					x: 60,
					y: 670,
					color: '#a52a2a',
					value: '功率:'
				}, {
					id: 'power46',
					x: 170,
					y: 670,
					color: '#a52a2a',
					value: '电量:'
				}, {
					id: 'power46',
					x: 60,
					y: 700,
					color: '#a52a2a',
					value: '时间:'
				}],
				cValuedata3: [{
					id: 'cia46',
					x: 80,
					y: 610,
					color: 'blue',
					value: ''
				}, {
					id: 'cib46',
					x: 190,
					y: 610,
					color: 'blue',
					value: '',
				}, {
					id: 'cic46',
					x: 300,
					y: 610,
					color: 'blue',
					value: '',
				}, {
					id: 'uia46',
					x: 90,
					y: 640,
					color: 'blue',
					value: '',
				}, {
					id: 'uia46',
					x: 200,
					y: 640,
					color: 'blue',
					value: '',
				}, {
					id: 'uia46',
					x: 310,
					y: 640,
					color: 'blue',
					value: '',
				}, {
					id: 'power46',
					x: 100,
					y: 670,
					color: 'blue',
					value: ''
				}, {
					id: 'power46',
					x: 210,
					y: 670,
					color: 'blue',
					value: ''
				}, {
					id: 'power46',
					x: 100,
					y: 700,
					color: 'blue',
					value: ''
				}],
				svgData: [],
				data3: '',
				title: '',
				editInlineColumns: [{
						title: '序号',
						key: 'pm_id',
						align: 'center',
						sortable: true
					},
					{
						title: '电表名称',
						align: 'center',
						key: 'pm_name',
					},
					{
						title: 'ia',
						align: 'center',
						key: 'ia',
					},
					{
						title: 'ib',
						align: 'center',
						key: 'ib',
					},
					{
						title: 'ic',
						align: 'center',
						key: 'ic',
					},
					{
						title: '状态',
						align: 'center',
						key: 'status',
						render: (e, params) => {
							const row = params.row;
							const text = row.status == 1 ? "正常" : "离线";
							return e('span', {}, text);
						}
					},
					{
						title: '时间',
						align: 'center',
						key: 'time',
					},
				]
			}
		},
		mounted() {
			this.Init();
			//主svg画布初始化
			var paper = d3.select("#svg-diagram")
				.append("svg")
				.attr("id", "mainSvg")
				.attr("preserveAspectRatio", "none")
				.attr("viewBox", "0 0 1500 1500")
				//class to make it responsive
				.classed("svg-content-responsive", true);
			//画布g初始化
			var g1 = d3.select("#mainSvg")
				.append("g")
				.attr("id", "diaSvg")
				.attr("width", 1500)
				.attr("height", 1500);

			d3.xml(this.svg.src, function(error, xml) {
				if(error) throw error;
				var importedNode = document.importNode(xml.documentElement, true);
				g1.node().appendChild(importedNode);
			});

		},
		methods: {
			//搜索触发函数	
			handleSearch1() {
				if(this.searchConName1 == "") {
					this.trfData = this.historyData.slice(0, this.pageSize);
				} else {

					this.trfData = this.historyData;
					this.trfData = this.search(this.trfData, {
						pm_name: this.searchConName1
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
			//分页函数
			changePage(index) {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				var _start = (index - 1) * this.pageSize;
				var _end = index * this.pageSize;
				this.trfData = this.historyData.slice(_start, _end);
			},
			Init() {
				const num = 8;
				const copy = this;
				//初始化页面的数据
				this.$http.get(Api.url + 'pdms/monitor/getMonitorAsTrf/14', {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(response => {
						copy.title = response.data.data.title;
						copy.historyData = response.data.data.pm;
						//console.log(copy.historyData);

						copy.dataCount = copy.historyData.length;
						// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
						if(copy.historyData.length < copy.pageSize) {
							copy.trfData = copy.historyData;
						} else {
							copy.trfData = copy.historyData.slice(0, copy.pageSize);
						}
						copy.data3 = response.data.data.jxg[0];
						copy.cNamedata3[0].value = copy.data3.pm_name;
						//数值绑定
						copy.cValuedata3[0].value = copy.data3.ia;
						copy.cValuedata3[1].value = copy.data3.ib;
						copy.cValuedata3[2].value = copy.data3.ic;
						copy.cValuedata3[3].value = copy.data3.ua;
						copy.cValuedata3[4].value = copy.data3.ub;
						copy.cValuedata3[5].value = copy.data3.uc;
						copy.cValuedata3[6].value = copy.data3.power;
						copy.cValuedata3[7].value = copy.data3.degree;
						copy.cValuedata3[8].value = copy.data3.time;
						//console.log(copy.cValuedata3);

						//名称g初始化
						var nameG = d3.select("#mainSvg")
							.append("g")
							.attr("id", "nameG")
							.attr("width", 1500)
							.attr("height", 1500);
						//数值g初始化
						var valueG = d3.select("#mainSvg")
							.append("g")
							.attr("id", "valueG")
							.attr("width", 1500)
							.attr("height", 1500);
						//console.log(nameG);

						var initNameG = nameG.selectAll("text").data(this.cNamedata3)
							.enter()
							.append("text")
							.text(function(d) {
								return d.value
							})
							.style("font-size", '14px')
							.attr("id", function(d) {
								return d.id;
							})
							.attr("x", function(d) {
								return d.x;
							})
							.attr("y", function(d) {
								return d.y;
							})
							.attr("fill", function(d) {
								return d.color;
							});
						var initValueG = valueG.selectAll("text").data(this.cValuedata3)
							.enter()
							.append("text")
							.text(function(d) {
								return d.value
							})
							.style("font-size", '14px')
							.attr("id", function(d) {
								return d.id;
							})
							.attr("x", function(d) {
								return d.x;
							})
							.attr("y", function(d) {
								return d.y;
							})
							.attr("fill", function(d) {
								return d.color;
							});

						copy.svgData = response.data.data.pm;
						for(var i = 0; i < copy.svgData.length; i++) {
							if(i < num) {
								copy.cNamedata1[0].id = 'c' + copy.svgData[i].pm_id;
								copy.cNamedata1[0].y = 147 + (i - 1) * 66;
								copy.cNamedata1[0].value = copy.svgData[i].pm_name;

								if(copy.svgData[i].pm_type==3 || copy.svgData[i].pm_type==4) {
									copy.cNamedata1[1].id = 'cia' + i;
									copy.cNamedata1[1].y = 147 + (i - 1) * 66;
									copy.cNamedata1[2].id = 'cib' + i;
									copy.cNamedata1[2].y = 147 + 20 + (i - 1) * 66;
									copy.cNamedata1[3].id = 'cic' + i;
									copy.cNamedata1[3].y = 147 + 40 + (i - 1) * 66;
									//数值绑定
									if(copy.svgData[i].status == 1) {
										copy.cValuedata1[0].y = 147 + (i - 1) * 66;
										copy.cValuedata1[0].value = copy.svgData[i].ia;
										copy.cValuedata1[0].color = "blue";

										copy.cValuedata1[1].y = 147 + 20 + (i - 1) * 66;
										copy.cValuedata1[1].value = copy.svgData[i].ib;
										copy.cValuedata1[1].color = "blue";

										copy.cValuedata1[2].y = 147 + 40 + (i - 1) * 66;
										copy.cValuedata1[2].value = copy.svgData[i].ic;
										copy.cValuedata1[2].color = "blue";
									} else {
										copy.cValuedata1[0].y = 147 + (i - 1) * 66;
										copy.cValuedata1[0].value = copy.svgData[i].ia;
										copy.cValuedata1[0].color = "grey";

										copy.cValuedata1[1].y = 147 + 20 + (i - 1) * 66;
										copy.cValuedata1[1].value = copy.svgData[i].ib;
										copy.cValuedata1[1].color = "grey";

										copy.cValuedata1[2].y = 147 + 40 + (i - 1) * 66;
										copy.cValuedata1[2].value = copy.svgData[i].ic;
										copy.cValuedata1[2].color = "grey";
									}
								}
								//名称g初始化
								var nameG = d3.select("#mainSvg")
									.append("g")
									.attr("id", "nameG")
									.attr("width", 1500)
									.attr("height", 1500);
								//数值g初始化
								var valueG = d3.select("#mainSvg")
									.append("g")
									.attr("id", "valueG")
									.attr("width", 1500)
									.attr("height", 1500);
								//console.log(nameG);
								var initNameG = nameG.selectAll("text").data(copy.cNamedata1)
									.enter()
									.append("text")
									.text(function(d) {
										return d.value
									})
									.style("font-size", '14px')
									.attr("id", function(d) {
										return d.id;
									})
									.attr("x", function(d) {
										return d.x;
									})
									.attr("y", function(d) {
										return d.y;
									})
									.attr("fill", function(d) {
										return d.color;
									});
								var initValueG = valueG.selectAll("text").data(copy.cValuedata1)
									.enter()
									.append("text")
									.text(function(d) {
										return d.value
									})
									.style("font-size", '14px')
									.attr("x", function(d) {
										return d.x;
									})
									.attr("y", function(d) {
										return d.y;
									})
									.attr("fill", function(d) {
										return d.color;
									});
							} else {
								copy.cNamedata2[0].id = 'c' + copy.svgData[i].pm_id;
								copy.cNamedata2[0].y = 80 + (i - num) * 66;
								copy.cNamedata2[0].value = copy.svgData[i].pm_name;
								if(copy.svgData[i].pm_type==3 || copy.svgData[i].pm_type==4) {
									copy.cNamedata2[1].id = 'cia' + i;
									copy.cNamedata2[1].y = 82 + (i - num) * 66;
									copy.cNamedata2[2].id = 'cib' + i;
									copy.cNamedata2[2].y = 82 + 20 + (i - num) * 66;
									copy.cNamedata2[3].id = 'cic' + i;
									copy.cNamedata2[3].y = 82 + 40 + (i - num) * 66;

									//数值绑定
									if(copy.svgData[i].status == 1) {

										copy.cValuedata2[0].y = 82 + (i - num) * 66;
										copy.cValuedata2[0].value = copy.svgData[i].ia;
										copy.cValuedata2[0].color = "blue";

										copy.cValuedata2[1].y = 82 + 20 + (i - num) * 66;
										copy.cValuedata2[1].value = copy.svgData[i].ib;
										copy.cValuedata2[1].color = "blue";

										copy.cValuedata2[2].y = 82 + 40 + (i - num) * 66;
										copy.cValuedata2[2].value = copy.svgData[i].ic;
										copy.cValuedata2[2].color = "blue";
									} else {
										copy.cValuedata2[0].y = 82 + (i - num) * 66;
										copy.cValuedata2[0].value = "离线";
										copy.cValuedata2[0].color = "grey";

										copy.cValuedata2[1].y = 82 + 20 + (i - num) * 66;
										copy.cValuedata2[1].value = "离线";
										copy.cValuedata2[1].color = "grey";

										copy.cValuedata2[2].y = 82 + 40 + (i - num) * 66;
										copy.cValuedata2[2].value = "离线";
										copy.cValuedata2[2].color = "grey";
									}

								}
								//名称g初始化
								var nameG = d3.select("#mainSvg")
									.append("g")
									.attr("id", "nameG")
									.attr("width", 1500)
									.attr("height", 1500);
								//数值g初始化
								var valueG = d3.select("#mainSvg")
									.append("g")
									.attr("id", "valueG")
									.attr("width", 1500)
									.attr("height", 1500);
								//console.log(nameG);
								var initNameG = nameG.selectAll("text").data(copy.cNamedata2)
									.enter()
									.append("text")
									.text(function(d) {
										return d.value
									})
									.style("font-size", '14px')
									.attr("id", function(d) {
										return d.id;
									})
									.attr("x", function(d) {
										return d.x;
									})
									.attr("y", function(d) {
										return d.y;
									})
									.attr("fill", function(d) {
										return d.color;
									});
								var initValueG = valueG.selectAll("text").data(copy.cValuedata2)
									.enter()
									.append("text")
									.text(function(d) {
										return d.value
									})
									.style("font-size", '14px')
									.attr("x", function(d) {
										return d.x;
									})
									.attr("y", function(d) {
										return d.y;
									})
									.attr("fill", function(d) {
										return d.color;
									});
							}
						}
						copy.Click();
					})
					.catch(error => {
						console.log(error);
					})
			},
			Click() {
				const copy = this;
				console.log(this.svgData.length);
				for(let i = 0; i < this.svgData.length; i++) {
					$('#c' + this.svgData[i].pm_id).click(function() {
						copy.pmTitle = copy.svgData[i].pm_name;
						copy.ModalBool = true;
						let date = new Date();
						let year = date.getFullYear(); //获取当前年份   
						let mon = date.getMonth() + 1; //获取当前月份   
						let day = date.getDate(); //获取当前日
						let nextday = date.getDate() + 1;
						//let start = '2017-12-1';
						//let stop = '2017-12-2';
						let start = year + '-' + mon + '-' + day;
						let stop = year + '-' + mon + '-' + nextday;
						console.log(start);
						console.log(stop);
						var myChartI = copy.$echarts.init(document.getElementById('myChartI'));
						var myChartU = copy.$echarts.init(document.getElementById('myChartU'));
						var myChartW = copy.$echarts.init(document.getElementById('myChartW'));

						var id = copy.svgData[i].pm_id;

						copy.$http.get(Api.url + 'pdms/historyData/getPmHistoryData/' + id + '/h/' + start + '/' + stop, {
							headers: {
								Authorization: "Bearer " + localStorage.getItem("access_token")
							}
						})
						.then(response => {
							console.log(response.data);
							myChartI.setOption({
								//              title: {
								//                text: response.data.data.iaibic_title
								//              },
								tooltip: {
									trigger: "axis"
								},
								calculable: true,
								legend: {
									data: ["ia", "ib", "ic"]
								},
								color: ["#23B8BC", "#005059", "#EE7449", "#AAD1DA"],
								grid: {
									top: '15%',
									left: '1%',
									right: '5%',
									containLabel: true
								},
								xAxis: {
									type: "category",
									data: response.data.data.time,
									axisLabel: {
										rotate: -30, //-30度角倾斜显示  
									}
								},
								yAxis: {
									name: response.data.data.iaibic_y,
									type: 'value',
									axisLabel: {
										formatter: '{value} A'
									}
								},
								series: [{
									name: "ia",
									type: "line",
									data: response.data.data.ia,
								}, {
									name: "ib",
									type: "line",
									data: response.data.data.ib,
								}, {
									name: "ic",
									type: "line",
									data: response.data.data.ic,
								}]
							});
							myChartU.setOption({
								//              title: {
								//                text: response.data.data.uaubuc_title
								//              },
								tooltip: {
									trigger: "axis"
								},
								calculable: true,
								legend: {
									data: ["ua", "ub", "uc"]
								},
								color: ["#23B8BC", "#005059", "#EE7449", "#AAD1DA"],
								grid: {
									top: '15%',
									left: '1%',
									right: '5%',
									containLabel: true
								},
								xAxis: {
									type: "category",
									data: response.data.data.time,
									axisLabel: {
										rotate: -30, //-30度角倾斜显示  
									}
								},
								yAxis: {
									name: response.data.data.uaubuc_y,
									type: 'value',
									axisLabel: {
										formatter: '{value} V'
									}
								},
								series: [{
									name: "ua",
									type: "line",
									data: response.data.data.ua,
								}, {
									name: "ub",
									type: "line",
									data: response.data.data.ub,
								}, {
									name: "uc",
									type: "line",
									data: response.data.data.uc,
								}]
							});
							myChartW.setOption({
								//              title: {
								//                text: response.data.data.power_title
								//              },
								tooltip: {
									trigger: "axis"
								},
								calculable: true,
								legend: {
									data: ["功率"]
								},
								color: ["#23B8BC", "#005059", "#EE7449", "#AAD1DA"],
								grid: {
									top: '15%',
									left: '1%',
									right: '5%',
									containLabel: true
								},
								xAxis: {
									type: "category",
									data: response.data.data.time,
									axisLabel: {
										rotate: -30, //-30度角倾斜显示  
									}
								},
								yAxis: {
									name: response.data.data.power_y,
									type: 'value',
									axisLabel: {
										formatter: '{value} W'
									}
								},
								series: [{
									name: "功率",
									type: "line",
									data: response.data.data.power,
								}]
							});
							document.window.resize(function() {
								//重置容器高宽
								myChartI.resize();
							});

						})
						.catch(error => {
							console.log(error);
						})
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>

</style>