<template>
  <div id="dashboard">
    <dashboard-sidebar :isCollapsed="isCollapsed" @toggleSidebar="toggleSidebar" />
    <div id="content" :class="{ 'expanded': isCollapsed }">
      <router-view :key="routerViewKey" />
    </div>
  </div>
</template>

<script>
import DashboardSidebar from '@/components/sidebar/sidebar.vue';

export default {
  components: {
    DashboardSidebar
  },
  data() {
    return {
      routerViewKey: this.$route.fullPath,
      isCollapsed: false // Estado inicial del sidebar, expandido
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    }
  },
  watch: {
    $route(to) {
      this.routerViewKey = to.fullPath;
    }
  }
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; 
}

#dashboard {
  display: flex;
  height: 100vh; 
}

#content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f4f4f4;
  transition: margin-left 0.3s;
  margin-left: 200px; /* Mismo ancho que la sidebar */
}

#content.expanded {
  margin-left: 60px; /* Mismo ancho que la sidebar en estado colapsado */
}

#content h1, #content p {
  margin: 20px;
}

#content input {
  display: block;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
