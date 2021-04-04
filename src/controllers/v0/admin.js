const { db } = require('../../config');

const getAPICounts = async (req, res) => {
  try {
    const apiCounts = await db('admin').select().orderBy('apiName');

    res.status(200);
    res.json({ apiCounts });
  } catch (err) {
    res.status(500);
    res.json({ err });
  }
};

module.exports = { getAPICounts };
