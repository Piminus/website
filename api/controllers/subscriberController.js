module.exports = {
  subscribe: async function (req, res) {
    const email = req.param('email');
    let reg = new RegExp('\\w+@\\w+\\.\\w+');

    if (!reg.test(email)) {
      return res.badRequest("E-mail address is invalid");
    }
    try {
      let subscriber = await Subscriber.findOne({email: email});

      if (subscriber) {
        if (subscriber.isDeleted) {
          subscriber.isDeleted = false;
          subscriber.save();
          return res.ok();
        } else {
          return res.ok();
        }
      }

      else {
        await Subscriber.create({email: email});
        return res.ok();
      }
    } catch (e) {
      return res.serverError(e);
    }
  }
};
