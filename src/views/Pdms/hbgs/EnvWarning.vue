<template>
	<Row class="margin-top-10">
		<Modal v-model="ModalBool" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除确认</span>
          </p>
          <div style="text-align:center">
            <p><h1>确定删除?</h1></p>
          </div>
          <div slot="footer">
            <Button type="error" size="large" long  @click="Remove()">删除</Button>
          </div>
        </Modal>
        <Col :lg="24">
            <Card>
                <p slot="title">
	                <Icon type="ivu-icon ivu-icon-alert-circled"></Icon>
				           环境告警订阅
				    <router-link to="/Pdms/hbgs/projectManagement/envWarningAdd" class="pdRoom-add">
				    	<Button type="info" style="margin-left: 20px;">
				    	<Icon type="plus-round"></Icon>&nbsp;&nbsp;
				    	 环境告警新增
				    	</Button>
				    </router-link>
			    </p>
                <div class="edittable-table-height-con">
                    <Table border refs="table" :data="envWarningData" v-model="envWarningData"  :columns="editInlineColumns" ></Table>
                </div>
                <div style="padding: 20px;overflow: hidden">
					<div style="float: right;">
						<Page :page-size="pageSize" :total="dataCount" :current="1" @on-change="changePage" show-elevator></Page>
					</div>
				</div>
            </Card>
        </Col>
    </Row>
</template>

<script>
	export default {
		//name: 'hbgsEnvWarning',
		data () {
			return {
				pageSize:10,//每页显示的数据量
				dataCount:0,//初始化总数据量
				historyData: [],//存所有数据
				envWarningData : [],
				envWarningId: '',
				ModalBool: false,
				editInlineColumns: [
				    {
				        title: 'ID',
				        key: 'id',
				        align: 'center',
				        sortable: true
				    },
				    {
				        title: '区域名称',
				        align: 'center',
				        key: 'regionName',
				    },
				    {
				        title: '配电室名称',
				        align: 'center',
				        key: 'roomName',
				    },
				    {
				        title: '设备',
				        align: 'center',
				        key: 'envName',
				    },
				    {
				        title: '监测参数',
				        align: 'center',
				        key: 'colomn',
				    },
				    {
				        title: '规则',
				        align: 'center',
				        key: 'rule_operator',
				    },
				    {
				        title: '阈值',
				        align: 'center',
				        key: 'threshold',
				    },
				    {
				        title: '操作',
				        align: 'center',
				        key: 'handle',
				        render: (h, params) => {
	                        return h('div', [
	                        	h('Button', {
		                            props: {
		                                type: 'info',
		                                size: 'small',
		                            },
		                            on: {
		                                click: () => {
		                                    let argu = { id: params.row.id };
		                                    console.log(argu);
		                                    this.$router.push({
		                                        name: 'hbgsEnvWaringEdit',
		                                        params: argu
		                                    });
		                                }
		                            }
		                        }, '编辑'),
		                        h('span', {},' '),
		                        h('Button', {
		                            props: {
		                                type: 'error',
		                                size: 'small',
		                            },
		                            on: {
		                                click: () => {
		                                    let argu = { id: params.row.id };
		                                    this.envWarningId = argu.id;
		                                    this.ModalBool = true;
		                                    //console.log(this.projectId);
		                                }
		                            }
		                        }, '删除'),
	                        ])
	                        	
	                    }
				    },
				]
			}
		},
		mounted () {
			const copy = this;
			//获取电表告警信息
			this.$http.get(Api.url + 'pdms/envWarningSub/getEnvWarningSubAsProject/' + Api.hbgsId, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("access_token")
				},
			})
			.then(response => {
				//console.log(response.data.data);
				copy.historyData = response.data.data;
				
				copy.dataCount = copy.historyData.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(copy.historyData.length < copy.pageSize){
                    copy.envWarningData = copy.historyData;
                }else{
                    copy.envWarningData = copy.historyData.slice(0,copy.pageSize);
                }
			})
			.catch(error => {
				console.log(error);
			})
		},
		methods: {
			//分页功能
			changePage(index) {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.envWarningData = this.historyData.slice(_start,_end);
			},
			//删除电表告警信息
			Remove () {
				const copy = this;
				this.$http.post(Api.url + 'pdms/envWarningSub/deleteEnvWarningSub', {
					envWarningSubId: copy.envWarningId
				}, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response => {
					//console.log(response.data);
					copy.historyData = response.data.data;
				
					copy.dataCount = copy.historyData.length;
	                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
	                if(copy.historyData.length < copy.pageSize){
	                    copy.envWarningData = copy.historyData;
	                }else{
	                    copy.envWarningData = copy.historyData.slice(0,copy.pageSize);
	                }
					copy.envWarningId = '';
					if(response.data.head == 200) {
						copy.ModalBool = false;
						copy.$Message.success(response.data.message);
					}
				})
				.catch(error => {
					console.log(error);
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.pdRoom-add {
		color: #fff;
	}
	.ivu-card-head p{
		height: 32px;
		font-size: 22px;
		font-family: "微软雅黑";
		font-weight: 500;
	}
</style>