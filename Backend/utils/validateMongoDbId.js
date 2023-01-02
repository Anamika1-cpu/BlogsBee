const mongoose = require("mongoose");

const validateMongodbId = (id) => {
  const isValid = mongoose.isValidObjectId(id);
  if (!isValid) {
    throw new Error("Invalid ObjectId");
  }
};

module.exports = validateMongodbId;
