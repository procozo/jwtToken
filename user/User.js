var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  email: String,
  name:String,
  password: String,
  timeStamp: Date,
  token:String
});

mongoose.model("User", userSchema);

module.exports = mongoose.model("User");
