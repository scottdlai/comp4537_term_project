const { db } = require('../config/');

const incrementAPI = (apiName) => async (req, res, next) => {
  await db('admin').where({ apiName }).increment('count', 1);
  next();
};

module.exports = incrementAPI;
