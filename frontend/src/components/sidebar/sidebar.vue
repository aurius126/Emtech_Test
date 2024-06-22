<template>
  <div :class="['sidebar-content', { 'collapsed': isCollapsed }]">
    <button @click="toggleSidebar" class="toggle-button">
      <span v-if="!isCollapsed">➖</span>
      <span v-else>➕</span>
    </button>
    <img v-if="!isCollapsed" src="https://salesforce.emtech.digital/pr-lat/assets/img/logoEmtechAzules.svg" alt="Emtech">
    <nav>
      <ul>
        <li v-for="item in menuItems" :key="item.path">
          <router-link 
            :to="item.path" 
            :class="{ 'active': $route.path === item.path }">
          <div>
            <div v-if="!isCollapsed">
              {{ item.label }}
            </div>
            <font-awesome-icon v-else :icon="['fas', item.icon]" style="color: grey; padding-right: 10px;"/>
          </div>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'DashboardSidebar',
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menuItems: [
        { path: '/', label: 'Dashboard', icon: 'dashboard' },
        { path: '/students', label: 'Estudiantes', icon: 'user' },
        { path: '/form-data', label: 'Formularios', icon: 'book' },
        { path: '/table-data', label: 'Cursos y periodos', icon: 'table' },
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar');
    }
  }
};
</script>

<style scoped>
.sidebar-content {
  width: 200px; /* Ancho de la sidebar */
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  box-sizing: border-box;
  transition: width 0.3s;
  background-color: white; /* Fondo blanco */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

.sidebar-content.collapsed {
  width: 60px;
}

.sidebar-content h2 {
  margin: 0;
  padding: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #2c3e50;
  color: white;
}

.sidebar-content nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-content nav ul li {
  margin: 10px 0;
}

.sidebar-content nav ul li a {
  color: #34495e;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 10px 20px;
  display: block;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.sidebar-content nav ul li a:hover {
  background-color: rgba(26, 188, 156, 0.2); /* Hover efecto */
}

.sidebar-content nav ul li a.active {
  background-color: rgba(52, 152, 219, 0.6); /* Fondo azul opaco para la opción seleccionada */
}

.toggle-button {
  background: none;
  border: none;
  color: #2c3e50;
  font-size: 1.5rem;
  padding: 10px;
  cursor: pointer;
  text-align: left;
}

.toggle-button:focus {
  outline: none;
}
</style>
