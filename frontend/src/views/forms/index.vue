<template>
  <b-container fluid class="h-100">
    <b-row class="h-50 mb-4">
      <b-col lg="8" sm="12">
        <StudentForm />
      </b-col>
      <b-col lg="4" sm="12">
        <Courses />
        <Periods />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import StudentForm from '@/components/students/form.vue';
import Periods from '@/components/forms/periods.vue';
import Courses from '@/components/forms/courses.vue';
import { BContainer, BCol, BRow } from 'bootstrap-vue-3';
export default {
  name: 'students',
  components: { StudentForm, Periods, Courses, BContainer, BCol, BRow }
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