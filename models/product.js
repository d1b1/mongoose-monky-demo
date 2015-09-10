var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Schema */

var schema = new Schema({

  name        : { type : String, default : '', trim : true, index: true },
  photoUrl    : { type : String, default : '', trim : true },
  description : { type : String, default : '', trim : true },
  category    : { type : String, default : '', trim : true, index: true },
  ASIN        : { type : String, default : '', trim : true, index: true },
  amazonUrl   : { type : String, default : '', trim : true },
  brand       : { type : String, default : '', trim : true, index: true },
  reference   : { type : Schema.Types.Mixed },
  
  /* Dates */
  createdAt   : { type : Date, default : Date.now },
  updatedAt   : { type : Date, default : Date.now }

}, { autoIndex: false });

/* Validations */

schema.path('name').required(true, 'Product Name cannot be blank');
schema.path('description').required(true, 'Product Description cannot be blank');

/* Methods */

schema.methods = {}

/* Statics */

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
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  }
}

mongoose.model('Product', schema);