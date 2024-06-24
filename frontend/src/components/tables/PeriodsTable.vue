<template>
    <div>
        <uiCard>
            <h4>Cursos</h4>
            <FilterTable :items="periods" :currentPage="currentPage" :totalItems="totalItems" :fields="fields" @item-deleted="removePeriod" :delete="true"></FilterTable>
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
            allPeriods: [],
            fields: [
                { key: "id", label: "ID" },
                { key: "period", label: "Periodo" },
                { key: "Status", label: "Estatus" },
                { key: "Action", label: "Acción" },
            ],
            currentPage: 1,
            totalPages: 1,
            totalItems: 1
        };
    },
    created() {
        this.fetchPeriods();
    },
    methods: {
        async fetchPeriods() {
            await this.$axios.get('/_/periods/paginate').then(response => {
                const { data, totalItems, totalPages } = response.data;
                this.allPeriods = data;
                this.periods = data.map(period => ({
                    id: period.id,
                    period: period.period
                }));
                this.totalPages = totalPages;
                this.totalItems = totalItems;
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
