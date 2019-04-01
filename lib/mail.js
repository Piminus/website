const email = require('emailjs/email');

module.exports = async function (mail, address) {
  const config = sails.config.website;
  const server = email.server.connect(config.email.server);
  sails.log('mail init');

  let message = {
    from: config.email.server.user,
    to: address,
    subject: "testing emailjs",
    attachment:
      [
        {data: mail, alternative: true}
      ]
  };

  server.send(message, function (err, message) {
    console.log(err || 'mail sended');
  });
};
