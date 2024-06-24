<template>
    <div>
        <uiCard>
            <h4>Cursos</h4>
            <FilterTable :items="courses" :currentPage="currentPage" :totalItems="totalItems" :fields="fields" @item-deleted="removeCourse" :delete="true"></FilterTable>
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
            allCourses: [],
            fields: [
                { key: "id", label: "ID" },
                { key: "course_name", label: "Curso" },
                { key: "Action", label: "Acción" },
            ],
            currentPage: 1,
            totalPages: 1,
            totalItems: 1
        };
    },
    created() {
        this.fetchCourses();
    },
    methods: {
        fetchCourses() {
            this.$axios.get('/_/courses/paginate').then(response => {
                const { data, totalItems, totalPages } = response.data;
                this.allCourses = data;
                this.courses = data.map(course => ({
                    id: course.id,
                    course_name: course.course_name
                }));
                this.totalPages = totalPages;
                this.totalItems = totalItems;
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
