const mailSend = require('../../lib/mail');
const ejs = require('ejs');
const fs = require('fs');

module.exports = {
  send: async function (req, res) {
    const config = sails.config.website;
    const name = req.param('name');
    const phone = req.param('phone');
    const data = {
      name: name,
      phone: phone
    };

    if (!(name && phone)) {
      return res.badRequest();
    }

    await Feedback.create(data);

    fs.readFile(config.path.feedbackTemplate, async function (err, mail_file) {
      if (err) return res.serverError(err);
      mail_file = mail_file.toString('utf-8');
      console.log(mail_file + " mail_file");
      const str = ejs.render(mail_file, data);
      sails.log(str + " rendered");

      try {
        sails.log('mail');
        await mailSend(str, config.email.support);
        return res.ok();
      } catch (e) {
        res.serverError(e);
      }
    });
  }
};
