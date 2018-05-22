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
				           项目权限管理
				    <router-link to="/super-admin/projectRightsAdd" class="project-add">
				    	<Button type="info" style="margin-left: 20px;">
				    		<Icon type="plus-round"></Icon>&nbsp;&nbsp;项目权限新增
				    	</Button>
				    </router-link>
			    </p>
                <div class="edittable-table-height-con">
                    <Table border refs="table" :data="projectRightsData" v-model="projectRightsData"  :columns="editInlineColumns" ></Table>
                </div>
                <div style="padding: 20px;overflow: hidden">
					<div style="float: right;">
						<Page :total="dataCount" :current="1" @on-change="changePage" show-elevator></Page>
					</div>
				</div>
            </Card>
        </Col>
    </Row>
</template>

<script>
	export default {
		name: 'projectRights',
		data () {
			return {
				pageSize:10,//每页显示的数据量
				dataCount:0,//初始化总数据量
				historyData: [],//存所有数据
				projectRightsData : [],
				projectRightsId: '',
				ModalBool: false,
				editInlineColumns: [
				    {
				        title: 'ID',
				        key: 'id',
				        align: 'center',
				        sortable: true
				    },
				    {
				        title: '用户名称',
				        align: 'center',
				        key: 'userName',
				    },
				    {
				        title: '项目名称',
				        align: 'center',
				        key: 'projectName',
				    },
				    {
				        title: '浏览',
				        align: 'center',
				        key: 'read',
				        render:(h, params) => {
				        	const row = params.row;
                            const text = row.read == 1 ? '是' : row.read == 2 ? '否' : '';
                            return h('span', {
                            }, text);
				        }
				    },
				    {
				        title: '警告',
				        align: 'center',
				        key: 'warning',
				        render:(h, params) => {
				        	const row = params.row;
                            const text = row.warning == 1 ? '是' : row.warning == 2 ? '否' : '';
                            return h('span', {
                            }, text);
				        }
				    },
				    {
				        title: '控制',
				        align: 'center',
				        key: 'control',
				        render:(h, params) => {
				        	const row = params.row;
                            const text = row.control == 1 ? '是' : row.control == 2 ? '否' : '';
                            return h('span', {
                            }, text);
				        }
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
		                                    this.$router.push({
		                                        name: 'projectRightsEdit',
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
		                                    this.projectRightsId = argu.id;
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
			//获取项目权限信息
			this.$http.get(Api.url + 'sems/projects/getProjectsPrv', {
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
                    copy.projectRightsData = copy.historyData;
                }else{
                    copy.projectRightsData = copy.historyData.slice(0,copy.pageSize);
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
                this.projectRightsData = this.historyData.slice(_start,_end);
			},
			//删除项目信息
			Remove () {
				const copy = this;
				this.$http.post(Api.url + 'sems/projects/deleteProjectPrv', {
					prvId: copy.projectRightsId
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
	                    copy.projectRightsData = copy.historyData;
	                }else{
	                    copy.projectRightsData = copy.historyData.slice(0,copy.pageSize);
	                }
					copy.projectRightsId = '';
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
	.project-add {
		color: #fff;
	}
	.ivu-card-head p{
		height: 32px;
		font-size: 22px;
		font-family: "微软雅黑";
		font-weight: 500;
	}
</style>