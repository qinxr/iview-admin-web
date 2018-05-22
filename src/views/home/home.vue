<template>
	<div>
		<span v-if="this.$store.state.app.projectId == 1">
			<hgychome></hgychome>
		</span>
		<span v-if="this.$store.state.app.projectId == 2">
			<hgpdhome></hgpdhome>
		</span>
		<span v-if="this.$store.state.app.projectId == 3">
			<tzwlhome></tzwlhome>
		</span>
	</div>

</template>

<script>
	import Cookies from 'js-cookie';
	import hgpdhome from '@/views/Pdms/hgpd/index.vue'
	import hgychome from '@/views/Rmrs/hgyc/Dashboard.vue'
	import tzwlhome from '@/views/Hvac/tzwl/index.vue'

	export default {
		name: 'home_index',
		data() {
			return {
				data: ""
			};
		},
		components: {
			hgpdhome,
			hgychome,
			tzwlhome
		},

		mounted() {
			this.$store.state.app.projectId = Cookies.get("access");
			console.log(this.$store.state.app.projectId)
		},

		methods: {

		}
	};
</script>
<style lang="less">

</style>