const Article = require('../models/article');
const InvalidDataError = require('../errors/invalid-data-err');
const NotAuthorizedError = require('../errors/not-authorized-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id });
    res.send(articles);
  } catch (err) {
    next(new Error('Server Error'));
  }
};

module.exports.createArticle = async (req, res, next) => {
  try {
    const { keyword, title, text, date, source, link, image } = req.body;
    const owner = req.user._id;
    const article = await Article.create({ keyword, title, text, date, source, link, image, owner });
    res.send(article);
  } catch (err) {
    if (err.name === 'TypeError') {
      next(new InvalidDataError('invalid data passed to the methods for creating a article'));
    } else {
      next(new Error('Server Error'));
    }
  }
};

module.exports.deleteArticle = async (req, res, next) => {
  try {
    const searchArticle = await Article.findById(req.params.articleId);
    if (searchArticle === null) {
      console.log('Article not found');
      next(new NotFoundError('Article not found'));
    }
    if (req.user._id !== searchArticle.owner.toHexString()) {
      next(new NotAuthorizedError('Not the owner of the Article'));
    }
    const card = await Card.findByIdAndRemove(req.params.id);
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new InvalidDataError('invalid Article'));
    }
    next(new Error('Server Error'));
  }
};