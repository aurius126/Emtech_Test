<template>
    <div class="table-responsive">
      <b-table
        striped
        hover
        :items="items"
        table-variant="light"
        responsive="sm"
      ></b-table>
    </div>
  </template>
  
  <script>
  import { BTable } from 'bootstrap-vue-3';
  
  export default {
    components: {
      BTable
    },
    props: {
      items: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }
  
  .table-responsive::-webkit-scrollbar {
    height: 8px;
  }
  
  .table-responsive::-webkit-scrollbar-thumb {
    background: #cccccc;
    border-radius: 4px;
  }
  </style>
  