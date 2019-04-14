module.exports = async function (req, res) {
  const email = req.param('email');
  let reg = new RegExp('\\w+@\\w+.\\w+');

  if (!reg.test(email)) {
    return res.badRequest("E-mail address is invalid");
  }

  try {
    let subscriber = await Subscriber.findOne({email: email});
    subscriber.isDeleted = true;
    subscriber.save();
    return res.ok();
  } catch (e) {
    return res.serverError(e);
  }

};
