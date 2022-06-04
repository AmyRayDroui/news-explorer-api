const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validateUrl = require('../validators/validateUrl');

const { getCurrentUser } = require('../controllers/users');

router.get('/me', getCurrentUser);

module.exports = router;