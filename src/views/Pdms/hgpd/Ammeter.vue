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
	                <Icon type="social-buffer"></Icon>
				           电表管理
				    <router-link to="/Pdms/hgpd/projectManagement/ammeterAdd" class="pdRoom-add">
				    	<Button type="info" style="margin-left: 20px;">
				    	<Icon type="plus-round"></Icon>&nbsp;&nbsp;
				    	 电表新增
				    	</Button>
				    </router-link>
			    </p>
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
                    <Table border refs="table" :data="ammeterData" v-model="ammeterData"  :columns="editInlineColumns" ></Table>
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
		//name: 'hgpdAmmeter',
		data () {
			return {
				pageSize:20,//每页显示的数据量
				dataCount:0,//初始化总数据量
				historyData: [],//存所有数据
				ammeterData : [],
				ammeterId: '',
				ModalBool: false,
				searchConName1: "",
				editInlineColumns: [
				    {
				        title: 'ID',
				        key: 'id',
				        align: 'center',
				        width: '5%',
				        sortable: true
				    },
				    {
				        title: '电表名称',
				        align: 'center',
				        width: '8%',
				        key: 'name',
				    },
				    {
				        title: '区域',
				        align: 'center',
				        key: 'regionName',
				    },
				    {
				        title: '所属配电室',
				        align: 'center',
				        key: 'roomName',
				    },
				    {
				        title: '所属变压器',
				        align: 'center',
				        key: 'transformerName',
				    },
				    {
				        title: '回路',
				        align: 'center',
				        key: 'circuit',
				    },
				    {
				        title: '位置',
				        align: 'center',
				        width: '8%',
				        key: 'location',
				    },
				    {
				        title: '电流上限',
				        align: 'center',
				        key: 'electric_max',
				    },
				    {
				        title: '功率上限',
				        align: 'center',
				        key: 'power_max',
				    },
				    {
				        title: 'CT变化',
				        align: 'center',
				        key: 'ct_change',
				    },
				    {
				        title: '电表型号',
				        align: 'center',
				        key: 'model',
				    },
				    {
				        title: '厂家',
				        align: 'center',
				        width: '12%',
				        key: 'producer',
				    },
				    {
				        title: '类型',
				        align: 'center',
				        key: 'typeName',
				    },
				    {
				        title: '操作',
				        align: 'center',
				        width: '13%',
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
		                                    this.$router.push({
		                                        name: 'hgpdAmmeterEdit',
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
		                                    this.ammeterId = argu.id;
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
			//获取电表信息
			this.$http.get(Api.url + 'pdms/pm/getPmAsProject/' + Api.pdId, {
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
                    copy.ammeterData = copy.historyData;
                }else{
                    copy.ammeterData = copy.historyData.slice(0,copy.pageSize);
                }
			})
			.catch(error => {
				console.log(error);
			})
		},
		methods: {
			//搜索触发函数	
			handleSearch1() {
				if(this.searchConName1==""){
					this.ammeterData = this.historyData.slice(0, this.pageSize);
				}else{
					
					this.ammeterData = this.historyData;
					this.ammeterData = this.search(this.ammeterData, {
						name: this.searchConName1
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
				var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.ammeterData = this.historyData.slice(_start,_end);
			},
			//删除电表信息
			Remove () {
				const copy = this;
				this.$http.post(Api.url + 'pdms/pm/deletePm', {
					pmId: copy.ammeterId
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
	                    copy.ammeterData = copy.historyData;
	                }else{
	                    copy.ammeterData = copy.historyData.slice(0,copy.pageSize);
	                }
					copy.ammeterId = '';
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