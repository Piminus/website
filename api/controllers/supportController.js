const mailSend = require('../../lib/mail');
const ejs = require('ejs');
const fs = require('fs');

module.exports = {
  send: async function (req, res) {
    const config = sails.config.website;
    const name = req.param('name');
    const phone = req.param('phone');
    const text = req.param('text');
    const data = {
      name: name,
      phone: phone,
      text: text
    };

    if (!(name && phone && text)) {
      return res.badRequest("Need all fields");
    }

    await Support.create(data);


    fs.readFile(config.path.supportTemplate, async function (err, mail_file) {
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
