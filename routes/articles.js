const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validateUrl = require('../validators/validateUrl');

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().min(2),
    title: Joi.string().min(2),
    text: Joi.string().min(2),
    date: Joi.string().min(2),
    source: Joi.string().min(2),
    link: Joi.string().min(2).custom(validateUrl),
    image: Joi.string().min(2).custom(validateUrl),
  }),
}), createArticle);
router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex().length(24),
  }),
}), deleteArticle);

module.exports = router;
