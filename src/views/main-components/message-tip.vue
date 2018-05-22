<template>
    <div @click="showMessage" class="message-con">
        <Tooltip :content="value > 0 ? '有' + value + '条告警消息' : '无告警消息'" placement="bottom">
            <Badge :count="value" dot>
                <Icon type="ios-bell" :size="22"></Icon>
            </Badge>
        </Tooltip>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import util from '@/libs/util.js';
export default {
    name: 'messageTip',
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    methods: {
        showMessage () {
        	let projectId = parseInt(Cookies.get('access'));
        	//console.log(projectId);
        	switch(projectId) {
        		case 2:
        			util.openNewPage(this, 'hgpdnotifications');
		            this.$router.push({
		                name: 'hgpdnotifications'
		            });
		            break;
		        case 5:
		        	util.openNewPage(this, 'hbgsnotifications');
		            this.$router.push({
		                name: 'hbgsnotifications'
		            });
		            break;
        	}
        }
    }
};
</script>
