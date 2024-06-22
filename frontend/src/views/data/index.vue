<template>
    <b-container fluid class="h-100">
      <b-row class="h-50 mb-4">
        <b-col lg="6" sm="12" class="h-100">
          <PeriodsTable />
        </b-col>
        <b-col lg="6" sm="12" class="h-100">
          <CourseTable />
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  import PeriodsTable from '@/components/tables/PeriodsTable.vue';
  import CourseTable from '@/components/tables/CourseTable.vue';
  import { BContainer, BCol, BRow } from 'bootstrap-vue-3';
  export default {
    name: 'students',
    components: { BContainer, BCol, BRow, CourseTable, PeriodsTable }
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