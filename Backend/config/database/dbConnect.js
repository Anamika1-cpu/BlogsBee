const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const db = process.env.MONGODB_URI;
const dbConnect = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Db is connected successfully`);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = dbConnect;
