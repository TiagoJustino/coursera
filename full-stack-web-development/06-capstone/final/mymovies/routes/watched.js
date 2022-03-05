var db = require("../models");

module.exports = function(app, passport) {
  app.post("/watched", function(req, res) {
    var id = req.body.id;
    var user = req.user;
    if(user.watched.indexOf(id) >= 0) {
      res.sendStatus(200);
    } else {
      db.User.findByIdAndUpdate(
        user._id,
        { $push: { watched: id} },
        { new: true },
        function(err, newUser) {
          if (err) return handleError(err);
          res.send(newUser);
        }
      );
    }
  });

  app.delete("/watched/:id", function(req, res) {
    var id = req.params.id;
    var user = req.user;
    console.log('deleting', id);
    if(user.watched.indexOf(id) < 0) {
      console.log('not present');
      res.sendStatus(200);
    } else {
      db.User.findByIdAndUpdate(
        user._id,
        { $pull: { watched: id} },
        { new: true },
        function(err, newUser) {
          if (err) return handleError(err);
          console.log('deleted', id);
          res.send(newUser);
        }
      );
    }
  });
};
