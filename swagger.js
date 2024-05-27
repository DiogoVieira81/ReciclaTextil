const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Admin API',
      version: '1.0.0',
      description: 'API para administração',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },  apis: ['./src/routes/*js'], // Caminho para o arquivo de rotas
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
