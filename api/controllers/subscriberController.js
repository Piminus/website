module.exports = {
  subscribe: async function(req, res) {
    const email = req.param('email');
    let reg = new RegExp('\\w+@\\w+.\\w+');

    if (!reg.test(email)) {
      return res.badRequest("E-mail address is invalid");
    }

    try {
      const newRecord = await Mail.create({email: email});
      sails.log.info(newRecord);
      return res.ok();
    } catch (e) {
      return res.serverError(e);
    }
  }
};
