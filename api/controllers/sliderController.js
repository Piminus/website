module.exports = {
  index: async function(req, res) {
    try {
      const sliders = await Slider.find({enabled: true});
      if (sliders) {
        return res.json()
      } else {
        return res.serverError('Enabled sliders not found');
      }
  } catch (e) {
      return res.serverError();
    }
  }
};
