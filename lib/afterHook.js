const pageController = require('../api/controllers/pageController');
const mailController = require('../api/controllers/mailController');
const galleryController = require('../api/controllers/galleryController');
const navController = require('../api/controllers/navController');
const configController = require('../api/controllers/configController');
const sliderController = require('../api/controllers/sliderController');





module.exports = function (sails) {
  return function afterHooksLoaded() {
    const baseRoute = "/api/website/";

    sails.router.bind(baseRoute + 'page/:title', pageController.index);
    sails.router.bind(baseRoute + 'email', mailController.subscribe);
    sails.router.bind(baseRoute + 'gallery', galleryController.index);
    sails.router.bind(baseRoute + 'nav', navController.index);
    sails.router.bind(baseRoute + 'config', configController.index);
    sails.router.bind(baseRoute + 'slider', sliderController.index);





  }
};
