var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/passport-db");

mongoose.set("debug", true);

module.exports.User = require("./user");
