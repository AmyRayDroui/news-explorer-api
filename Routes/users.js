const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validateUrl = require('../validators/validateUrl');

router.get('/me');

module.exports = router;