const pageController = require('../api/controllers/pageController');
const subscriberController = require('../api/controllers/subscriberController');
const galleryController = require('../api/controllers/galleryController');
const navController = require('../api/controllers/navController');
const configController = require('../api/controllers/configController');
const sliderController = require('../api/controllers/sliderController');
const feedbackController = require('../api/controllers/feedbackController');
const supportController = require('../api/controllers/supportController');
const newsController = require('../api/controllers/newsController');


module.exports = function (sails) {
  return function afterHooksLoaded() {
    const baseRoute = "/api/website/";

    sails.router.bind(baseRoute + 'page/:title', pageController.index);
    sails.router.bind(baseRoute + 'subscriber', subscriberController.subscribe);
    sails.router.bind(baseRoute + 'gallery', galleryController.index);
    sails.router.bind(baseRoute + 'nav', navController.index);
    sails.router.bind(baseRoute + 'config', configController.index);
    sails.router.bind(baseRoute + 'slider', sliderController.index);
    sails.router.bind(baseRoute + 'feedback', feedbackController.send);
    sails.router.bind(baseRoute + 'support', supportController.send);
    sails.router.bind(baseRoute + 'news', newsController);








  }
};
