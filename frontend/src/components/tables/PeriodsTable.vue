<template>
    <div>
        <uiCard>
            <h4>Cursos</h4>
            <FilterTable :items="periods" :fields="fields" @item-deleted="removePeriod" :delete="true"></FilterTable>
        </uiCard>
    </div>
</template>

<script>
import FilterTable from '@/components/ui/tables/FilterTable.vue';
import uiCard from "@/components/ui/cards/uiCard.vue";
export default {
    name: 'PeriodTable',
    components: {
        FilterTable,
        uiCard
    },
    data() {
        return {
            periods: [],
            fields: [
                { key: "id", label: "ID" },
                { key: "period", label: "Periodo" },
                { key: "Status", label: "Estatus" },
                { key: "Action", label: "Acción" },
            ],
        };
    },
    created() {
        this.fetchPeriods();
    },
    methods: {
        async fetchPeriods() {
            await this.$axios.get('/_/periods').then(response => {
                this.periods = response.data.map(period => ({
                    id: period.id,
                    period: period.period,
                    active: period.active
                }));
            });
        },
        removePeriod(id) {
            this.$axios.delete(`/_/periods/${id}`).then(() => {
                this.periods = this.periods.filter(period => period.id !== id);
            });
        },
    },
};
</script>
