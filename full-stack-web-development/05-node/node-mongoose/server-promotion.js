var mongoose = require('mongoose');
var assert = require('assert');

var Promotions = require('./models/promotions');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected correctly to server");

  Promotions.create({
    name: 'Weekend Grand Buffet',
    image: 'images/buffet.png',
    price: '19.99',
    description: 'Test',
    label: 'Old'
  }, function (err, promotion) {
    if (err) throw err;
    console.log('Promotion created!');
    console.log(promotion);

    var id = promotion._id;

    setTimeout(function () {
      Promotions.findByIdAndUpdate(id, {
        $set: {
          description: 'Featuring . . .',
          label: 'New'
        }
      }, {
        new: true
      }).exec(function (err, promotion) {
        if (err) throw err;
        console.log('Updated Promotion!');
        console.log(promotion);

        db.collection('promotions').drop(function () {
          db.close();
        });
      });
    }, 3000);
  });
});
