module.exports = {
  index: async function (req, res) {
    const title = req.param('title');

    try {
      if (title) {
        const navigation = await Navigation.findOne({
          title: title,
          enabled: true
        });
        if (!navigation) {
          return res.notFound('Not found navigation with given title')
        }

        return res.json(navigation);
      }
      else {
        const all = await Navigation.find();
        return res.json(all);
      }
    } catch (e) {
      return res.serverError();

    }
  }
};
