var mongoose = require('mongoose')
  , models = require('./models')
  , app = require('./index')
  , Monky     = require('monky')
  , monky     = new Monky(mongoose);

monky.factory('User', { name: '#n', username: 'username#n', password: '111', email: 'username#n@test.com', phone_number: '#n00-000-0000' }, function(err) {
	// Created a User.
});

monky.factory('Product', { name: '#n Product name', description: '#n Product Description' }, function(err) {
	// Create a Product.
});

monky.factory('UserProduct', { User: monky.ref('User'), Product: monky.ref('Product') }, function(err) {
	// Created a UserProduct.
});

module.exports = monky;