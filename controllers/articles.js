const Article = require('../models/article');
const InvalidDataError = require('../errors/invalid-data-err');
const NotAuthorizedError = require('../errors/not-authorized-err');
const NotFoundError = require('../errors/not-found-err');

const {
  INVALID_DATA_ARTICLE_ERROR_MESSAGE, ARTICLE_NOT_FOUND_ERROR_MESSAGE,
  INVALID_ARTICLE_ERROR_MESSAGE, SERVER_ERROR_MESSAGE, NOT_AUTHORIZED_ARTICLE_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id });
    res.send(articles);
  } catch (err) {
    next(new Error(SERVER_ERROR_MESSAGE));
  }
};

module.exports.createArticle = async (req, res, next) => {
  try {
    const {
      keyword, title, text, date, source, link, image,
    } = req.body;
    const owner = req.user._id;
    const article = await Article.create({
      keyword, title, text, date, source, link, image, owner,
    });
    res.send(article);
  } catch (err) {
    if (err.name === 'TypeError') {
      next(new InvalidDataError(INVALID_DATA_ARTICLE_ERROR_MESSAGE));
    } else {
      next(new Error(SERVER_ERROR_MESSAGE));
    }
  }
};

module.exports.deleteArticle = async (req, res, next) => {
  try {
    const searchArticle = await Article.findById(req.params.articleId);
    if (searchArticle === null) {
      next(new NotFoundError(ARTICLE_NOT_FOUND_ERROR_MESSAGE));
    }
    if (req.user._id !== searchArticle.owner.toHexString()) {
      next(new NotAuthorizedError(NOT_AUTHORIZED_ARTICLE_ERROR_MESSAGE));
    }
    const card = await Article.findByIdAndRemove(req.params.id);
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new InvalidDataError(INVALID_ARTICLE_ERROR_MESSAGE));
    }
    next(new Error(SERVER_ERROR_MESSAGE));
  }
};
