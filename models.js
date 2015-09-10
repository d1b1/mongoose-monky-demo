var fs = require('fs');
var join = require('path').join;
var mongoose = require('mongoose');

/* Bootstrap models. */

fs.readdirSync(join(__dirname, '/models')).forEach(function (file) {
  if (~file.indexOf('.js')) require(join(__dirname, '/models', file));
});
