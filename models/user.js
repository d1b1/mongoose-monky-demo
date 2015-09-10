var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;
var _ = require('underscore');
var moment = require('moment');

/* Schema */

var schema = new Schema({
  name              : { type: String, default: '', trim : true },
  email             : { type: String, default: '', trim : true },
  username          : { type: String, default: '', index: true },
  phone_number      : { type: String, default: '', index: true },
  hashed_password   : { type: String, default: '' },
  salt              : { type: String, default: '' },
  authToken         : { type: String, default: '' },
  avatarUrl         : { type: String, default: '', trim : true },

  // Dates
  createdAt         : { type : Date, default : Date.now },
  updatedAt         : { type : Date, default : Date.now }

}, { autoIndex: false });

/* Virtuals */

schema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() { return this._password });

/* Validations */

var validatePresenceOf = function (value) {
  return value && value.length;
};

// the below 5 validations only apply if you are signing up traditionally

schema.path('name').validate(function (name) {
  return name.length;
}, 'Name cannot be blank');

schema.path('email').validate(function (email) {
  return email.length;
}, 'Email cannot be blank');

schema.path('phone_number').validate(function (phone_number) {
  return phone_number.length;
}, 'Phone Number cannot be blank');

schema.path('phone_number').validate(function (phone_number, fn) {
  var User = mongoose.model('User');

  // Check only when it is a new user or when phone_number field is modified
  if (this.isNew || this.isModified('phone_number')) {
    User.find({ phone_number: phone_number }).exec(function (err, users) {
      fn(!err && users.length === 0);
    });
  } else fn(true);
}, 'Phone Number already exists');

schema.path('email').validate(function (email, fn) {
  var User = mongoose.model('User');

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec(function (err, users) {
      fn(!err && users.length === 0);
    });
  } else fn(true);
}, 'Email already exists');

schema.path('username').validate(function (username) {
  return username.length;
}, 'Username cannot be blank');

schema.path('hashed_password').validate(function (hashed_password) {
  return hashed_password.length && this._password.length;
}, 'Password cannot be blank');

/* Methods */

schema.methods = {

  /**
   * Check Password - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  comparePasswords: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      /* istanbul ignore next */
      return '';
    }
  }

};

/* Statics */

schema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'name username friends devices';
    this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  },

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  }

}


mongoose.model('User', schema);