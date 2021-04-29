const mongoose = require("mongoose");

const fileUploadSchema = mongoose.Schema({
  nationality: String,
  address: String,
  country: String,
  postal:String,
  email: String,
  mobile:String,
  exception:String,
  status:String
});

module.exports = mongoose.model("Upload", fileUploadSchema);
