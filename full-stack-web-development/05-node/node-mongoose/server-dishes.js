var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected correctly to server");

  Dishes.create({
    name: 'Uthapizza',
    description: 'Test',
    image: 'images/uthapizza.png',
    category: 'mains',
    price: '4.99',
    comments: [
      {
        rating: 3,
        comment: 'This is insane',
        author: 'Matt Daemon'
      }
    ]
  }, function (err, dish) {
    if (err) throw err;
    console.log('Dish created!');
    console.log(dish);

    var id = dish._id;

    setTimeout(function () {
      Dishes.findByIdAndUpdate(id, {
        $set: {
          description: 'Updated Test',
          label: 'Hot'
        }
      }, {
        new: true
      }).exec(function (err, dish) {
        if (err) throw err;
        console.log('Updated Dish!');
        console.log(dish);

        dish.comments.push({
          rating: 5,
          comment: 'I\'m getting a sinking feeling!',
          author: 'Leonardo di Carpaccio'
        });

        dish.save(function (err, dish) {
          console.log('Updated Comments!');
          console.log(dish);

          db.collection('dishes').drop(function () {
            db.close();
          });
        });
      });
    }, 3000);
  });
});
