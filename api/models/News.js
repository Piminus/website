const mailSend = require('../../lib/mail');
const ejs = require('ejs');
const fs = require('fs');


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
    enabled: 'boolean',
    mailing: {
      type: 'boolean',
      defaultsTo: false
    }
  },

  beforeUpdate: async function (values, cb) {
    if (values.mailing) {
      return await mailing(values, cb);
    }
  },

  beforeCreate: async function (values, cb) {
    if (values.mailing) {
      return await mailing(values, cb);
    }
  }
};

async function mailing(values, cb) {
  const config = sails.config.website;
  const id = values.page;
  const page = await Page.findOne({id: id});
  const data = {
    link: page.link
  };
  sails.log.error(data);
  const subscribers = await Subscriber.find();
  let emails = [];

  subscribers.forEach(function (item) {
    emails.push(item.email);
  });

  fs.readFile(config.path.newsTemplate, async function (err, mail_file) {
    if (err) return res.serverError(err);
    mail_file = mail_file.toString('utf-8');
    console.log(mail_file + " mail_file");
    const str = ejs.render(mail_file, data);
    sails.log(str + " rendered");

    try {
      await mailSend(str, emails);
      return cb();
    } catch (e) {
      return e;
    }

  });
}



