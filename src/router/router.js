import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
	path: '/login',
	name: 'login',
	meta: {
		title: 'Login - 登录'
	},
	component: () =>
		import('@/views/login.vue')
};

export const page404 = {
	path: '/*',
	name: 'error-404',
	meta: {
		title: '404-页面不存在'
	},
	component: () =>
		import('@/views/error-page/404.vue')
};

export const page403 = {
	path: '/403',
	meta: {
		title: '403-权限不足'
	},
	name: 'error-403',
	component: () =>
		import('@//views/error-page/403.vue')
};

export const page500 = {
	path: '/500',
	meta: {
		title: '500-服务端错误'
	},
	name: 'error-500',
	component: () =>
		import('@/views/error-page/500.vue')
};

//项目选择
export const projectChoose = {
	path: '/project-choose',
	name: 'project-choose',
	meta: {
		title: '选择项目'
	},
	component: () =>
		import('@/views/project-choose/ProjectChoose.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
	path: '/',
	name: 'otherRouter',
	redirect: '/home',
	component: Main,
	children: [{
			path: 'home',
			title: {
				i18n: 'home'
			},
			name: 'home_index',
			component: () =>
				import('@/views/home/home.vue')
		},
		{
			path: 'ownspace',
			title: '个人中心',
			name: 'ownspace_index',
			component: () =>
				import('@/views/own-space/own-space.vue')
		},
		//超级管理员super-admin
		{
			path: 'super-admin/projectAdd',
			title: '项目新增',
			name: 'projectAdd',
			component: () =>
				import('@/views/super-admin/ProjectAdd.vue')
		},
		{
			path: 'super-admin/userAdd',
			title: '用户新增',
			name: 'userAdd',
			component: () =>
				import('@/views/super-admin/UserAdd.vue')
		},
		{
			path: 'super-admin/userEdit/:id',
			title: '用户编辑',
			name: 'userEdit',
			component: () =>
				import('@/views/super-admin/UserEdit.vue')
		},
		{
			path: 'super-admin/projectEdit/:id',
			title: '项目编辑',
			name: 'projectEdit',
			component: () =>
				import('@/views/super-admin/ProjectEdit.vue')
		},
		{
			path: 'super-admin/projectTypeAdd',
			title: '项目类型新增',
			name: 'projectTypeAdd',
			component: () =>
				import('@/views/super-admin/ProjectTypeAdd.vue')
		},
		{
			path: 'super-admin/projectTypeEdit/:id',
			title: '修改项目类型',
			name: 'projectTypeEdit',
			component: () =>
				import('@/views/super-admin/ProjectTypeEdit.vue')
		},
		{
			path: 'super-admin/deviceTypeAdd',
			title: '设备新增',
			name: 'deviceAdd',
			component: () =>
				import('@/views/super-admin/DeviceTypeAdd.vue')
		},
		{
			path: 'super-admin/deviceTypeEdit',
			title: '设备类型编辑',
			name: 'deviceEdit',
			component: () =>
				import('@/views/super-admin/DeviceTypeEdit.vue')
		},
		{
			path: 'super-admin/projectRightsAdd',
			title: '项目权限新增',
			name: 'projectRightsAdd',
			component: () =>
				import('@/views/super-admin/ProjectRightsAdd.vue')
		},
		{
			path: 'super-admin/projectRightsEdit/:id',
			title: '项目权限编辑',
			name: 'projectRightsEdit',
			component: () =>
				import('@/views/super-admin/ProjectRightsEdit.vue')
		},
		{
			path: 'super-admin/coursesAdd',
			title: '费用科目新增',
			name: 'coursesAdd',
			component: () =>
				import('@/views/super-admin/CoursesAdd.vue')
		},
		{
			path: 'super-admin/coursesEdit/:id',
			title: '费用科目编辑',
			name: 'coursesEdit',
			component: () =>
				import('@/views/super-admin/CoursesEdit.vue')
		},
		{
			path: 'super-admin/regionAdd',
			title: '区域新增',
			name: 'regionAdd',
			component: () =>
				import('@/views/super-admin/RegionAdd.vue')
		},
		{
			path: 'super-admin/regionEdit/:id',
			title: '区域信息编辑',
			name: 'regionEdit',
			component: () =>
				import('@/views/super-admin/RegionEdit.vue')
		},
		{
			path: 'super-admin/ammeterPreserveEdit/:id',
			title: '电表维护修改',
			name: 'ammeterPreserveEdit',
			component: () =>
				import('@/views/super-admin/AmmeterPreserveEdit.vue')
		},
		{
			path: 'super-admin/rmrsUserAdd',
			title: '抄表客户新增',
			name: 'rmrsUserAdd',
			component: () =>
				import('@/views/super-admin/RmrsUserAdd.vue')
		},
		{
			path: 'super-admin/rmrsUserEdit/:id',
			title: '抄表客户编辑',
			name: 'rmrsUserEdit',
			component: () =>
				import('@/views/super-admin/RmrsUserEdit.vue')
		},
		{
			path: 'super-admin/rmrsUserPay/:id',
			title: '抄表客户充值',
			name: 'rmrsUserPay',
			component: () =>
				import('@/views/super-admin/RmrsUserPay.vue')
		},
		//抄表项目Rmrs/hgys
		{
			path: 'Rmrs/hgyc/customer/:id',
			title: '客户详情',
			name: 'customer',
			component: () =>
				import('@/views/Rmrs/hgyc/Customer.vue')
		},
		{
			path: 'Rmrs/hgyc/electricity/:id',
			title: '用电量',
			name: 'electricity',
			component: () =>
				import('@/views/Rmrs/hgyc/Electricity.vue')
		},
		{
			path: 'Rmrs/hgyc/iceElectricity/:id',
			title: '冻结电量',
			name: 'iceElectricity',
			component: () =>
				import('@/views/Rmrs/hgyc/IceElectricity.vue')
		},
		{
			path: 'Rmrs/hgyc/passwordChange',
			title: '密码修改',
			name: 'passwordChange',
			component: () =>
				import('@/views/own-space/PasswordChange.vue')
		},
		//配电项目
		{
			path: 'Pdms/hgpd/projectManagement/regionAdd',
			title: '园区新增',
			name: 'hgpdRegionAdd',
			component: () =>
				import('@/views/Pdms/hgpd/RegionAdd.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/regionEdit/:id',
			title: '园区信息编辑',
			name: 'hgpdRegionEdit',
			component: () =>
				import('@/views/Pdms/hgpd/RegionEdit.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/buildingsAdd',
			title: '建筑物新增',
			name: 'hgpdBuildingsAdd',
			component: () =>
				import('@/views/Pdms/hgpd/BuildingsAdd.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/buildingsEdit/:id',
			title: '建筑物信息编辑',
			name: 'hgpdBuildingsEdit',
			component: () =>
				import('@/views/Pdms/hgpd/BuildingsEdit.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/pdRoomAdd',
			title: '配电室新增',
			name: 'hgpdPDRoomAdd',
			component: () =>
				import('@/views/Pdms/hgpd/PDRoomAdd.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/pdRoomEdit/:id',
			title: '配电室信息编辑',
			name: 'hgpdPDRoomEdit',
			component: () =>
				import('@/views/Pdms/hgpd/PDRoomEdit.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/transformerAdd',
			title: '变压器新增',
			name: 'hgpdTransformerAdd',
			component: () =>
				import('@/views/Pdms/hgpd/TransformerAdd.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/transformerEdit/:id',
			title: '变压器信息编辑',
			name: 'hgpdTransformerEdit',
			component: () =>
				import('@/views/Pdms/hgpd/TransformerEdit.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/ammeterAdd',
			title: '电表新增',
			name: 'hgpdAmmeterAdd',
			component: () =>
				import('@/views/Pdms/hgpd/AmmeterAdd.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/ammeterEdit/:id',
			title: '电表信息编辑',
			name: 'hgpdAmmeterEdit',
			component: () =>
				import('@/views/Pdms/hgpd/AmmeterEdit.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/environmentAdd',
			title: '环境新增',
			name: 'hgpdEnvironmentAdd',
			component: () =>
				import('@/views/Pdms/hgpd/EnvironmentAdd.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/environmentEdit/:id',
			title: '环境信息编辑',
			name: 'hgpdEnvironmentEdit',
			component: () =>
				import('@/views/Pdms/hgpd/EnvironmentEdit.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/deviceTypeAdd',
			title: '设备新增',
			name: 'hgpdDeviceTypeAdd',
			component: () =>
				import('@/views/Pdms/hgpd/DeviceTypeAdd.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/deviceTypeEdit/:id',
			title: '设备信息编辑',
			name: 'hgpdDeviceTypeEdit',
			component: () =>
				import('@/views/Pdms/hgpd/DeviceTypeEdit.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/ammeterWarningAdd',
			title: '电表告警新增',
			name: 'hgpdAmmeterWarningAdd',
			component: () =>
				import('@/views/Pdms/hgpd/AmmeterWarningAdd.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/ammeterWarningEdit/:id',
			title: '电表告警编辑',
			name: 'hgpdAmmeterWarningEdit',
			component: () =>
				import('@/views/Pdms/hgpd/AmmeterWarningEdit.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/envWarningAdd',
			title: '环境告警新增',
			name: 'hgpdEnvWarningAdd',
			component: () =>
				import('@/views/Pdms/hgpd/EnvWarningAdd.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/envWaringEdit/:id',
			title: '环境告警编辑',
			name: 'hgpdEnvWarningEdit',
			component: () =>
				import('@/views/Pdms/hgpd/EnvWarningEdit.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/ammWarningHistoryDetail/:id',
			title: '电表告警历史详情',
			name: 'hgpdAmmWarningHistoryDetail',
			component: () =>
				import('@/views/Pdms/hgpd/AmmWarningHistoryDetail.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/envWarningHistoryDetail/:id',
			title: '环境告警历史详情',
			name: 'hgpdEnvWarningHistoryDetail',
			component: () =>
				import('@/views/Pdms/hgpd/EnvWarningHistoryDetail.vue')
		},
		{
			path: 'Pdms/hgpd/projectManagement/smokeWarningHistoryDetail/:id',
			title: '烟感告警历史详情',
			name: 'hgpdSmokeWarningHistoryDetail',
			component: () =>
				import('@/views/Pdms/hgpd/SmokeWarningHistoryDetail.vue')
		},
		{
			path: 'Pdms/hgpd/notifications',
			title: '告警详情',
			name: 'hgpdnotifications',
			component: () =>
				import('@/views/Pdms/hgpd/Notifications.vue')
		},
		//空调项目Hvac/tzwl
		{
			path: 'Hvac/tzwl/backWaterAdd',
			title: '分区回水增加',
			name: 'tzwlBackWaterAdd',
			component: () =>
				import('@/views/Hvac/tzwl/BackWaterAdd.vue')
		},
		{
			path: 'Hvac/tzwl/backWaterEdit/:id',
			title: '分区回水编辑',
			name: 'tzwlBackWaterEdit',
			component: () =>
				import('@/views/Hvac/tzwl/BackWaterEdit.vue')
		},
		{
			path: 'Hvac/tzwl/hexsAdd',
			title: '分集水器增加',
			name: 'tzwlHexsAdd',
			component: () =>
				import('@/views/Hvac/tzwl/HexsAdd.vue')
		},
		{
			path: 'Hvac/tzwl/hexsEdit/:id',
			title: '分集水器编辑',
			name: 'tzwlHexsEdit',
			component: () =>
				import('@/views/Hvac/tzwl/HexsEdit.vue')
		},
		{
			path: 'Hvac/tzwl/refrigeratorAdd',
			title: '制冷机增加',
			name: 'tzwlRefrigeratorAdd',
			component: () =>
				import('@/views/Hvac/tzwl/RefrigeratorAdd.vue')
		},
		{
			path: 'Hvac/tzwl/refrigeratorEdit/:id',
			title: '制冷机编辑',
			name: 'tzwlRefrigeratorEdit',
			component: () =>
				import('@/views/Hvac/tzwl/RefrigeratorEdit.vue')
		},
		{
			path: 'Hvac/tzwl/waterPumpAdd',
			title: '水泵增加',
			name: 'tzwlWaterPumpAdd',
			component: () =>
				import('@/views/Hvac/tzwl/WaterPumpAdd.vue')
		},
		{
			path: 'Hvac/tzwl/waterPumpEdit/:id',
			title: '水泵编辑',
			name: 'tzwlWaterPumpEdit',
			component: () =>
				import('@/views/Hvac/tzwl/WaterPumpEdit.vue')
		},
		//北京航港BGS/Pdms/hbgs
		{
			path: 'Pdms/hbgs/projectManagement/regionAdd',
			title: '园区新增',
			name: 'hbgsRegionAdd',
			component: () =>
				import('@/views/Pdms/hbgs/RegionAdd.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/regionEdit/:id',
			title: '园区信息编辑',
			name: 'hbgsRegionEdit',
			component: () =>
				import('@/views/Pdms/hbgs/RegionEdit.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/pdRoomAdd',
			title: '配电室新增',
			name: 'hbgsPDRoomAdd',
			component: () =>
				import('@/views/Pdms/hbgs/PDRoomAdd.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/pdRoomEdit/:id',
			title: '配电室信息编辑',
			name: 'hbgsPDRoomEdit',
			component: () =>
				import('@/views/Pdms/hbgs/PDRoomEdit.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/transformerAdd',
			title: '变压器新增',
			name: 'hbgsTransformerAdd',
			component: () =>
				import('@/views/Pdms/hbgs/TransformerAdd.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/transformerEdit/:id',
			title: '变压器信息编辑',
			name: 'hbgsTransformerEdit',
			component: () =>
				import('@/views/Pdms/hbgs/TransformerEdit.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/ammeterAdd',
			title: '电表新增',
			name: 'hbgsAmmeterAdd',
			component: () =>
				import('@/views/Pdms/hbgs/AmmeterAdd.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/ammeterEdit/:id',
			title: '电表信息编辑',
			name: 'hbgsAmmeterEdit',
			component: () =>
				import('@/views/Pdms/hbgs/AmmeterEdit.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/environmentAdd',
			title: '环境新增',
			name: 'hbgsEnvironmentAdd',
			component: () =>
				import('@/views/Pdms/hbgs/EnvironmentAdd.vue')
		},
		{
			path: 'hbgs/hgpd/projectManagement/environmentEdit/:id',
			title: '环境信息编辑',
			name: 'hbgsEnvironmentEdit',
			component: () =>
				import('@/views/Pdms/hbgs/EnvironmentEdit.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/deviceTypeAdd',
			title: '设备新增',
			name: 'hbgsDeviceTypeAdd',
			component: () =>
				import('@/views/Pdms/hbgs/DeviceTypeAdd.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/deviceTypeEdit/:id',
			title: '设备信息编辑',
			name: 'hbgsDeviceTypeEdit',
			component: () =>
				import('@/views/Pdms/hbgs/DeviceTypeEdit.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/ammeterWarningAdd',
			title: '电表告警新增',
			name: 'hbgsAmmeterWarningAdd',
			component: () =>
				import('@/views/Pdms/hbgs/AmmeterWarningAdd.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/ammeterWarningEdit/:id',
			title: '电表告警编辑',
			name: 'hbgsAmmeterWarningEdit',
			component: () =>
				import('@/views/Pdms/hbgs/AmmeterWarningEdit.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/envWarningAdd',
			title: '环境告警新增',
			name: 'hbgsEnvWarningAdd',
			component: () =>
				import('@/views/Pdms/hbgs/EnvWarningAdd.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/envWaringEdit/:id',
			title: '环境告警编辑',
			name: 'hbgsEnvWarningEdit',
			component: () =>
				import('@/views/Pdms/hbgs/EnvWarningEdit.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/ammWarningHistoryDetail/:id',
			title: '电表告警历史详情',
			name: 'hbgsAmmWarningHistoryDetail',
			component: () =>
				import('@/views/Pdms/hbgs/AmmWarningHistoryDetail.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/envWarningHistoryDetail/:id',
			title: '环境告警历史详情',
			name: 'hbgsEnvWarningHistoryDetail',
			component: () =>
				import('@/views/Pdms/hbgs/EnvWarningHistoryDetail.vue')
		},
		{
			path: 'Pdms/hbgs/projectManagement/smokeWarningHistoryDetail/:id',
			title: '烟感告警历史详情',
			name: 'hbgsSmokeWarningHistoryDetail',
			component: () =>
				import('@/views/Pdms/hbgs/SmokeWarningHistoryDetail.vue')
		},
		{
			path: 'Pdms/hbgs/notifications',
			title: '告警详情',
			name: 'hbgsnotifications',
			component: () =>
				import('@/views/Pdms/hbgs/Notifications.vue')
		},
		//配电项目实时页面/Pdms/hgpd
		//北楼配电室变压器实时页面
		{
			path: 'officeNBTwoTrf',
			name: 'hgpdofficeNBTwoTrf',
			title: '2#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/OfficeNBTwoTrf.vue')
		}, 
		{
			path: 'officeNBThreeTrf',
			name: 'hgpdofficeNBThreeTrf',
			title: '3#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/OfficeNBThreeTrf.vue')
		}, 
		{
			path: 'officeNBFourTrf',
			name: 'hgpdofficeNBFourTrf',
			title: '4#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/OfficeNBFourTrf.vue')
		}, 
		{
			path: 'officeNBFiveTrf',
			name: 'hgpdofficeNBFiveTrf',
			title: '5#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/OfficeNBFiveTrf.vue')
		},
		{
			path: 'officeNBSixTrf',
			name: 'hgpdofficeNBSixTrf',
			title: '6#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/OfficeNBSixTrf.vue')
		},
		//物流园变压器实时页面 
		{
			path: 'logisticsATwoTrf',
			name: 'hgpdlogisticsATwoTrf',
			title: '2#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/LogisticsATwoTrf.vue')
		},
		{
			path: 'logisticsBOneTrf',
			name: 'hgpdlogisticsBOneTrf',
			title: '1#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/LogisticsBOneTrf.vue')
		}, 
		{
			path: 'logisticsBTwoTrf',
			name: 'hgpdlogisticsBTwoTrf',
			title: '2#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/LogisticsBTwoTrf.vue')
		},
		//B型保税园变压器实时页面
		{
			path: 'bF04TwoTrf',
			name: 'hgpdbF04TwoTrf',
			title: '2#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/BF04TwoTrf.vue')
		},
		{
			path: 'bF06OneTrf',
			name: 'hgpdbF06OneTrf',
			title: '1#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/BF06OneTrf.vue')
		}, 
		{
			path: 'bF06TwoTrf',
			name: 'hgpdbF06TwoTrf',
			title: '2#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/BF06TwoTrf.vue')
		},
		{
			path: 'bD08OneTrf',
			name: 'hgpdbD08OneTrf',
			title: '1#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/BD08OneTrf.vue')
		}, 
		{
			path: 'bD08TwoTrf',
			name: 'hgpdbD08TwoTrf',
			title: '2#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/BD08TwoTrf.vue')
		},
		//快件中心变压器实时页面
		{
			path: 'freightOBTwoTrf',
			name: 'hgpdfreightOBTwoTrf',
			title: '2#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/FreightOBTwoTrf.vue')
		}, 
		{
			path: 'freightTBOneTrf',
			name: 'hgpdfreightTBOneTrf',
			title: '1#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/FreightTBOneTrf.vue')
		}, 
		{
			path: 'freightTBTwoTrf',
			name: 'hgpdfreightTBTwoTrf',
			title: '2#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/FreightTBTwoTrf.vue')
		},
		//BGS实时变压器实时页面
		{
			path: 'bGSOnePDRTwoTrf',
			name: 'hgpdBGSOnePDRTwoTrf',
			title: '2#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/BGSOnePDRTwoTrf.vue')
		},
		{
			path: 'bGSTwoPDROneTrf',
			name: 'hgpdBGSTwoPDROneTrf',
			title: '1#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/BGSTwoPDROneTrf.vue')
		}, 
		{
			path: 'bGSTwoPDRTwoTrf',
			name: 'hgpdBGSTwoPDRTwoTrf',
			title: '2#变压器',
			access:2,
			component: () =>
				import('@/views/Pdms/hgpd/BGSTwoPDRTwoTrf.vue')
		},
	]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
	//抄表项目/Rmrs/hgyc
	{
		path: '/Rmrs/hgyc',
		icon: 'ivu-icon ivu-icon-android-contacts',
		name: 'customerList',
		access:1,
		props:"TOOLS",
		title: '客户视图',
		component: Main,
		children: [{
			path: 'customerList',
			title: '客户视图',
			access:1,
			name: 'customerList_index',
			component: () =>
				import('@/views/Rmrs/hgyc/CustomerList.vue')
		}]
	},
	{
		path: '/Rmrs/hgyc',
		icon: 'ivu-icon ivu-icon-ios-speedometer-outline',
		name: 'ammeter',
		title: '电表视图',
		access:1,
		component: Main,
		children: [{
				path: 'ammeter/1',
				icon: 'ivu-icon ivu-icon-ios-home-outline',
				name: 'ammeter1',
				title: '综合办公楼',
				access:1,
				component: () =>
					import('@/views/Rmrs/hgyc/Ammeter.vue')
			}, {
				path: 'ammeter/2',
				icon: 'ivu-icon ivu-icon-ios-home-outline',
				name: 'ammeter2',
				access:1,
				title: '物流园',
				component: () =>
					import('@/views/Rmrs/hgyc/Ammeter.vue')
			}, {
				path: 'ammeter/3',
				icon: 'ivu-icon ivu-icon-ios-home-outline',
				name: 'ammeter3',
				title: 'B型保税园',
				access:1,
				component: () =>
					import('@/views/Rmrs/hgyc/Ammeter.vue')
			}, {
				path: 'ammeter/4',
				icon: 'ivu-icon ivu-icon-ios-home-outline',
				name: 'ammeter4',
				title: '快件中心',
				access:1,
				component: () =>
					import('@/views/Rmrs/hgyc/Ammeter.vue')
			}, 

		]
	},
	{
		path: '/Rmrs/hgyc',
		icon: 'ivu-icon ivu-icon-flash',
		name: 'electricity_search',
		title: '电量查询',
		access:1,
		component: Main,
		children: [{
				path: 'electricityRefer',
				icon: 'ivu-icon ivu-icon-ios-pulse-strong',
				name: 'electricityRefer',
				title: '用电量查询',
				access:1,
				component: () =>
					import('@/views/Rmrs/hgyc/ElectricityRefer.vue')
			}, {
				path: 'iceElectricityRefer',
				icon: 'ivu-icon ivu-icon-ios-pulse-strong',
				name: 'iceElectricityRefer',
				title: '冻结电量查询',
				access:1,
				component: () =>
					import('@/views/Rmrs/hgyc/IceElectricityRefer.vue')
			}

		]
	},
	{
		path: '/Rmrs/hgyc',
		icon: 'ivu-icon ivu-icon-soup-can-outline',
		name: 'all-paydetails',
		title: '费用明细',
		access:1,
		component: Main,
		children: [{
				path: 'detailsAll',
				icon: 'ivu-icon ivu-icon-ios-paper-outline',
				name: 'detailsAll',
				title: '明细一览',
				access:1,
				component: () =>
					import('@/views/Rmrs/hgyc/DetailsAll.vue')
			},
			{
				path: 'detailAmmeter',
				icon: 'ivu-icon ivu-icon-ios-paper-outline',
				name: 'detailAmmeter',
				title: '电表扣费',
				access:1,
				component: () =>
					import('@/views/Rmrs/hgyc/DetailAmmeter.vue')
			},
			{
				path: 'detailPay',
				icon: 'ivu-icon ivu-icon-ios-paper-outline',
				name: 'detailPay',
				title: '充值明细',
				access:1,
				component: () =>
					import('@/views/Rmrs/hgyc/DetailPay.vue')
			},
			{
				path: 'detailRefund',
				icon: 'ivu-icon ivu-icon-ios-paper-outline',
				name: 'detailRefund',
				title: '退款明细',
				access:1,
				component: () =>
					import('@/views/Rmrs/hgyc/DetailRefund.vue')
			},
			{
				path: 'detailOther',
				icon: 'ivu-icon ivu-icon-ios-paper-outline',
				name: 'detailOther',
				title: '其他扣费',
				access:1,
				component: () =>
					import('@/views/Rmrs/hgyc/DetailOther.vue')
			},
		]
	},
	//超级管理员
	{
		path: '/super-admin',
		icon: 'ivu-icon ivu-icon-ios-location',
		name: 'regionManagement',
		props:"管理员",
		access:1,
		flag:[0,1],
		title: '区域管理',
		component: Main,
		children: [{
			path: 'region',
			title: '区域管理',
			access:1,
			flag:[0,1],
			name: 'regionManagement_index',
			component: () =>
				import('@/views/super-admin/RegionManagement.vue')
		}]
	},
	{
		path: '/super-admin',
		icon: 'ivu-icon ivu-icon-android-contacts',
		name: '',
		access:1,
		flag:[0,1],
		title: '客户管理',
		component: Main,
		children: [{
				path: 'rmrsUser',
				icon: 'ivu-icon ivu-icon-android-contacts',
				title: '客户列表',
				access:1,
				flag:[0,1],
				name: 'rmrsUser',
				component: () =>
					import('@/views/super-admin/RmrsUser.vue')
			},
			{
				path: 'allRmrsUserPay',
				icon: 'ivu-icon ivu-icon-android-contacts',
				title: '客户充值',
				access:1,
				flag:[0,1],
				name: 'allRmrsUserPay',
				component: () =>
					import('@/views/super-admin/AllRmrsUserPay.vue')
			},
			{
				path: 'allRmrsUserRefund',
				icon: 'ivu-icon ivu-icon-android-contacts',
				title: '客户退款',
				access:1,
				flag:[0,1],
				name: 'allRmrsUserRefund',
				component: () =>
					import('@/views/super-admin/AllRmrsUserRefund.vue')
			},
			{
				path: 'allRmrsUserCharge',
				icon: 'ivu-icon ivu-icon-android-contacts',
				title: '客户扣费',
				access:1,
				flag:[0,1],
				name: 'allRmrsUserCharge',
				component: () =>
					import('@/views/super-admin/AllRmrsUserCharge.vue')
			}
		]
	}, 
	{
		path: '/courses',
		icon: 'ivu-icon ivu-icon-social-yen-outline',
		name: 'courses',
		title: '费用科目',
		access:1,
		flag:[0,1],
		component: Main,
		children: [{
			path: 'index',
			title: '费用科目',
			access:1,
			flag:[0,1],
			name: 'courses_index',
			component: () =>
				import('@/views/super-admin/Courses.vue')
		}]
	}, 
	{
		path: '/ammeterPreserve',
		icon: 'ivu-icon ivu-icon-android-settings',
		name: 'ammeterPreserve',
		title: '电表维护',
		access:1,
		flag:[0,1],
		component: Main,
		children: [{
			path: 'index',
			access:1,
			flag:[0,1],
			title: '电表维护',
			name: 'ammeterPreserve_index',
			component: () =>
				import('@/views/super-admin/AmmeterPreserve.vue')
		}]
	},
	//配电项目Pdms/hgpd
	{
		path: '/Pdms/hgpd/northBuilding',
		icon: 'ivu-icon ivu-icon-android-home',
		name: 'hgpdnorthBuilding',
		title: '综合办公楼',
		access:2,
		component: Main,
		children: [{
				path: 'officeNBOneTrf',
				icon: 'ivu-icon ivu-icon-android-home',
				name: 'hgpdofficeNBOneTrf',
				title: '综合办公楼',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/OfficeNBOneTrf.vue')
			},
		]
	},
	{
		path: '/Pdms/hgpd/logistics',
		icon: 'ivu-icon ivu-icon-android-home',
		name: 'hgpdlogistics',
		title: '物流园',
		access:2,
		component: Main,
		children: [{
				path: 'logisticsAOneTrf',
				icon: 'ivu-icon ivu-icon-android-home',
				name: 'hgpdlogisticsAOneTrf',
				title: '物流园',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/LogisticsAOneTrf.vue')
			}
		]
	},
	{
		path: '/Pdms/hgpd/b',
		icon: 'ivu-icon ivu-icon-android-home',
		name: 'hgpdbBuilding',
		title: 'B型保税园',
		access:2,
		component: Main,
		children: [{
				path: 'bF04OneTrf',
				icon: 'ivu-icon ivu-icon-android-home',
				name: 'hgpdbF04OneTrf',
				title: 'B型保税园',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/BF04OneTrf.vue')
			},
		]
	},
	{
		path: '/Pdms/hgpd/freight',
		icon: 'ivu-icon ivu-icon-android-home',
		name: 'hgpdfreight',
		title: '快件中心',
		access:2,
		component: Main,
		children: [{
				path: 'freightOBOneTrf',
				icon: 'ivu-icon ivu-icon-android-home',
				name: 'hgpdfreightOBOneTrf',
				title: '快件中心',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/FreightOBOneTrf.vue')
			},
		]
	},
	{
		path: '/Pdms/hgpd/bgs',
		icon: 'ivu-icon ivu-icon-android-home',
		name: 'hgpdbgs',
		title: 'BGS',
		access:2,
		component: Main,
		children: [{
				path: 'bGSOnePDROneTrf',
				icon: 'ivu-icon ivu-icon-android-home',
				name: 'hgpdBGSOnePDROneTrf',
				title: 'BGS',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/BGSOnePDROneTrf.vue')
			},
		]
	},
	/*{
		path: '/Pdms/hgpd/aBank',
		icon: 'ivu-icon ivu-icon-android-home',
		name: 'hgpdaBank',
		title: 'A库配电室',
		access:2,
		props:"02-物流园",
		component: Main,
		children: [{
				path: 'logisticsAOneTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdlogisticsAOneTrf',
				title: '1#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/LogisticsAOneTrf.vue')
			}, 
			{
				path: 'logisticsATwoTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdlogisticsATwoTrf',
				title: '2#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/LogisticsATwoTrf.vue')
			}, 
		]
	},
	{
		path: '/Pdms/hgpd/bBank',
		icon: 'ivu-icon ivu-icon-android-home',
		name: 'hgpdbBank',
		title: 'B库配电室',
		access:2,
		component: Main,
		children: [{
				path: 'logisticsBOneTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdlogisticsBOneTrf',
				title: '1#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/LogisticsBOneTrf.vue')
			}, 
			{
				path: 'logisticsBTwoTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdlogisticsBTwoTrf',
				title: '2#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/LogisticsBTwoTrf.vue')
			}, 
		]
	},
	{
		path: '/Pdms/hgpd/bBonded/F04',
		icon: 'ivu-icon ivu-icon-android-home',
		name: 'hgpdbBondedF04',
		title: 'F04配电室',
		props:"03-B型保税园",
		access:2,
		component: Main,
		children: [{
				path: 'bF04OneTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdbF04OneTrf',
				title: '1#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/BF04OneTrf.vue')
			}, 
			{
				path: 'bF04TwoTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdbF04TwoTrf',
				title: '2#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/BF04TwoTrf.vue')
			}, 
		]
	},
	{
		path: '/Pdms/hgpd/bBonded/F06',
		icon: 'ivu-icon ivu-icon-android-home',
		name: 'hgpdbBondedF06',
		title: 'F06配电室',
		access:2,
		component: Main,
		children: [{
				path: 'bF06OneTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdbF06OneTrf',
				title: '1#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/BF06OneTrf.vue')
			}, 
			{
				path: 'bF06TwoTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdbF06TwoTrf',
				title: '2#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/BF06TwoTrf.vue')
			}, 
		]
	},
	{
		path: '/Pdms/hgpd/bBonded/D08',
		icon: 'ivu-icon ivu-icon-android-home',
		name: 'hgpdbBondedD08',
		title: 'D08配电室',
		access:2,
		component: Main,
		children: [{
				path: 'bD08OneTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdbD08OneTrf',
				title: '1#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/BD08OneTrf.vue')
			}, 
			{
				path: 'bD08TwoTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdbD08TwoTrf',
				title: '2#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/BD08TwoTrf.vue')
			}, 
		]
	},
	{
		path: '/Pdms/hgpd/freight/1',
		icon: 'ivu-icon ivu-icon-android-home',
		name: 'hgpdfreight1#',
		title: '1#库配电室',
		access:2,
		props: '04-快件中心',
		component: Main,
		children: [{
				path: 'freightOBOneTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdfreightOBOneTrf',
				title: '1#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/FreightOBOneTrf.vue')
			}, 
			{
				path: 'freightOBTwoTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdfreightOBTwoTrf',
				title: '2#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/FreightOBTwoTrf.vue')
			}, 
		]
	},
	{
		path: '/Pdms/hgpd/freight/2',
		icon: 'ivu-icon ivu-icon-android-home',
		name: 'hgpdfreight2#',
		title: '2#库配电室',
		access:2,
		component: Main,
		children: [{
				path: 'freightTBOneTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdfreightTBOneTrf',
				title: '1#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/FreightTBOneTrf.vue')
			}, 
			{
				path: 'freightTBTwoTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdfreightTBTwoTrf',
				title: '2#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/FreightTBTwoTrf.vue')
			}, 
		]
	},
	{
		path: '/Pdms/hgpd/BGSOnePDRoom',
		icon: 'ivu-icon ivu-icon-android-home',
		name: 'hgpdBGSOnePDRoom',
		title: '1#配电室',
		access:2,
		props: '05-BGS',
		component: Main,
		children: [{
				path: 'bGSOnePDROneTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdBGSOnePDROneTrf',
				title: '1#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/BGSOnePDROneTrf.vue')
			}, 
			{
				path: 'bGSOnePDRTwoTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdBGSOnePDRTwoTrf',
				title: '2#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/BGSOnePDRTwoTrf.vue')
			}, 
		]
	},
	{
		path: '/Pdms/hgpd/BGSTwoPDRoom',
		icon: 'ivu-icon ivu-icon-android-home',
		name: 'hgpdBGSTwoPDRoom',
		title: '2#配电室',
		access:2,
		component: Main,
		children: [{
				path: 'bGSTwoPDROneTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdBGSTwoPDROneTrf',
				title: '1#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/BGSTwoPDROneTrf.vue')
			}, 
			{
				path: 'bGSTwoPDRTwoTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hgpdBGSTwoPDRTwoTrf',
				title: '2#变压器',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/BGSTwoPDRTwoTrf.vue')
			}, 
		]
	},*/
	{
		path: '/Pdms/hgpd/search',
		icon: 'ivu-icon ivu-icon-soup-can',
		name: 'hgpdsearch',
		title: '统计查询',
		access:2,
		props: '数据查询',
		component: Main,
		children: [{
				path: 'allSearchHour',
				icon: 'ivu-icon ivu-icon-stats-bars',
				name: 'hgpdallSearchHour',
				title: '小时用电量',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/AllSearchHour.vue')
			}, 
			{
				path: 'allSearchDay',
				icon: 'ivu-icon ivu-icon-stats-bars',
				name: 'hgpdallSearchDay',
				title: '每日用电量',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/AllSearchDay.vue')
			},
			{
				path: 'allSearchMonth',
				icon: 'ivu-icon ivu-icon-stats-bars',
				name: 'hgpdallSearchMonth',
				title: '月度用电量',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/AllSearchMonth.vue')
			},
		]
	},
	{
		path: '/Pdms/hgpd/historyData',
		icon: 'ivu-icon ivu-icon-soup-can',
		name: 'hgpdhistoryData',
		title: '历史数据',
		access:2,
		component: Main,
		children: [{
				path: 'ammHistoryData',
				icon: 'ivu-icon ivu-icon-ios-speedometer-outline',
				name: 'hgpdammHistoryData',
				title: '电表',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/AmmHistoryData.vue')
			}, 
			{
				path: 'envHistoryData',
				icon: 'ivu-icon ivu-icon-ios-world-outline',
				name: 'hgpdenvHistoryData',
				title: '环境',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/EnvHistoryData.vue')
			},
		]
	},
	{
		path: '/Pdms/hgpd/deviceSearch',
		icon: 'ivu-icon ivu-icon-settings',
		name: 'hgpddeviceSearch',
		title: '设备查询',
		access:2,
		component: Main,
		children: [{
				path: 'ammDeviceSearch',
				icon: 'ivu-icon ivu-icon-ios-speedometer-outline',
				name: 'hgpdammDeviceSearch',
				title: '电表',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/AmmDeviceSearch.vue')
			}, 
			{
				path: 'envDeviceSearch',
				icon: 'ivu-icon ivu-icon-ios-world-outline',
				name: 'hgpdenvDeviceSearch',
				title: '环境',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/EnvDeviceSearch.vue')
			},
		]
	},
	{
		path: '/Pdms/hgpd/warning',
		icon: 'ivu-icon ivu-icon-alert-circled',
		name: 'hgpdwarning',
		title: '告警订阅',
		access:2,
		component: Main,
		children: [{
				path: 'ammeterWarning',
				icon: 'ivu-icon ivu-icon-alert-circled',
				name: 'hgpdammeterWarning',
				title: '电表告警',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/AmmeterWarning.vue')
			}, 
			{
				path: 'envWarning',
				icon: 'ivu-icon ivu-icon-alert-circled',
				name: 'hgpdEnvWarning',
				title: '环境告警',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/EnvWarning.vue')
			}
		]
	},
	{
		path: '/Pdms/hgpd/warningHistory',
		icon: 'ivu-icon ivu-icon-alert-circled',
		name: 'hgpdwarningHistory',
		title: '告警历史',
		access:2,
		component: Main,
		children: [{
				path: 'ammWarningHistory',
				icon: 'ivu-icon ivu-icon-alert-circled',
				name: 'hgpdammWarningHistory',
				title: '电表告警',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/AmmWarningHistory.vue')
			}, 
			{
				path: 'envWarningHistory',
				icon: 'ivu-icon ivu-icon-alert-circled',
				name: 'hgpdenvWarningHistory',
				title: '环境告警',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/EnvWarningHistory.vue')
			},
			{
				path: 'smokeWarningHistory',
				icon: 'ivu-icon ivu-icon-alert-circled',
				name: 'hgpdsmokeWarningHistory',
				title: '烟感告警',
				access:2,
				component: () =>
					import('@/views/Pdms/hgpd/SmokeWarningHistory.vue')
			},
		]
	},
	//配电项目管理hgpd
	{
		path: '/Pdms/hgpd/projectManagement',
		icon: 'social-buffer',
		name: 'hgpdProject',
		title: '项目管理',
		props:"管理员",
		access:2,
		flag: [0,1],
		component: Main,
		children: [{
				path: 'region',
				icon: 'ivu-icon ivu-icon-ios-home-outline',
				name: 'hgpdRegion',
				title: '园区',
				access:2,
				flag: [0,1],
				component: () =>
					import('@/views/Pdms/hgpd/Region.vue')
			},
			{
				path: 'buildings',
				icon: 'ivu-icon ivu-icon-ios-home-outline',
				name: 'hgpdBuildings',
				title: '建筑物',
				access:2,
				flag: [0,1],
				component: () =>
					import('@/views/Pdms/hgpd/Buildings.vue')
			},
			{
				path: 'pdRoom',
				icon: 'ivu-icon ivu-icon-android-home',
				name: 'hgpdPDRoom',
				title: '配电室',
				access:2,
				flag: [0,1],
				component: () =>
					import('@/views/Pdms/hgpd/PDRoom.vue')
			},
			{
				path: 'transformer',
				icon: 'ivu-icon ivu-icon-flash',
				name: 'hgpdTransformer',
				title: '变压器',
				access:2,
				flag: [0,1],
				component: () =>
					import('@/views/Pdms/hgpd/Transformer.vue')
			},
			{
				path: 'ammeter',
				icon: 'ivu-icon ivu-icon-ios-speedometer-outline',
				name: 'hgpdAmmeter',
				title: '电表',
				access:2,
				flag: [0,1],
				component: () =>
					import('@/views/Pdms/hgpd/Ammeter.vue')
			},
			{
				path: 'environment',
				icon: 'ivu-icon ivu-icon-ios-world-outline',
				name: 'hgpdEnvironment',
				title: '环境',
				access:2,
				flag: [0,1],
				component: () =>
					import('@/views/Pdms/hgpd/Environment.vue')
			},
			{
				path: 'deviceType',
				icon: 'ivu-icon ivu-icon-settings',
				name: 'hgpdDeviceType',
				title: '设备管理',
				access:2,
				flag: [0,1],
				component: () =>
					import('@/views/Pdms/hgpd/DeviceType.vue')
			},
		]
	},
	//空调项目/Hvac/tzwl
	{
		path: '/Hvac/tzwl/realTimeProtection',
		icon: 'ivu-icon ivu-icon-android-locate',
		name: 'tzwlRealTimeProtection',
		title: '实时监控',
		access:3,
		flag: [0,1],
		component: Main,
		children: [{
				path: 'deviceState',
				icon: 'ivu-icon ivu-icon-soup-can-outline',
				name: 'tzwlDeviceState',
				title: '设备实时状态',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/DeviceState.vue')
			},
			{
				path: 'refrigeratorDetail',
				icon: 'ivu-icon ivu-icon-card',
				name: 'tzwlRefrigeratorDetail',
				title: '制冷机组参数',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/RefrigeratorDetail.vue')
			},
			{
				path: 'circulatorDetail',
				icon: 'ivu-icon ivu-icon-ios-loop-strong',
				name: 'tzwlCirculatorDetail',
				title: '循环泵组参数',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/CirculatorDetail.vue')
			},
			{
				path: 'hexsDetail',
				icon: 'ivu-icon ivu-icon-ios-flame-outline',
				name: 'tzwlhexsDetail',
				title: '分集水器参数',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/HexsDetail.vue')
			},
		]
	},
	{
		path: '/Hvac/tzwl/energyStatistic',
		icon: 'ivu-icon ivu-icon-stats-bars',
		name: 'tzwlEnergyStatistic',
		title: '能耗统计',
		access:3,
		flag: [0,1],
		component: Main,
		children: [{
				path: 'energyDetail',
				icon: 'ivu-icon ivu-icon-ios-paper-outline',
				name: 'tzwlEnergyDetail',
				title: '能耗概览',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/EnergyDetail.vue')
			},
			{
				path: 'SumListDetail',
				icon: 'ivu-icon ivu-icon-ios-speedometer-outline',
				name: 'tzwlSumListDetail',
				title: '总表',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/SumListDetail.vue')
			},
		]
	},
	{
		path: '/Hvac/tzwl/logout',
		icon: 'ivu-icon ivu-icon-clipboard',
		name: 'tzwlLogout',
		title: '运行记录',
		access:3,
		flag: [0,1],
		component: Main,
		children: [{
				path: 'AllRunningDetail',
				icon: 'ivu-icon ivu-icon-ios-paper-outline',
				name: 'tzwlAllRunningDetail',
				title: '运行概览',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/AllRunningDetail.vue')
			},
			{
				path: 'refrigeratorRunning',
				icon: 'ivu-icon ivu-icon-android-home',
				name: 'tzwlRefrigeratorRunning',
				title: '制冷机组',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/RefrigeratorRunning.vue')
			},
			{
				path: 'chilledPump',
				icon: 'ivu-icon ivu-icon-cube',
				name: 'tzwlChilledPump',
				title: '冷冻泵',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/ChilledPump.vue')
			},
			{
				path: 'coolantPump',
				icon: 'ivu-icon ivu-icon-cube',
				name: 'tzwlCoolantPump',
				title: '冷却泵',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/CoolantPump.vue')
			},
		]
	},
	{
		path: '/Hvac/tzwl/temperatureTrend',
		icon: 'ivu-icon ivu-icon-thermometer',
		name: 'tzwlTemperatureTrend',
		title: '温度趋势',
		access:3,
		flag: [0,1],
		component: Main,
		children: [{
				path: 'temperatureOne',
				icon: 'ivu-icon ivu-icon-ios-pulse-strong',
				name: 'tzwlTemperatureOne',
				title: '1#主机',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/TemperatureOne.vue')
			},
			{
				path: 'temperatureTwo',
				icon: 'ivu-icon ivu-icon-ios-pulse-strong',
				name: 'tzwlTemperatureTwo',
				title: '2#主机',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/TemperatureTwo.vue')
			},
			{
				path: 'temBackwater',
				icon: 'ivu-icon ivu-icon-ios-pulse-strong',
				name: 'tzwlTemBackwater',
				title: '分区回水',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/TemBackwater.vue')
			},
		]
	},
	{
		path: '/Hvac/tzwl/waterTrend',
		icon: 'ivu-icon ivu-icon-waterdrop',
		name: 'tzwlWaterTrend',
		title: '水压趋势',
		access:3,
		flag: [0,1],
		component: Main,
		children: [{
				path: 'pressureOne',
				icon: 'ivu-icon ivu-icon-ios-pulse-strong',
				name: 'tzwlPressureOne',
				title: '1#主机',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/PressureOne.vue')
			},
			{
				path: 'pressureTwo',
				icon: 'ivu-icon ivu-icon-ios-pulse-strong',
				name: 'tzwlPressureTwo',
				title: '2#主机',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/PressureTwo.vue')
			},
			{
				path: 'pressureHexs',
				icon: 'ivu-icon ivu-icon-ios-pulse-strong',
				name: 'tzwlPressureHexs',
				title: '分集水器',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/PressureHexs.vue')
			},
		]
	},
	{
		path: '/Hvac/tzwl/notification',
		icon: 'ivu-icon ivu-icon-alert-circled',
		name: 'tzwlNotification',
		title: '通知告警',
		access:3,
		flag: [0,1],
		component: Main,
		children: [{
				path: 'warningNow',
				icon: 'ivu-icon ivu-icon-alert-circled',
				name: 'tzwlWarningNow',
				title: '实时报警',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/WarningNow.vue')
			},
			{
				path: 'warningHistory',
				icon: 'ivu-icon ivu-icon-alert-circled',
				name: 'tzwlWarningHistory',
				title: '历史报警',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/WarningHistory.vue')
			},
			{
				path: 'warningSet',
				icon: 'ivu-icon ivu-icon-alert-circled',
				name: 'tzwlWarningSet',
				title: '报警定义',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/WarningSet.vue')
			},
		]
	},
	//空调管理员
	{
		path: '/Hvac/tzwl/projectManagement',
		icon: 'social-buffer',
		name: 'tzwlProjectManagement',
		title: '项目管理',
		props: '管理员',
		access:3,
		flag: [0,1],
		component: Main,
		children: [{
				path: 'backWater',
				icon: 'social-buffer',
				name: 'tzwlbackWater',
				title: '分区回水',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/BackWater.vue')
			},
			{
				path: 'hexs',
				icon: 'social-buffer',
				name: 'tzwlHexs',
				title: '分集水器',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/Hexs.vue')
			},
			{
				path: 'refrigerator',
				icon: 'social-buffer',
				name: 'tzwlRefrigerator',
				title: '制冷机',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/Refrigerator.vue')
			},
			{
				path: 'waterPump',
				icon: 'social-buffer',
				name: 'tzwlWaterPump',
				title: '水泵',
				access:3,
				flag: [0,1],
				component: () =>
					import('@/views/Hvac/tzwl/WaterPump.vue')
			},
		]
	},
	//北京航港BGS/Pdms/hbgs
	{
		path: '/Pdms/hbgs/home',
		icon: 'ivu-icon ivu-icon-ios-world-outline',
		name: 'hbgshome',
		title: 'Dashboard',
		props:"北京航港BGS",
		access:5,
		component: Main,
		children: [{
				path: 'home_index',
				icon: 'ivu-icon ivu-icon-ios-world-outline',
				name: 'hbgshome_index',
				access:5,
				title: 'Dashboard',
				component: () =>
					import('@/views/Pdms/hbgs/index.vue')
			}, 
		]
	},
	{
		path: '/Pdms/hbgs/onePDRoom',
		icon: 'ivu-icon ivu-icon-android-home',
		name: 'hbgsOnePDRoom',
		title: '1#配电室',
		access:5,
		props:"BGS",
		component: Main,
		children: [{
				path: 'onePDRoomOneTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hbgsOnePDRoomOneTrf',
				title: '1#变压器',
				access:5,
				component: () =>
					import('@/views/Pdms/hbgs/OnePDRoomOneTrf.vue')
			}, 
			{
				path: 'onePDRoomTwoTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hbgsOnePDRoomTwoTrf',
				title: '2#变压器',
				access:5,
				component: () =>
					import('@/views/Pdms/hbgs/OnePDRoomTwoTrf.vue')
			}, 
		]
	},
	{
		path: '/Pdms/hbgs/twoPDRoom',
		icon: 'ivu-icon ivu-icon-android-home',
		name: 'hbgstwoPDRoom',
		title: '2#配电室',
		access:5,
		component: Main,
		children: [{
				path: 'twoPDRoomOneTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hbgsTwoPDRoomOneTrf',
				title: '1#变压器',
				access:5,
				component: () =>
					import('@/views/Pdms/hbgs/TwoPDRoomOneTrf.vue')
			}, 
			{
				path: 'twoPDRoomTwoTrf',
				icon: 'ivu-icon ivu-icon-ios-bolt',
				name: 'hbgsTwoPDRoomTwoTrf',
				title: '2#变压器',
				access:5,
				component: () =>
					import('@/views/Pdms/hbgs/TwoPDRoomTwoTrf.vue')
			},  
		]
	},
	{
		path: '/Pdms/hbgs/search',
		icon: 'ivu-icon ivu-icon-soup-can',
		name: 'hbgssearch',
		title: '统计查询',
		access:5,
		props: '数据查询',
		component: Main,
		children: [{
				path: 'allSearchHour',
				icon: 'ivu-icon ivu-icon-stats-bars',
				name: 'hbgsallSearchHour',
				title: '小时用电量',
				access:5,
				component: () =>
					import('@/views/Pdms/hbgs/AllSearchHour.vue')
			}, 
			{
				path: 'allSearchDay',
				icon: 'ivu-icon ivu-icon-stats-bars',
				name: 'hbgsallSearchDay',
				title: '每日用电量',
				access:5,
				component: () =>
					import('@/views/Pdms/hbgs/AllSearchDay.vue')
			},
			{
				path: 'allSearchMonth',
				icon: 'ivu-icon ivu-icon-stats-bars',
				name: 'hbgsallSearchMonth',
				title: '月度用电量',
				access:5,
				component: () =>
					import('@/views/Pdms/hbgs/AllSearchMonth.vue')
			},
		]
	},
	{
		path: '/Pdms/hbgs/historyData',
		icon: 'ivu-icon ivu-icon-soup-can',
		name: 'hbgshistoryData',
		title: '历史数据',
		access:5,
		component: Main,
		children: [{
				path: 'ammHistoryData',
				icon: 'ivu-icon ivu-icon-ios-speedometer-outline',
				name: 'hbgsammHistoryData',
				title: '电表',
				access:5,
				component: () =>
					import('@/views/Pdms/hbgs/AmmHistoryData.vue')
			}, 
			{
				path: 'envHistoryData',
				icon: 'ivu-icon ivu-icon-ios-world-outline',
				name: 'hbgsenvHistoryData',
				title: '环境',
				access:5,
				component: () =>
					import('@/views/Pdms/hbgs/EnvHistoryData.vue')
			},
		]
	},
	{
		path: '/Pdms/hbgs/deviceSearch',
		icon: 'ivu-icon ivu-icon-settings',
		name: 'hbgsdeviceSearch',
		title: '设备查询',
		access:5,
		component: Main,
		children: [{
				path: 'ammDeviceSearch',
				icon: 'ivu-icon ivu-icon-ios-speedometer-outline',
				name: 'hbgsammDeviceSearch',
				title: '电表',
				access:5,
				component: () =>
					import('@/views/Pdms/hbgs/AmmDeviceSearch.vue')
			}, 
			{
				path: 'envDeviceSearch',
				icon: 'ivu-icon ivu-icon-ios-world-outline',
				name: 'hbgsenvDeviceSearch',
				title: '环境',
				access:5,
				component: () =>
					import('@/views/Pdms/hbgs/EnvDeviceSearch.vue')
			},
		]
	},
	{
		path: '/Pdms/hbgs/warning',
		icon: 'ivu-icon ivu-icon-alert-circled',
		name: 'hbgswarning',
		title: '告警订阅',
		access:5,
		component: Main,
		children: [{
				path: 'ammeterWarning',
				icon: 'ivu-icon ivu-icon-alert-circled',
				name: 'hbgsammeterWarning',
				title: '电表告警',
				access:5,
				component: () =>
					import('@/views/Pdms/hbgs/AmmeterWarning.vue')
			}, 
			{
				path: 'envWarning',
				icon: 'ivu-icon ivu-icon-alert-circled',
				name: 'hbgsEnvWarning',
				title: '环境告警',
				access:5,
				component: () =>
					import('@/views/Pdms/hbgs/EnvWarning.vue')
			}
		]
	},
	{
		path: '/Pdms/hbgs/warningHistory',
		icon: 'ivu-icon ivu-icon-alert-circled',
		name: 'hbgswarningHistory',
		title: '告警历史',
		access:5,
		component: Main,
		children: [{
				path: 'ammWarningHistory',
				icon: 'ivu-icon ivu-icon-alert-circled',
				name: 'hbgsammWarningHistory',
				title: '电表告警',
				access:5,
				component: () =>
					import('@/views/Pdms/hbgs/AmmWarningHistory.vue')
			}, 
			{
				path: 'envWarningHistory',
				icon: 'ivu-icon ivu-icon-alert-circled',
				name: 'hbgsenvWarningHistory',
				title: '环境告警',
				access:5,
				component: () =>
					import('@/views/Pdms/hbgs/EnvWarningHistory.vue')
			},
			{
				path: 'smokeWarningHistory',
				icon: 'ivu-icon ivu-icon-alert-circled',
				name: 'hbgssmokeWarningHistory',
				title: '烟感告警',
				access:5,
				component: () =>
					import('@/views/Pdms/hbgs/SmokeWarningHistory.vue')
			},
		]
	},
	//配电项目管理BGS
	{
		path: '/Pdms/hbgs/projectManagement',
		icon: 'social-buffer',
		name: 'hbgsProject',
		title: '项目管理',
		props:"管理员",
		access:5,
		flag: [0,1],
		component: Main,
		children: [{
				path: 'region',
				icon: 'ivu-icon ivu-icon-ios-home-outline',
				name: 'hbgsRegion',
				title: '园区',
				access:5,
				flag: [0,1],
				component: () =>
					import('@/views/Pdms/hbgs/Region.vue')
			},
			{
				path: 'pdRoom',
				icon: 'ivu-icon ivu-icon-android-home',
				name: 'hbgsPDRoom',
				title: '配电室',
				access:5,
				flag: [0,1],
				component: () =>
					import('@/views/Pdms/hbgs/PDRoom.vue')
			},
			{
				path: 'transformer',
				icon: 'ivu-icon ivu-icon-flash',
				name: 'hbgsTransformer',
				title: '变压器',
				access:5,
				flag: [0,1],
				component: () =>
					import('@/views/Pdms/hbgs/Transformer.vue')
			},
			{
				path: 'ammeter',
				icon: 'ivu-icon ivu-icon-ios-speedometer-outline',
				name: 'hbgsAmmeter',
				title: '电表',
				access:5,
				flag: [0,1],
				component: () =>
					import('@/views/Pdms/hbgs/Ammeter.vue')
			},
			{
				path: 'environment',
				icon: 'ivu-icon ivu-icon-ios-world-outline',
				name: 'hbgsEnvironment',
				title: '环境',
				access:5,
				flag: [0,1],
				component: () =>
					import('@/views/Pdms/hbgs/Environment.vue')
			},
			{
				path: 'deviceType',
				icon: 'ivu-icon ivu-icon-settings',
				name: 'hbgsDeviceType',
				title: '设备管理',
				access:5,
				flag: [0,1],
				component: () =>
					import('@/views/Pdms/hbgs/DeviceType.vue')
			},
		]
	},
	//超级管理员
	{
		path: '/super-admin',
		icon: 'social-buffer',
		name: 'super-admin',
		title: '超级管理员',
		props:"超级管理员",
		access:[1,2,3,5],
		flag: 0,
		component: Main,
		children: [{
				path: 'userManagement',
				icon: 'social-buffer',
				name: 'userManagement',
				title: '用户管理',
				flag: 0,
				access:[1,2,3,5],
				component: () =>
					import('@/views/super-admin/UserManagement.vue')
			},
			{
				path: 'porjectManagement',
				icon: 'social-buffer',
				name: 'porjectManagement',
				title: '项目管理',
				flag: 0,
				access:[1,2,3,5],
				component: () =>
					import('@/views/super-admin/ProjectManagement.vue')
			},
			{
				path: 'porjectType',
				icon: 'social-buffer',
				name: 'porjectType',
				title: '项目类型',
				flag: 0,
				access:[1,2,3,5],
				component: () =>
					import('@/views/super-admin/ProjectType.vue')
			},
			{
				path: 'deviceType',
				icon: 'social-buffer',
				name: 'deviceType',
				title: '设备类型',
				flag: 0,
				access:[1,2,3,5],
				component: () =>
					import('@/views/super-admin/DeviceType.vue')
			},
			{
				path: 'projectRights',
				icon: 'social-buffer',
				name: 'projectRights',
				title: '项目权限',
				flag: 0,
				access:[1,2,3,5],
				component: () =>
					import('@/views/super-admin/ProjectRights.vue')
			},
		]
	}
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
	loginRouter,
	projectChoose,
	otherRouter,
	...appRouter,
	page500,
	page403,
	page404,
];