var mongoose = require('mongoose')
  , async = require('async')
  , Product = mongoose.model('Product')
  , User = mongoose.model('User')
  , UserProduct = mongoose.model('UserProduct')

/**
 * Clear database
 *
 * @param {Function} done
 * @api public
 */

exports.clearDb = function (done) {
  // Use this to turn off all tests. 
  // return done();

  async.parallel([
    function (cb) {
      User.collection.remove(cb)
    },
    function (cb) {
      Product.collection.remove(cb)
    },
    function (cb) {
      UserProduct.collection.remove(cb)
    }
  ], done)
}