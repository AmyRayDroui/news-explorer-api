const User = require('../models/user');

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      //next(new InvalidDataError('wrong data'));
      console.log('InvalidDataError')
    }
    next(new Error('Server Error'));
  }
};