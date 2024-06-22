<template>
  <b-container fluid class="h-100">
    <b-row class="h-50 mb-4">
      <b-col lg="8" sm="12" class="h-100">
        <ui-card class="h-100">
          <h5>Alumnos por curso</h5>
          <ui-bar v-if="!loading" :labels="studentsByCourseData.labels" :data="studentsByCourseData.data" :colors="studentsByCourseData.colors" />
          <b-skeleton type="input" v-else></b-skeleton>
        </ui-card>
        <ui-card class="h-100">
          <h5>Alumnos por periodo</h5>
          <ui-line v-if="!loading" :labels="studentsByPeriodData.labels" :data="studentsByPeriodData.data" :colors="studentsByPeriodData.colors" :secondLine="studentsInactiveByPeriodData"/>
          <b-skeleton type="input" v-else></b-skeleton>
        </ui-card>
      </b-col>
      <b-col lg="4" sm="12" class="h-100">
        <ui-card class="h-100">
          <h5>Ultimos alumnos</h5>
          <TableInfo v-if="!loading" :items="recentStudents"/>
          <b-skeleton-table v-else :rows="5" :columns="4" :table-props="{ bordered: true, striped: true }"></b-skeleton-table>
        </ui-card>
        <ui-card class="h-100">
          <h5>Cantidad de alumnos</h5>
          <ui-doughnut v-if="!loading" :labels="['Activo', 'Inactivo']" :data="activeInactiveData" :colors="['rgb(79, 180, 219)', 'rgb(222, 29, 61)',]" />
          <b-skeleton type="input" v-else></b-skeleton>
        </ui-card>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
import UiDoughnut from "@/components/ui/charts/Doughnut.vue";
import UiBar from "@/components/ui/charts/Bar.vue";
import UiLine from "@/components/ui/charts/Line.vue";
import uiCard from "@/components/ui/cards/uiCard.vue";
import TableInfo from '@/components/ui/tables/TableInfo.vue';
import Progress from '@/components/ui/others/Progress.vue';
import { BContainer, BCol, BRow } from 'bootstrap-vue-3';

export default {
  name: "Home",
  components: {
    UiDoughnut,
    UiBar,
    uiCard,
    TableInfo,
    Progress,
    BContainer,
    BCol,
    BRow,
    UiLine
  },
  data() {
    return {
      loading: false,
      activeInactiveData: [],
      studentsInactiveByPeriodData: [],
      studentsByPeriodData: [],
      studentsByCourseData: [],
      recentStudents: [],
    };
  },
  mounted() {
    this.fetchAllData();
  },
  methods: {
    async fetchAllData() {
      this.loading = true;
      try {
        await Promise.all([
          this.getActiveInactiveStudents(),
          this.getStudentsByPeriod(),
          this.getStudentsByCourse(),
          this.getRecentStudents(),
          this.getInactiveStudentsByPeriod()
        ]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        this.loading = false;
      }
    },
    async getActiveInactiveStudents() {
      try {
        const { data } = await this.$axios.get('/_/dashboard/active-inactive-students');
        this.activeInactiveData = [data.active_students, data.inactive_students];
      } catch (error) {
        console.error("Error fetching active/inactive students data: ", error);
      }
    },
    async getRecentStudents() {
      try {
        const { data } = await this.$axios.get('/_/dashboard/recent-students');
        this.recentStudents = data;
      } catch (error) {
        console.error("Error fetching active/inactive students data: ", error);
      }
    },
    async getStudentsByPeriod() {
      try {
        const { data } = await this.$axios.get('/_/dashboard/students-count-by-period');
        this.studentsByPeriodData = data;
      } catch (error) {
        console.error("Error fetching students by period data: ", error);
      }
    },
    async getInactiveStudentsByPeriod() {
      try {
        const { data } = await this.$axios.get('/_/dashboard/students-inactive-count-by-period');
        this.studentsInactiveByPeriodData = data;
      } catch (error) {
        console.error("Error fetching students by period data: ", error);
      }
    },
    async getStudentsByCourse() {
      try {
        const { data } = await this.$axios.get('/_/dashboard/students-count-by-course');
        this.studentsByCourseData = data;
      } catch (error) {
        console.error("Error fetching students by course data: ", error);
      }
    }
  }
};
</script>

<style scoped>
.b-container {
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
}

.b-row {
  display: flex;
  flex: 1;
  margin-bottom: 0;
}

.b-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
}

.ui-card {
  height: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ui-card > * {
  flex: 1;
}

.b-skeleton, .b-skeleton-table {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 767px) {
  .ui-card {
    margin-bottom: 20px;
  }
}
</style>
