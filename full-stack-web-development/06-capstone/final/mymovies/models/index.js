var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var uristring =
  process.env.MONGOLAB_SILVER_URI ||
  process.env.MONGODB_URI         ||
  process.env.MONGOLAB_URI        ||
  process.env.MONGOHQ_URL         ||
  "mongodb://localhost/passport-db";

mongoose.connect(uristring);

mongoose.set("debug", true);

module.exports.User = require("./user");
