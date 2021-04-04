const swaggerJSON = require('../../docs/v0/swagger.json');

const getDocs = (req, res) => res.json(swaggerJSON);

module.exports = { getDocs };
