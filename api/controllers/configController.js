module.exports = {
  index: async function(req, res) {
    const key = req.param('key');

    try {
      if (key) {
        const config = await Configuration.findOneByKey(key);
        if (!config) {
          return res.badRequest("Ivalid key");
        }
          let value = config.value;

          return res.json(value);
      }

      if (!key) {
        const config = await Configuration.findAll();
        return res.json(config);
      }
    } catch (e) {
      return res.serverError(e);
    }

  }
};
