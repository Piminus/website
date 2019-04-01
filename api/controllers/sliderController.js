module.exports = {
  index: async function (req, res) {
    try {
      const sliders = await Slider.find({enabled: true});
      return res.json(sliders);
    } catch (e) {
      return res.serverError(e);
    }
  }
};
