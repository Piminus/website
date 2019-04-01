module.exports = async function (req, res) {
  const sort = req.param('sort') || 'date';
  let page = req.param('page') || 1;
  const reverse = req.param('reverse');

  try {
    page = +page;
  } catch (e) {
    return res.badRequest('Page must be an integer');
  }

  const config = sails.config.website;
  const limit = config.news.pagination;

  try {
    const news = await News.find({enabled: true}).sort(sort + (reverse ? " DESC" : "")).skip(limit * (page - 1)).limit(limit);
    return res.json(news);
  } catch (e) {
    return res.serverError(e);
  }
};
