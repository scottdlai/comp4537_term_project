const { db } = require('../../config');

const getAPICounts = async (req, res) => {
  try {
    const apiCounts = await db('admin').select();

    res.status(200);
    res.json({ apiCounts });
  } catch (err) {
    res.status(501);
    res.json({ err });
  }
};

module.exports = { getAPICounts };
