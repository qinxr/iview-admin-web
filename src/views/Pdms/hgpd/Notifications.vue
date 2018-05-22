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
	                <Icon type="alert-circled"></Icon>
				          告警详情
			    </p>
                <div class="edittable-table-height-con">
                    <Table border refs="table" :data="notificationsData" v-model="notificationsData"  :columns="editInlineColumns" ></Table>
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
		name: 'hgpdnotifications',
		data () {
			return {
				pageSize:10,//每页显示的数据量
				dataCount:0,//初始化总数据量
				historyData: [],//存所有数据
				notificationsData : [],
				notificationsId: '',
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
				        title: 'content',
				        width: '60%',
				        key: 'content',
				        render:(h, params) => {
				        	let text = params.row.content;
				        	let url = params.row.url;
							return h('a', {
								on: {
									click: () => {
										this.$router.push({
											path: url,
										});
									}
								}
							}, text);
				        }
				    },
				    {
				        title: 'read',
				        align: 'center',
				        key: 'is_read',
				        render:(h, params) => {
				        	const row = params.row;
                            const text = row.is_read == 0 ? '未读' :  '已读';
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
		                                type: 'error',
		                                size: 'small',
		                            },
		                            on: {
		                                click: () => {
		                                    let argu = { id: params.row.id };
		                                    this.notificationsId = argu.id;
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
			//获取告警信息
	        this.$http.get(Api.url + 'pdms/notice/getNoticeAsProject/' + Api.pdId, {
	            	headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
	            })
	            .then(response => {
	            	//console.log(response.data.data);
					copy.historyData = response.data.data;
					
					copy.dataCount = copy.historyData.length;
	                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
	                if (copy.historyData.length < copy.pageSize) {
	                    copy.notificationsData = copy.historyData;
	                } else {
	                    copy.notificationsData = copy.historyData.slice(0,copy.pageSize);
	                }
	            })
	            .catch(error => {
	            	console.log(error);
	            });
		},
		methods: {
			//分页功能
			changePage(index) {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.notificationsData = this.historyData.slice(_start,_end);
			},
			//删除项目信息
			Remove () {
				const copy = this;
				this.$http.post(Api.url + 'pdms/notice/deleteNotice', {
					noticeId: copy.notificationsId
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
	                    copy.notificationsData = copy.historyData;
	                }else{
	                    copy.notificationsData = copy.historyData.slice(0,copy.pageSize);
	                }
					copy.notificationsId = '';
					copy.ModalBool = false;
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