const expressAsyncHandler = require("express-async-handler");
const emailMessaging = require("../../models/emailMessaging/emailMessaging");
const sendEmail = require("../../utils/sendEmail");
const Filter = require("bad-words");
exports.sendEmailMsg = expressAsyncHandler(async (req, res) => {
  const { email, message, subject } = req.body;
  const filter = new Filter();
  const emailMessage = email + " " + message + " " + subject;
  const isProfane = filter.isProfane(emailMessage);
  if (isProfane) {
    throw new Error("Email sent failed because it contains profane words");
  }
  try {
    console.log(isProfane);
    // send msg
    await sendEmail({
      email,
      subject,
      message,
    });
    // save in db;
    const createdEmail = new emailMessaging({
      sentBy: req?.user?._id,
      fromEmail: req?.user?.email,
      toEmail: email,
      message,
      subject,
    });
    await createdEmail.save();
    res.json("Mail sent");
  } catch (err) {
    res.json(err);
  }
});
