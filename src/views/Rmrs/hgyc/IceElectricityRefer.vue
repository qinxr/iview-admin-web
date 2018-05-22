<template>
	<div>
		<Row class="margin-top-10">
			<Col :lg="24">
	            <Card>
	                <p slot="title">
		                <Icon type="social-buffer"></Icon>冻结电量查询
				    </p>
				    <Row>
				    	<Col span="1">
				    		<span class="time">园区：</span>
				    	</Col>
				    	<Col span="3" style="margin-right: 30px;">
				    		<div>
					    		<Select slot="append" v-model="reginDatas.id" @on-change="GetAmmeter(reginDatas.id)">
						            <Option v-for="item in reginDatas" :key="item.id" :value="item.id">{{item.name}}</Option>
						        </Select>
					        </div>
				    	</Col>
				    	<Col span="1">
				    		<span class="time">电表：</span>
				    	</Col>
				    	<Col span="3" style="margin-right: 30px;">
				    		<div>
					    		<Select slot="append" v-model="ammeterDatas.pm_id">
						            <Option v-for="item in ammeterDatas" :key="item.pm_id" :value="item.pm_id">{{item.pmName}}</Option>
						        </Select>
					        </div>
				    	</Col>
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
				        <Button type="info" style="margin-left: 20px;" @click="Refer(ammeterDatas.pm_id)">查询</Button>
				    </Row>
	            </Card>
	        </Col>
		</Row>
		<Row class="margin-top-10">
			<Col :lg="24">
	            <Card>
	            	<Tabs value="name1">
				        <TabPane label="表格" name="name1">
				        	<div class="exportable-table-download-con1" style="margin-bottom: 10px;">
								<span style="margin-right: 16px;"><Button type="primary" size="large" @click="exportData()"><Icon type="ios-download-outline"></Icon> 导出数据（Csv格式）</Button></span>
								<span style="margin-right: 16px;"><a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a><Button type="primary" size="large" @click="exportExcel()"><Icon type="ios-download-outline"></Icon> 导出数据（Excel格式）</Button></span>
							</div>
							<div class="edittable-table-height-con">
					            <Table border refs="table" :data="iceElectricityData" v-model="iceElectricityData"  :columns="editInlineColumns" ></Table>
					            <Table ref="table" style="display: none;" :data="historyData" v-model="historyData" :columns="editInlineColumns"></Table>
					        </div>
					        <div style="padding: 20px;overflow: hidden">
								<div style="float: right;">
									<Page :total="dataCount" :current="1" @on-change="changePage" show-elevator></Page>
								</div>
							</div>
				        </TabPane>
				        <TabPane label="柱状图" name="name2">
				        	<div id="echarts">
								<div id="myChart" :style="{width: '100%', height: '600px'}"></div>
							</div>
				        </TabPane>
				    </Tabs>
			  </Card>
	        </Col>
		</Row>
	</div>
</template>

