module.exports = {
  index: async function(req,res) {
    const title = req.param('title');

    if (!title) {
      return res.badRequest("Need title");
    }

    try {
      const page = await Page.findOne({
        title: title,
        enabled: true
      });

      if (!page) {
        return res.notFound();
      }
      return res.json(page);

    } catch (e) {
      return res.serverError(e);
    }
  }
};
