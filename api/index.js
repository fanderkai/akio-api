const app = require('../index');
const { createServer } = require('@vercel/node');

module.exports = createServer(app);
    