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

    if (!name) {
      return res.badRequest("Введите имя");
    }
    if (!phone) {
      return res.badRequest("Введите телефон");
    }

    await Feedback.create(data);

    fs.readFile(config.path.feedbackTemplate, async function (err, mail_file) {
      if (err) return res.serverError(err);
      mail_file = mail_file.toString('utf-8');
      const str = ejs.render(mail_file, data);

      try {
        await mailSend(str, config.email.support);
        return res.ok();
      } catch (e) {
        res.serverError(e);
      }
    });
  }
};
