<template>
    <div>
        <uiCard>
            <h4>Cursos</h4>
            <FilterTable :items="courses" :fields="fields" @item-deleted="removeCourse" :delete="true"></FilterTable>
        </uiCard>
    </div>
</template>

<script>
import FilterTable from '@/components/ui/tables/FilterTable.vue';
import uiCard from "@/components/ui/cards/uiCard.vue";

export default {
    name: 'CourseTable',
    components: {
        FilterTable,
        uiCard
    },
    data() {
        return {
            courses: [],
            fields: [
                { key: "id", label: "ID" },
                { key: "course_name", label: "Curso" },
                { key: "Action", label: "Acción" },
            ],
        };
    },
    created() {
        this.fetchCourses();
    },
    methods: {
        fetchCourses() {
            this.$axios.get('/_/courses').then(response => {
                this.courses = response.data.map(course => ({
                    id: course.id,
                    course_name: course.course_name
                }));
            });
        },
        removeCourse(id) {
            this.$axios.delete(`/_/courses/${id}`).then(() => {
                this.courses = this.courses.filter(course => course.id !== id);
            });
        },
        editCourse(id) {
            console.log(`Editar curso con ID: ${id}`);
        },
    },
};
</script>