<script>
	import {formatDate} from '@/date/date.js'
	import { table2csvData, csvColumns } from './data/table2csv.js';
	import { table2excelData, excelColumns } from './data/table2excel.js';
	import table2excel from '@/libs/table2excel.js';
	export default {
		name: 'iceElectricityRefer',
	    data () {
	    	return {
	    		reginDatas: [],
	    		ammeterDatas: [],
	    		pageSize:10,//每页显示的数据量
				dataCount:0,//初始化总数据量
				historyData: [],//存所有数据
				startTime: '',
				stopTime: '',
		    	options1: {
	                shortcuts: [
	                    {
	                        text: '今天',
	                        value () {
	                            return new Date();
	                        },
	                    }
	                ]
	            },
		    	iceElectricityData: [],
		    	editInlineColumns: [
		    		{
		    			title: '冻结时间',
				        key: 'measuretime',
				        align: 'center',
		    		}, {
		    			title: '表底数',
				        key: 'transformer_ratio',
				        align: 'center',
		    		}, {
		    			title: '冻结电量',
				        key: 'rea_pp',
				        align: 'center',
				    }, {
		    			title: '抄读时间',
				        key: 'dt_edit',
				        align: 'center',
				    }
		    	]
	    	}
	    },
	    mounted () {
	    	this.Init();
	    },
	    methods: {
	    	//分页功能
	    	changePage(index) {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.detailsAllData = this.historyData.slice(_start,_end);
			},
	    	//获取园区和电表信息
	    	Init () {
	    		const copy = this;
	    		//园区
	    		this.$http.get(Api.url + 'hems/regions/getRegionAsProject/' + Api.rmId, {
	    			headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
	    		})
	    		.then(response => {
	    			console.log(response.data.data);
	    			copy.reginDatas = response.data.data;
		    	})
	    		.catch(error => {
	    			console.log(error);
	    		});
	    	},
	    	//按日期查询
	    	Refer (pm_id) {
	    		const copy = this;
	    		const start = this.FormatDate(this.startTime);
	    		const stop = this.FormatDate(this.stopTime);
	    		let myChart = this.$echarts.init(document.getElementById('myChart'));
	    		this.$http.get(Api.url + 'hems/meter/getPeriodEnergyQuery/' + pm_id + '/' + start + '/' + stop, {
	    			headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
	    		})
	    		.then(response => {
	    			//console.log(response.data.data);
	    			copy.historyData = response.data.data.period_energys;
				
					copy.dataCount = copy.historyData.length;
	                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
	                if(copy.historyData.length < copy.pageSize){
	                    copy.iceElectricityData = copy.historyData;
	                }else{
	                    copy.iceElectricityData = copy.historyData.slice(0,copy.pageSize);
	                }
	                //折线图
					myChart.setOption({
						title: {
							text: response.data.data.charts_title
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							data: response.data.data.charts_legend
						},
						color: ["#23B8BC", "#005059", "#EE7449", "#AAD1DA"],
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						toolbox: {
							feature: {
								saveAsImage: {}
							}
						},
						xAxis: {
							type: response.data.data.charts_xAxis_type,
							boundaryGap: false,
							data: response.data.data.charts_xAxis_data,
							axisLabel: {
								interval: 0, //横轴信息全部显示  
								rotate: 50, //-30度角倾斜显示  
							}
						},
						yAxis: {
							type: response.data.data.charts_yAxis_type,

						},
						series: [{
								name: response.data.data.charts_legend,
								type: response.data.data.charts_y1_type,
								stack: response.data.data.charts_y1_stack,
								data: response.data.data.charts_y1_data,
								symbol: 'circle',
								symbolSize: 5, //拐点大小
								itemStyle: {
									normal: {
										label: {
											show: true
										}
									}
								},
							}

						]
					});
					$("#myChart").css("width", "100%");
					window.addEventListener("resize", function() {
						myChart.resize();

					});
	    		})
	    		.catch(error => {
	    			console.log(error);
	    		})
	    	},
	    	//转换日期格式
	    	FormatDate(time){
	            let date = new Date(time);
	            return formatDate(date,'yyyy-MM-dd');
	            //此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
	       },
	       //导出数据Csv格式
			exportData() {
				this.$refs.table.exportCsv({
					filename: '冻结电量数据表'
				});

			},
			//导出数据xls格式
			exportExcel() {
				table2excel.transform(this.$refs.table, 'hrefToExportTable', '冻结电量数据表');
			},
			//获取园区对应的电表信息
			GetAmmeter (regionId) {
				const copy = this;
				this.$http.get(Api.url + 'hems/meter/getPmsIdNameAsRegion/' + regionId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(response => {
					//console.log(response.data.data);
					copy.ammeterDatas = response.data.data;
				})
				.catch(error => {
					console.log(error);
				})
			},
	    }
	}
	
</script>

<style lang="less" scoped>
	.time{
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