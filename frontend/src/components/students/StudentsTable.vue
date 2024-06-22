<template>
    <div>
        <uiCard>
            <h4>Estudiantes</h4>
            <filter-table :items="students" :fields="fields" @item-deleted="deleteStudent" @item-edit="editStudent"
                :edit="true" :delete="true"></filter-table>
        </uiCard>
        <b-modal v-model="showModal" title="Editar Estudiante">
            <StudentForm :initialData="selectedStudent" :editing="true" @save="handleSave"></StudentForm>
        </b-modal>
    </div>
</template>

<script>
import FilterTable from "@/components/ui/tables/FilterTable.vue";
import uiCard from "@/components/ui/cards/uiCard.vue";
import StudentForm from '@/components/students/form.vue';

export default {
    name: "TableConfig",
    components: {
        FilterTable,
        uiCard,
        StudentForm,
    },
    data() {
        return {
            allStudent: [],
            students: [],
            fields: [
                { key: "ID", label: "ID" },
                { key: "Name", label: "Nombre" },
                { key: "email", label: "Correo" },
                { key: "phone", label: "Telefono" },
                { key: "period", label: "Periodo" },
                { key: "course_name", label: "Curso" },
                { key: "percent", label: "Porcentaje" },
                { key: "Status", label: "Estatus" },
                { key: "Action", label: "Acción" },
            ],
            showModal: false,
            selectedStudent: null,
        };
    },
    created() {
        this.fetchStudents();
    },
    methods: {
        fetchStudents() {
            this.$axios.get('/_/students').then(response => {
                this.allStudent = response.data;
                this.students = response.data.map(student => ({
                    id: student.id,
                    first_name: student.first_name,
                    second_name: student.second_name,
                    surname: student.surname,
                    lastname: student.lastname,
                    email: student.email,
                    phone: student.phone,
                    period: student.period_name,
                    course_name: student.course_name,
                    percent: `${student.percent}%`,
                    active: student.active
                }));
            });
        },
        deleteStudent(id) {
            this.$axios.delete(`/_/students/${id}`).then(() => {
                this.students = this.students.filter(student => student.id !== id);
            });
        },
        editStudent(id) {

            const student = this.allStudent.find(student => student.id === id);
            if (student) {
                this.selectedStudent = {
                    id: student.id,
                    first_name: student.first_name,
                    second_name: student.second_name,
                    surname: student.surname,
                    lastname: student.lastname,
                    email: student.email,
                    phone: student.phone,
                    active: student.active,
                    percent: student.percent,
                    course: student.course,
                    period: student.period,
                };
                this.showModal = true;
            } else {
                console.error(`No se encontró estudiante con ID: ${id}`);
            }
        },
        handleSave() {
            console.log('Guardando cambios...');
            this.showModal = false;
        },
    },
};
</script>
