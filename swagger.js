const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'API Documentation for the Singers and Albums collections.',
  },
  host: 'cse341-node-project2-h4kd.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
