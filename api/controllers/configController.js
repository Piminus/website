module.exports = {
  index: async function(req, res) {
    const key = req.param('key');

    try {
      if (key) {
        const config = await Configuration.findByKey(key);

        return res.json(config);
      }

      if (!key) {
        const config = await Configuration.findAll();
        return res.json(config);
      }
    } catch (e) {
      return res.serverError();
    }

  }
};
