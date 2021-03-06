var mongoose = require('mongoose');

/* Connect to mongodb.*/
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect('mongodb://localhost/mongoose-monkey', options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

/* Bootstrap models. */
require('./models.js');