const fs = require('fs');
const path = require('path');

const loadRoutes = (app) => {
  const routesPath = path.join(__dirname, 'routes');

  fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('.js')) {
      const routePath = path.join(routesPath, file);
      const routeName = file.replace('.js', '');
      const router = require(routePath);

      app.use(`/api/${routeName}`, router);
      console.log(`Rutas cargadas: /api/${routeName}`);
    }
  });

  console.log('Todas las rutas de la API se han cargado.');
};

module.exports = loadRoutes;
