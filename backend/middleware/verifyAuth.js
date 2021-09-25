const verifyAuth = async (req, res, next) => {
  try {
    const { user } = req.session;

    if (!user) {
      throw new Error('Not Authorized');
    }
    next();
  } catch (error) {
    res.status(401).send({ error: 'Unauthorized' });
  }
};

module.exports = verifyAuth;
