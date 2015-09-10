var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var _ = require('underscore');

/* Schema */

var schema = new Schema({

  /* References */
  User                : { type : Schema.ObjectId, ref : 'User' },
  Product             : { type : Schema.ObjectId, ref : 'Product' },

  /* Fields */
  history             : { type : Array },
  lastInvQty          : { type : Number, default : 0 },
  lastInvDate         : { type : Date, default : '' },
  lastConsumptionRate : { type : Number, default : '' },

  data                : { type : Schema.Types.Mixed },

  /* Dates */
  createdAt           : { type : Date, default : Date.now },
  updatedAt           : { type : Date, default : Date.now }
  
}, { autoIndex: false });

/* Validations */

schema.path('User').required(true, 'UserProduct User cannot be blank');

schema.path('Product').required(true, 'UserProduct Product cannot be blank');

/* Methods */

schema.methods = {}

/** Statics */

schema.statics = {

  /**
   * Find article by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('User')
      .populate('Product')
      .exec(cb);
  },

  /**
   * List articles
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .populate('Product', 'name description photoUrl')
      .populate('User', 'name')
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  }

}

mongoose.model('UserProduct', schema);