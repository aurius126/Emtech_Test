<template>
  <div>
    <b-input-group class="filtrar" prepend="Filtrar">
      <b-form-input v-model="filter" @input="debouncedApplyFilter" placeholder="Ingrese un término para filtrar">
      </b-form-input>
    </b-input-group>

    <b-form-group v-if="filters">
      <b-form-select v-model="selectedPeriod" :options="periods">
        <template #first>
          <b-form-select-option :value="null">Seleccione el período</b-form-select-option>
        </template>
      </b-form-select>
    </b-form-group>

    <b-form-group v-if="filters">
      <b-form-select v-model="selectedCourse" :options="courses">
        <template #first>
          <b-form-select-option :value="null">Seleccione el curso</b-form-select-option>
        </template>
      </b-form-select>
    </b-form-group>

    <b-table responsive :items="items" :fields="fields" striped hover>
      <template #cell(Name)="data">
        {{ data.item.first_name }} {{ data.item.second_name }} {{ data.item.surname }} {{ data.item.lastname }}
      </template>
      <template #cell(Action)="data">
        <b-button v-if="delete" size="sm" variant="danger" @click="deleted(data.item.id)">
          <font-awesome-icon :icon="['fas', 'trash']" style="color: white;" />
        </b-button>
        <b-button v-if="edit" size="sm" variant="warning" @click="edited(data.item.id)">
          <font-awesome-icon :icon="['fas', 'pencil']" style="color: white;" />
        </b-button>
      </template>
      <template #cell(Status)="data">
        {{ data.item.active ? 'Activo' : 'Inactivo' }}
      </template>
    </b-table>

    <b-pagination v-model="currentPage" :total-rows="totalItems" :per-page="itemsPerPage" aria-controls="my-table">
    </b-pagination>
  </div>
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: "FilterTable",
  props: {
    items: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    filters: {
      type: Boolean,
      default: false,
    },
    periods: {
      type: Array,
      default: () => ([]),
    },
    courses: {
      type: Array,
      default: () => ([]),
    },
    delete: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      filter: "",
      active_filters: {},
      itemsPerPage: 10,
      currentPage: 1,
      selectedPeriod: null,
      selectedCourse: null
    };
  },
  watch: {
    selectedPeriod(newVal) {
        this.active_filters.period = newVal;
        this.$emit('filter-changed', this.active_filters);
    },
    selectedCourse(newVal) {
        this.active_filters.course = newVal;
        this.$emit('filter-changed', this.active_filters);
    },
    currentPage(newVal) {
        this.active_filters.page = newVal;
        this.$emit('filter-changed', this.active_filters);
    }
  },
  methods: {
    applyFilter() {
      this.active_filters.q = this.filter;
      this.$emit('filter-changed', this.active_filters);
    },
    
    debouncedApplyFilter: debounce(function() {
      this.applyFilter();
    }, 300),
    deleted(id) {
      this.$emit('item-deleted', id);
    },
    edited(id) {
      this.$emit('item-edit', id);
    },
  },
};
</script>

<style scoped>
.filtrar {
  margin-bottom: 10px;
}

.filter-select {
  margin-bottom: 10px;
}
</style>
