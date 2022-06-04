const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validateUrl = require('../validators/validateUrl');

const { getArticles, createArticle, deleteArticle} = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', createArticle);
router.delete('/:articleId', deleteArticle);

module.exports = router;