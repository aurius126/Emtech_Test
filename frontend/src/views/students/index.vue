<template>
  <b-container fluid class="h-100">
    <b-row class="h-50 mb-4">
      <b-col lg="12" sm="12" class="h-100">
        <StudentsTable />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import StudentsTable from '@/components/students/StudentsTable.vue';
import { BContainer, BCol, BRow } from 'bootstrap-vue-3';
export default {
  name: 'students',
  components: { StudentsTable, BContainer, BCol, BRow }
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
</style>