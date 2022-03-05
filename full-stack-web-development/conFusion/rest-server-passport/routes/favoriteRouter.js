var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');

var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

var getUserFavorite = function(userId, cb) {
}

favoriteRouter.route('/')
  .get(function (req, res, next) {
    Favorites.find({postedBy: req.decoded._doc._id})
      .populate('postedBy')
      .populate('dishes')
      .exec(function (err, favorites){
      if (err) return next(err);
      if (favorites.length === 0){
        res.json(null);
      } else {
        favorite = favorites[0];

        res.json(favorite);
      }
    });
  })

  .post(function (req, res, next) {
    Favorites.find({postedBy: req.decoded._doc._id}, function (err, favorites) {
      if(favorites.length === 1) {
        favorite = favorites[0];
        favorite.dishes.push(req.body._id);
        favorite.save(function(err, resp){
          if (err) return next(err);
          res.json(resp);
        });
      } else {
        Favorites.create({postedBy: req.decoded._doc._id}, function(err, favorite){
          favorite.dishes.push(req.body._id);
          favorite.save(function(err, resp){
            if (err) return next(err);
            res.json(resp);
          });
        });
      }
    });
  })

  .delete(function (req, res, next) {
    Favorites.find({postedBy: req.decoded._doc._id}, function (err, favorites) {
      if(favorites.length === 0) {
        res.json(null);
      } else {
        Favorites.remove({postedBy: req.decoded._doc._id}, function (err, resp) {
          if (err) return next(err);
          res.json(favorites[0]);
        });
      }
    });
  });

favoriteRouter.route('/:dishObjectId')
  .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.find({postedBy: req.decoded._doc._id}, function (err, favorites) {
      if (err) return next(err);
      if (favorites.length === 0) return res.json(null);
      var favorite = favorites[0];
      var index = favorite.dishes.indexOf(req.params.dishObjectId);
      if(index > -1) {
        favorite.dishes.splice(index, 1);
        favorite.save(function(err, resp){
          if (err) return next(err);
          res.json(favorite);
        });
      } else {
        res.json(favorite);
      }
    });
  });

module.exports = favoriteRouter;
