<template>
	<div>
		<Row class="margin-top-10">
			<Col :lg="24">
	            <Card>
	                <p slot="title">
		                <Icon type="social-buffer"></Icon>其他扣费
				    </p>
				    <Row>
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
				        <Button type="info" style="margin-left: 20px;" @click="Refer">查询</Button>
				    </Row>
	            </Card>
	        </Col>
		</Row>
		<Row class="margin-top-10">
			<Col :lg="24">
	            <Card>
					<div class="exportable-table-download-con1" style="margin-bottom: 10px;">
						<span style="margin-right: 16px;"><Button type="primary" size="large" @click="exportData()"><Icon type="ios-download-outline"></Icon> 导出数据（Csv格式）</Button></span>
						<span style="margin-right: 16px;"><a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a><Button type="primary" size="large" @click="exportExcel()"><Icon type="ios-download-outline"></Icon> 导出数据（Excel格式）</Button></span>
					</div>
					<div class="edittable-table-height-con">
			            <Table border refs="table" :data="detailsAllData" v-model="detailsAllData"  :columns="editInlineColumns" ></Table>
			            <Table ref="table" style="display: none;" :data="historyData" v-model="historyData" :columns="editInlineColumns"></Table>
			        </div>
			        <div style="padding: 20px;overflow: hidden">
						<div style="float: right;">
							<Page :total="dataCount" :current="1" @on-change="changePage" show-elevator></Page>
						</div>
					</div>
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
		name: 'detailOther',
	    data () {
	    	return {
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
		    	detailsAllData: [],
		    	editInlineColumns: [
		    		{
		    			title: 'ID',
				        key: 'id',
				        align: 'center',
				        width: '6%',
				        sortable: true
		    		}, {
		    			title: '客户名称',
				        key: 'customerName',
				        width: '15%',
				        align: 'center',
		    		}, {
		    			title: '日期',
				        key: 'date',
				        align: 'center',
				    }, {
		    			title: '金额',
				        key: 'bal',
				        align: 'center',
				    }, {
		    			title: '剩余金额',
				        key: 'aval_bal',
				        align: 'center',
				    }, {
		    			title: '操作人员',
				        key: 'userName',
				        align: 'center',
				    }, {
				    	title: '描述',
				        key: 'description',
				        align: 'center',
				        render:(h, params) => {
				        	const row = params.row;
                            const text = row.description == null ? '-' : row.description != null ? row.description : '';
                            return h('span', {
                            }, text);
				        }
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
	    	//获取其他扣费的信息
	    	Init () {
	    		const copy = this;
	    		this.$http.get(Api.url + 'hems/consumes/getOtherConsumes/' + Api.rmId, {
	    			headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
	    		})
	    		.then(response => {
	    			//console.log(response.data.data);
	    			copy.historyData = response.data.data;
				
					copy.dataCount = copy.historyData.length;
	                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
	                if(copy.historyData.length < copy.pageSize){
	                    copy.detailsAllData = copy.historyData;
	                }else{
	                    copy.detailsAllData = copy.historyData.slice(0,copy.pageSize);
	                }
		    	})
	    		.catch(error => {
	    			console.log(error);
	    		})
	    	},
	    	//按日期查询
	    	Refer () {
	    		const copy = this;
	    		const start = this.FormatDate(this.startTime);
	    		const stop = this.FormatDate(this.stopTime);
	    		this.$http.get(Api.url + 'hems/consumes/getOtherConsumes/' + Api.rmId + '/' + start + '/' + stop, {
	    			headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
	    		})
	    		.then(response => {
	    			//console.log(response.data.data);
	    			copy.historyData = response.data.data;
				
					copy.dataCount = copy.historyData.length;
	                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
	                if(copy.historyData.length < copy.pageSize){
	                    copy.detailsAllData = copy.historyData;
	                }else{
	                    copy.detailsAllData = copy.historyData.slice(0,copy.pageSize);
	                }
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
					filename: '其他扣费'
				});

			},
			//导出数据xls格式
			exportExcel() {
				table2excel.transform(this.$refs.table, 'hrefToExportTable', '其他扣费');
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