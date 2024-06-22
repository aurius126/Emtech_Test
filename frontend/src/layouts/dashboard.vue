<template>
    <div>
        <dashboard-sidebar />
        <div>
            <router-view :key="routerViewKey" />
        </div>
    </div>
</template>

<script>
import DashboardSidebar from '@/components/sidebar/sidebar.vue';
export default {
    components: {
        DashboardSidebar
    },
    data() {
        return{
            routerViewKey: this.$route.fullPath
        }
    }
}
</script>