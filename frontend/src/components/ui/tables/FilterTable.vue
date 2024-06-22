<template>
  <div>
    <b-input-group class="filtrar" prepend="Filtrar">
      <b-form-input v-model="filter" placeholder="Ingrese un término para filtrar"></b-form-input>
    </b-input-group>

    <b-table :items="filteredItems" :fields="fields" striped hover>
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
  </div>
</template>

<script>
export default {
  name: "FilterTablue",
  props: {
    items: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    delete: {
      type: Boolean,
      default: false,
      required: false,
    },
    edit: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      filter: "",
    };
  },
  mounted(){console.log(this.items);},
  computed: {
    filteredItems() {
      return this.items.filter((item) => {
        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(this.filter.toLowerCase())
        );
      });
    },
  },
  methods: {
    deleted(id) {
      console.log(id);
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
  border-radius: px;
}
</style>