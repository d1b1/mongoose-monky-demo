var mongoose = require('mongoose')
  , should = require('should')
  , request = require('supertest')
  , models = require('../models')
  , app = require('../index')
  , _ = require('underscore')
  , monky = require('../monky');

var User = mongoose.model('User')
  , Product = mongoose.model('Product')
  , UserProduct = mongoose.model('UserProduct')

/** Users tests **/

before(function(done) {
  require('../mocha_helper').clearDb(done);
})

describe('Users', function () {

  // Create a User.
  before(function(done) {
    monky.createList('User', 5, done);
  })

  // Create a UserProduct.
  before(function(done) {
    monky.create('UserProduct', done)
  })

  describe('Users', function () {
    it('should get a user list', function(done) {
      User.list({}, function(err, list) {
        list.length.should.equal(6)
        done();
      })
    })
  })

  describe('UserProduct', function () {
    it('should get a user product', function(done) {
      UserProduct.list({}, function(err, list) {
        list.length.should.equal(1)
        done();
      })
    })
  })

  describe('UserProduct', function () {
    it('should get a user product', function(done) {
      UserProduct.findOne(function(err, userproduct) {

        UserProduct.load(userproduct.id, function(err, data) {
          data.Product.name.should.equal('1 Product name')
          done()
        });

      })
    })
  })
});