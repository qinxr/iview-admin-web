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
				          建筑物管理
				    <router-link to="/Pdms/hgpd/projectManagement/buildingsAdd" class="hexs-add">
				    	<Button type="info" style="margin-left: 20px;">
				    	<Icon type="plus-round"></Icon>&nbsp;&nbsp;
				    	建筑物新增
				    	</Button>
				    </router-link>
			    </p>
                <div class="edittable-table-height-con">
                    <Table border refs="table" :data="buildingsData" v-model="buildingsData"  :columns="editInlineColumns" ></Table>
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
		//name: 'hgpdBuildings',
		data () {
			return {
				pageSize:10,//每页显示的数据量
				dataCount:0,//初始化总数据量
				historyData: [],//存所有数据
				buildingsData: [],
				buildingsId: '',
				ModalBool: false,
				editInlineColumns: [
				    {
				        title: 'ID',
				        key: 'id',
				        align: 'center',
				        width: '5%',
				        sortable: true
				    },
				    {
				        title: '名称',
				        align: 'center',
				        key: 'name',
				    },
				    {
				        title: '所属区域名称',
				        align: 'center',
				        key: 'regionName',
				    },
				    {
				        title: '描述',
				        align: 'center',
				        key: 'description',
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
		                                    //console.log(argu);
		                                    this.$router.push({
		                                        name: 'hgpdBuildingsEdit',
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
		                                    this.buildingsId = argu.id;
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
			//获取建筑物信息
			this.$http.get(Api.url + 'pdms/buildings/getBuildingAsProject/' + Api.pdId, {
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
                    copy.buildingsData = copy.historyData;
                }else{
                    copy.buildingsData = copy.historyData.slice(0,copy.pageSize);
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
                this.buildingsData = this.historyData.slice(_start,_end);
			},
			//删除建筑物信息
			Remove () {
				const copy = this;
				this.$http.post(Api.url + 'pdms/buildings/deleteBuilding', {
					buildingId: copy.buildingsId
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
	                    copy.buildingsData = copy.historyData;
	                }else{
	                    copy.buildingsData = copy.historyData.slice(0,copy.pageSize);
	                }
					copy.buildingsId = '';
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
	.hexs-add {
		color: #fff;
	}
	.ivu-card-head p{
		height: 32px;
		font-size: 22px;
		font-family: "微软雅黑";
		font-weight: 500;
	}
</style>