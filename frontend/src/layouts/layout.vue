<template>
  <div class="sidebar">
    <nav>
      <ul>
        <li>
          <router-link to="/">Inicio</router-link>
        </li>
        <li>
          <router-link to="/about">Acerca de</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  height: 100vh;
  background: #333;
  color: white;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar a {
  color: white;
  text-decoration: none;
}

.sidebar a.router-link-active {
  font-weight: bold;
}
</style>
