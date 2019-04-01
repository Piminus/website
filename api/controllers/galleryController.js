module.exports = {
  index: async function (req, res) {
    const title = req.param('title');

    try {
      if (title) {
        const gallery = await Gallery.findOne({
          title: title,
          enabled: true
        });
        if (!gallery) {
          return res.notFound('Not found gallery with given title')
        }

        return res.json(gallery);
      }
      else {
        const all = await Gallery.find();
        return res.json(all);
      }
    } catch (e) {
      return res.serverError(e);
    }
  }
};
