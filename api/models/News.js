const mailSend = require('../../lib/mail');
const ejs = require('ejs');

module.exports = {
  attributes: {
    title: 'string',
    description: 'string',
    details: 'string',
    page: {
      model: 'page'
    },
    image: 'json',
    date: 'date',
    enabled: 'boolean'
  },

  beforeUpdate: async function(values, cb) {
    const config = sails.config.website;
    const page = values.page;
    const subscribers = await Subscriber.find();
    let emails = [];

    subscribers.forEach(function (item) {
      emails.push(item.email);
    });

    try {
      await mailSend(page, emails);
      return 0;
    } catch (e) {
      return e;
    }

  }
};
