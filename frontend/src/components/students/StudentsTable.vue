<template>
    <div>
        <uiCard>
            <h4>Estudiantes</h4>
            <filter-table v-if="!loading" :items="students" :fields="fields" :periods="periods" :courses="courses"
                :currentPage="currentPage" :filters="true" :totalItems="totalItems" @item-deleted="deleteStudent"
                @item-edit="editStudent" :edit="true" @filter-changed="fetchStudents" :delete="true">
            </filter-table>
            <b-skeleton-table v-else :rows="5" :columns="4"
                :table-props="{ bordered: true, striped: true }"></b-skeleton-table>
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
            loading: false,
            allStudent: [],
            students: [],
            courses: [],
            periods: [],
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
            currentPage: 1,
            totalPages: 1,
            totalItems: 1
        };
    },
    created() {
        this.fetchAllData();
    },
    methods: {
        async fetchAllData() {
            this.loading = true;
            try {
                await Promise.all([
                    this.fetchStudents(),
                    this.fetchCourses(),
                    this.fetchPeriods(),
                ]);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                this.loading = false;
            }
        },
        fetchStudents(active_filters) {
            try {
                this.loading = true;
                let filterParams = '';
                if (active_filters != undefined) {
                    let claves = Object.keys(active_filters);
                    for (let i = 0; i < claves.length; i++) {
                        let clave = claves[i];
                        if (i === 0) {
                            if(active_filters[clave] != null){
                                filterParams = '?' + clave + '=' + active_filters[clave]
                            }
                        } else {
                            if(active_filters[clave] != null){
                                filterParams = filterParams + '&&' + clave + '=' + active_filters[clave]
                            }
                        }
                    }
                }

                this.$axios.get(`/_/students${filterParams}`).then(response => {
                    const { data, totalItems, totalPages } = response.data;
                    this.allStudent = data;
                    this.students = data.map(student => ({
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
                    this.totalPages = totalPages;
                    this.totalItems = totalItems;
                }).catch(error => {
                    console.error('Error fetching students:', error);
                });
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                this.loading = false;
            }
        },
        fetchCourses() {
            this.$axios.get('/_/courses').then(response => {
                this.courses = response.data.map(course => ({
                    value: course.id,
                    text: course.course_name,
                }));
            });
        },
        async fetchPeriods() {
            await this.$axios.get('/_/periods').then(response => {
                this.periods = response.data.map(period => ({
                    value: period.id,
                    text: period.period,
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
            this.fetchStudents();
        },
    },
};
</script>
