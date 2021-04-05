const { db } = require('../config');

const checkUserName = async (req, res, next) => {
  const { username } = req.body;

  const user = await db('users').first().where({ username });

  if (user) {
    res.status(409);
    return res.json({ error: `${username} already existed` });
  }

  next();
};

module.exports = checkUserName;
